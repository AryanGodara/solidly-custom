import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Address } from "viem";
import { COMMON_TOKENS } from "@/lib/constants";

interface Token {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

interface TokenState {
  tokens: Token[];
  favorites: Address[];
  setTokens: (tokens: Token[]) => void;
  addFavorite: (address: Address) => void;
  removeFavorite: (address: Address) => void;
  isFavorite: (address: Address) => boolean;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set, get) => ({
      tokens: [],
      favorites: COMMON_TOKENS,
      setTokens: (tokens) => set({ tokens }),
      addFavorite: (address) =>
        set((state) => ({
          favorites: [...state.favorites, address],
        })),
      removeFavorite: (address) =>
        set((state) => ({
          favorites: state.favorites.filter((a) => a !== address),
        })),
      isFavorite: (address) => get().favorites.includes(address),
    }),
    {
      name: "meridian-tokens",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

export type { Token };
