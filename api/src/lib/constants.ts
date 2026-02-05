import { Address } from "viem";

// Monad canonical addresses
export const WMON = "0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A" as Address;
export const USDC = "0x754704Bc059F8C67012fEd69BC8A327a5aafb603" as Address;
export const USDT = "0xe7cd86e13AC4309349F30B3435a9d337750fC82D" as Address;
export const WETH = "0xEE8c0E9f1BFFb4Eb878d8f15f368A02a35481242" as Address;
export const WBTC = "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c" as Address;

// DEX contract addresses (update after deployment)
export const PAIR_FACTORY = (process.env.PAIR_FACTORY_ADDRESS || "0x0000000000000000000000000000000000000000") as Address;
export const ROUTER = (process.env.ROUTER_ADDRESS || "0x0000000000000000000000000000000000000000") as Address;
export const VOTER = (process.env.VOTER_ADDRESS || "0x0000000000000000000000000000000000000000") as Address;

// Cache TTL in milliseconds
export const CACHE_TTL = {
  TOKENS: 60 * 60 * 1000, // 1 hour
  PAIRS: 60 * 1000, // 1 minute
  USER: 10 * 1000, // 10 seconds
};

// ABIs
export const ERC20_ABI = [
  { name: "name", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { name: "symbol", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "string" }] },
  { name: "decimals", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
  { name: "totalSupply", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { name: "balanceOf", type: "function", stateMutability: "view", inputs: [{ name: "account", type: "address" }], outputs: [{ type: "uint256" }] },
] as const;

export const PAIR_FACTORY_ABI = [
  { name: "allPairsLength", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
  { name: "allPairs", type: "function", stateMutability: "view", inputs: [{ name: "", type: "uint256" }], outputs: [{ type: "address" }] },
] as const;

export const PAIR_ABI = [
  { name: "token0", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "address" }] },
  { name: "token1", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "address" }] },
  { name: "stable", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "bool" }] },
  { name: "getReserves", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "_reserve0", type: "uint256" }, { name: "_reserve1", type: "uint256" }, { name: "_blockTimestampLast", type: "uint256" }] },
  { name: "totalSupply", type: "function", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] },
] as const;
