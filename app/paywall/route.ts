// app/paywall/route.ts
import { routes } from "@/x402/routes";
import { NextRequest, NextResponse } from "next/server";
import { getAddress } from "viem";
import { getPaywallHtml } from "x402/paywall";
import { computeRoutePatterns, findMatchingRoute, processPriceToAtomicAmount } from "x402/shared";
import { ERC20TokenAmount, PaymentRequirements, Resource, SupportedEVMNetworks } from "x402/types";

const payTo = process.env.RESOURCE_WALLET_ADDRESS as `0x${string}`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const method = request.method.toUpperCase();
  const pathname = request.nextUrl.pathname;
  const resource = searchParams.get("resource") || "/";

    // Find matching route configuration

  // você tem acesso ao mesmo tipo de coisas que no middleware:
  let paymentRequirements: PaymentRequirements[] = [];

  const routePatterns = computeRoutePatterns(routes);

  const matchingRoute = findMatchingRoute(routePatterns, pathname, method);

  if (!matchingRoute) {
      return NextResponse.redirect(resource, 302);
  }

  const { price, network, config = {} } = matchingRoute.config;

  const resourceUrl =
      resource || (`${request.nextUrl.protocol}//${request.nextUrl.host}${pathname}` as Resource);


  const atomicAmountForAsset = processPriceToAtomicAmount(price, network);
  
  if ("error" in atomicAmountForAsset) {
    return new NextResponse(atomicAmountForAsset.error, { status: 500 });
  }

  const { maxAmountRequired, asset } = atomicAmountForAsset;

  const {
      description,
      mimeType,
      inputSchema,
      outputSchema,
      discoverable,
    } = config;


  console.log(`(${network}) Resource: ${resourceUrl}`);

  if (SupportedEVMNetworks.includes(network)) {
      paymentRequirements.push({
        scheme: "exact",
        network,
        maxAmountRequired,
        resource: resourceUrl,
        description: description ?? "",
        mimeType: mimeType ?? "application/json",
        payTo: getAddress(payTo),
        maxTimeoutSeconds: 300,
        asset: getAddress(asset.address),
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

  const html = await getPaywallHtml({
    currentUrl: request.url,
    amount: 0.01,
    testnet: network === "base-sepolia",
    appName: "Next X402 Coinbase Example",
    cdpClientKey: process.env.CDP_CLIENT_KEY,
    appLogo: process.env.APP_LOGO,
    paymentRequirements,
  });

  return new NextResponse(html, {
    status: 402,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
