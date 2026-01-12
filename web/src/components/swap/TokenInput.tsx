"use client";

import { useState } from "react";
import { Address, formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { Input } from "@/components/ui";
import { TokenSelector } from "./TokenSelector";
import { formatTokenAmount } from "@/lib/format";
import { MONAD_CONTRACTS, ABIS } from "@/lib/contracts";

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
    <div>
      {/* Token + Balance Row */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <button
          type="button"
          onClick={() => setSelectorOpen(true)}
          disabled={disabled}
        >
          {token && tokenInfo ? tokenInfo.symbol : "Select Token ▼"}
        </button>
        {balance !== undefined && (
          <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
            Balance: {formatTokenAmount(balance, decimals)}
            {!readOnly && (
              <button onClick={handleMax} style={{ marginLeft: "4px", minWidth: "40px", fontSize: "10px" }}>MAX</button>
            )}
          </span>
        )}
      </div>

      {/* Amount Input */}
      <Input
        value={amount}
        onChange={onAmountChange}
        disabled={disabled || readOnly}
        placeholder="0.00"
      />

      <TokenSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        onSelect={onTokenChange}
        excludeToken={excludeToken}
      />
    </div>
  );
}
