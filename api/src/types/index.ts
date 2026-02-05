import { Address } from "viem";

export interface Token {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

export interface Pair {
  address: Address;
  token0: Address;
  token1: Address;
  stable: boolean;
  reserve0: string;
  reserve1: string;
  totalSupply: string;
}

export interface Gauge {
  address: Address;
  pair: Address;
  totalVotes: string;
  bribes: Bribe[];
}

export interface Bribe {
  token: Address;
  amount: string;
}

export interface UserPosition {
  pair: Address;
  balance: string;
  staked: string;
  earned: string;
}

export interface ProtocolStats {
  tvl: string;
  volume24h: string;
  fees24h: string;
  totalVeNFTs: number;
}
