import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Address, getAddress } from "viem";
import { exact } from "x402/schemes";
import {
  computeRoutePatterns,
  findMatchingPaymentRequirements,
  findMatchingRoute,
  processPriceToAtomicAmount,
  toJsonSafe,
} from "x402/shared";
import {
  FacilitatorConfig,
  PaymentPayload,
  PaymentRequirements,
  Resource,
  RoutesConfig,
  PaywallConfig,
  ERC20TokenAmount,
  SupportedEVMNetworks
} from "x402/types";
import { useFacilitator } from "x402/verify";
import { safeBase64Encode } from "x402/shared";

export function paymentMiddleware(
  payTo: Address,
  routes: RoutesConfig,
  facilitator?: FacilitatorConfig,
) {
  const { verify, settle } = useFacilitator(facilitator);
  const x402Version = 1;

  // Pre-compile route patterns to regex and extract verbs
  const routePatterns = computeRoutePatterns(routes);

  return async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const method = request.method.toUpperCase();

    // Find matching route configuration
    const matchingRoute = findMatchingRoute(routePatterns, pathname, method);

    if (!matchingRoute) {
      return NextResponse.next();
    }

    const { price, network, config = {} } = matchingRoute.config;
    const {
      description,
      mimeType,
      maxTimeoutSeconds,
      inputSchema,
      outputSchema,
      resource,
      errorMessages,
      discoverable,
    } = config;

    const atomicAmountForAsset = processPriceToAtomicAmount(price, network);
    if ("error" in atomicAmountForAsset) {
      return new NextResponse(atomicAmountForAsset.error, { status: 500 });
    }
    const { maxAmountRequired, asset } = atomicAmountForAsset;

    const resourceUrl =
      resource || (`${request.nextUrl.protocol}//${request.nextUrl.host}${pathname}` as Resource);

    let paymentRequirements: PaymentRequirements[] = [];

    // TODO: create a shared middleware function to build payment requirements
    // evm networks
    if (SupportedEVMNetworks.includes(network)) {
      paymentRequirements.push({
        scheme: "exact",
        network,
        maxAmountRequired,
        resource: resourceUrl,
        description: description ?? "",
        mimeType: mimeType ?? "application/json",
        payTo: getAddress(payTo),
        maxTimeoutSeconds: maxTimeoutSeconds ?? 300,
        asset: getAddress(asset.address),
        // TODO: Rename outputSchema to requestStructure
        outputSchema: {
          input: {
            type: "http",
            method,
            discoverable: discoverable ?? true,
            ...inputSchema,
          },
          output: outputSchema,
        },
        extra: (asset as ERC20TokenAmount["asset"]).eip712,
      });
    } else {
      throw new Error(`Unsupported network: ${network}`);
    }

    // Check for payment header
    const paymentHeader = request.headers.get("X-PAYMENT");
    if (!paymentHeader) {
      const accept = request.headers.get("Accept");
      if (accept?.includes("text/html")) {
        const userAgent = request.headers.get("User-Agent");
        if (userAgent?.includes("Mozilla")) {
          return NextResponse.rewrite(new URL("/paywall", request.url), {
            status: 402, // Payment Required
          });
        }          
      }

      return new NextResponse(
        JSON.stringify({
          x402Version,
          error: errorMessages?.paymentRequired || "X-PAYMENT header is required",
          accepts: paymentRequirements,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } },
      );
    }

    // Verify payment
    let decodedPayment: PaymentPayload;
    try {
      decodedPayment = exact.evm.decodePayment(paymentHeader);
      decodedPayment.x402Version = x402Version;
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          x402Version,
          error:
            errorMessages?.invalidPayment || (error instanceof Error ? error : "Invalid payment"),
          accepts: paymentRequirements,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } },
      );
    }

    const selectedPaymentRequirements = findMatchingPaymentRequirements(
      paymentRequirements,
      decodedPayment,
    );
    if (!selectedPaymentRequirements) {
      return new NextResponse(
        JSON.stringify({
          x402Version,
          error:
            errorMessages?.noMatchingRequirements || "Unable to find matching payment requirements",
          accepts: toJsonSafe(paymentRequirements),
        }),
        { status: 402, headers: { "Content-Type": "application/json" } },
      );
    }

    const verification = await verify(decodedPayment, selectedPaymentRequirements);

    if (!verification.isValid) {
      return new NextResponse(
        JSON.stringify({
          x402Version,
          error: errorMessages?.verificationFailed || verification.invalidReason,
          accepts: paymentRequirements,
          payer: verification.payer,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } },
      );
    }

    // Proceed with request
    const response = await NextResponse.next();

    // if the response from the protected route is >= 400, do not settle the payment
    if (response.status >= 400) {
      return response;
    }

    // Settle payment after response
    try {
      const settlement = await settle(decodedPayment, selectedPaymentRequirements);

      if (settlement.success) {
        response.headers.set(
          "X-PAYMENT-RESPONSE",
          safeBase64Encode(
            JSON.stringify({
              success: true,
              transaction: settlement.transaction,
              network: settlement.network,
              payer: settlement.payer,
            }),
          ),
        );
      }
    } catch (error) {
      return new NextResponse(
        JSON.stringify({
          x402Version,
          error:
            errorMessages?.settlementFailed ||
            (error instanceof Error ? error : "Settlement failed"),
          accepts: paymentRequirements,
        }),
        { status: 402, headers: { "Content-Type": "application/json" } },
      );
    }

    return response;
  };
}