"use client";

import { useState } from "react";
import { Address, formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui";
import { TokenSelector } from "./TokenSelector";
import { formatTokenAmount } from "@/lib/format";
import { MONAD_CONTRACTS, ABIS } from "@/lib/contracts";

// Token info lookup
const TOKEN_INFO: Record<string, { symbol: string; decimals: number }> = {
  [MONAD_CONTRACTS.WMON]: { symbol: "WMON", decimals: 18 },
  [MONAD_CONTRACTS.USDC]: { symbol: "USDC", decimals: 6 },
  [MONAD_CONTRACTS.USDT]: { symbol: "USDT", decimals: 6 },
  [MONAD_CONTRACTS.WETH]: { symbol: "WETH", decimals: 18 },
  [MONAD_CONTRACTS.WBTC]: { symbol: "WBTC", decimals: 8 },
};

interface TokenInputProps {
  label: string;
  token: Address | null;
  amount: string;
  onTokenChange: (token: Address | null) => void;
  onAmountChange: (amount: string) => void;
  excludeToken?: Address | null;
  disabled?: boolean;
  readOnly?: boolean;
}

export function TokenInput({
  label,
  token,
  amount,
  onTokenChange,
  onAmountChange,
  excludeToken,
  disabled,
  readOnly,
}: TokenInputProps) {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const { address } = useAccount();

  const tokenInfo = token ? TOKEN_INFO[token] : null;
  const decimals = tokenInfo?.decimals ?? 18;

  // Read ERC20 balance
  const { data: balanceData } = useReadContract({
    address: token ?? undefined,
    abi: ABIS.ERC20,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!token && !!address },
  });

  const balance = balanceData as bigint | undefined;

  const handleMax = () => {
    if (balance) {
      onAmountChange(formatUnits(balance, decimals));
    }
  };

  return (
    <div className="rounded-xl border border-white/5 bg-[#0f0f1a] p-4">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-400">{label}</span>
        {balance !== undefined && (
          <span className="text-xs text-zinc-500">
            Balance: {formatTokenAmount(balance, decimals)}
          </span>
        )}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-4">
        {/* Token selector button */}
        <button
          type="button"
          onClick={() => setSelectorOpen(true)}
          disabled={disabled}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 transition-all duration-200 hover:bg-white/10 hover:border-white/15 disabled:opacity-50"
        >
          {token && tokenInfo ? (
            <>
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
              <span className="font-semibold text-white">{tokenInfo.symbol}</span>
            </>
          ) : (
            <span className="text-zinc-400">Select</span>
          )}
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </button>

        {/* Amount input */}
        <div className="flex-1">
          <Input
            value={amount}
            onChange={onAmountChange}
            onMax={!readOnly ? handleMax : undefined}
            disabled={disabled || readOnly}
            placeholder="0"
          />
        </div>
      </div>

      {/* Token selector modal */}
      <TokenSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={onTokenChange}
        excludeToken={excludeToken}
      />
    </div>
  );
}
