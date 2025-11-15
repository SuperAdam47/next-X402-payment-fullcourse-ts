type AcceptableNetwork = 'base' | 'base-sepolia';

const network = process.env.NETWORK as AcceptableNetwork;

export const routes =  {
    "/protected": {
      price: "$0.01",
      network,
      config: {
        description: "Access to protected content",
        mimeType: "text/html"
      }
  },
};