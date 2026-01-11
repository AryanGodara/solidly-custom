import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { type Chain } from "viem";


// Monad Mainnet - not yet in viem/chains
export const monad: Chain = {
  id: 143,
  name: "Monad",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://rpc.monad.xyz"] },
    public: { http: ["https://rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "MonadVision", url: "https://monadvision.com" },
  },
};

// Monad Testnet
export const monadTestnet: Chain = {
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz"] },
    public: { http: ["https://testnet-rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "Monad Explorer", url: "https://testnet.monadexplorer.com" },
  },
  testnet: true,
};

export const config = getDefaultConfig({
  appName: "Solidly DEX",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [monad, monadTestnet],
  transports: {
    [monad.id]: http("https://rpc.monad.xyz"),
    [monadTestnet.id]: http("https://testnet-rpc.monad.xyz"),
  },
  ssr: true,
});
