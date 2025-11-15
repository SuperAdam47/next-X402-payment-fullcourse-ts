import { paymentMiddleware } from "./lib/payment.middleware";
import { routes } from "./x402/routes";

const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL as `${string}://${string}`;
const payTo = process.env.RESOURCE_WALLET_ADDRESS as `0x${string}`;

export const middleware = paymentMiddleware(
  payTo,
  routes,
  {
    url: facilitatorUrl  
  }
);

export const config = {
  matcher: ['/protected/:path*']
};