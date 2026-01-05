"use client";

import { useState } from "react";
import { Address } from "viem";
import { useAccount, useBalance } from "wagmi";
import { Search } from "lucide-react";
import { Modal } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatTokenAmount, shortenAddress } from "@/lib/format";
import { MONAD_CONTRACTS } from "@/lib/contracts";
import { useDebounce } from "@/hooks";

// Default token list - in production, fetch from API
const DEFAULT_TOKENS = [
  { address: MONAD_CONTRACTS.WMON, symbol: "WMON", name: "Wrapped MON", decimals: 18 },
  { address: MONAD_CONTRACTS.USDC, symbol: "USDC", name: "USD Coin", decimals: 6 },
  { address: MONAD_CONTRACTS.USDT, symbol: "USDT", name: "Tether USD", decimals: 6 },
  { address: MONAD_CONTRACTS.WETH, symbol: "WETH", name: "Wrapped Ether", decimals: 18 },
  { address: MONAD_CONTRACTS.WBTC, symbol: "WBTC", name: "Wrapped Bitcoin", decimals: 8 },
];

interface TokenSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (address: Address) => void;
  excludeToken?: Address | null;
}

export function TokenSelector({ open, onClose, onSelect, excludeToken }: TokenSelectorProps) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredTokens = DEFAULT_TOKENS.filter((token) => {
    if (excludeToken && token.address === excludeToken) return false;
    if (!debouncedSearch) return true;
    const searchLower = debouncedSearch.toLowerCase();
    return (
      token.symbol.toLowerCase().includes(searchLower) ||
      token.name.toLowerCase().includes(searchLower) ||
      token.address.toLowerCase().includes(searchLower)
    );
  });

  const handleSelect = (address: Address) => {
    onSelect(address);
    onClose();
    setSearch("");
  };

  return (
    <Modal open={open} onClose={onClose} title="Select Token">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or address"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Token list */}
      <div className="max-h-80 space-y-1 overflow-y-auto">
        {filteredTokens.length === 0 ? (
          <p className="py-4 text-center text-sm text-zinc-500">No tokens found</p>
        ) : (
          filteredTokens.map((token) => (
            <TokenRow
              key={token.address}
              address={token.address}
              symbol={token.symbol}
              name={token.name}
              decimals={token.decimals}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>
    </Modal>
  );
}

interface TokenRowProps {
  address: Address;
  symbol: string;
  name: string;
  decimals: number;
  onSelect: (address: Address) => void;
}

function TokenRow({ address, symbol, name, decimals, onSelect }: TokenRowProps) {
  const { address: userAddress } = useAccount();
  const { data: balance } = useBalance({
    address: userAddress,
    token: address,
  });

  return (
    <button
      onClick={() => onSelect(address)}
      className="flex w-full items-center justify-between rounded-lg p-3 transition-colors hover:bg-zinc-800"
    >
      <div className="flex items-center gap-3">
        {/* Token icon placeholder */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
        <div className="text-left">
          <p className="font-medium text-zinc-100">{symbol}</p>
          <p className="text-xs text-zinc-500">{name}</p>
        </div>
      </div>
      <div className="text-right">
        {balance && (
          <p className="font-mono text-sm text-zinc-300">
            {formatTokenAmount(balance.value, balance.decimals)}
          </p>
        )}
      </div>
    </button>
  );
}
