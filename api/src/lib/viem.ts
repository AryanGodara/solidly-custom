import { createPublicClient, http, type PublicClient } from "viem";

// Monad chain definition
const monad = {
  id: 143,
  name: "Monad",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "MonadVision", url: "https://monadvision.com" },
  },
} as const;

export const publicClient: PublicClient = createPublicClient({
  chain: monad,
  transport: http(process.env.RPC_URL || "https://rpc.monad.xyz"),
  batch: {
    multicall: true,
  },
});
