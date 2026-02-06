"use client";

import { useAccount } from "wagmi";
import { ArrowDownUp } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { TokenInput } from "./TokenInput";
import { SwapSettingsButton } from "./SwapSettings";
import { useSwap } from "@/hooks";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function SwapCard() {
  const { isConnected } = useAccount();
  const {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    setTokenIn,
    setTokenOut,
    setAmountIn,
    switchTokens,
    quote,
    swap,
    isSwapping,
    needsApproval,
    approve,
    isApproving,
    error,
  } = useSwap();

  // Determine button state and text
  const getButtonState = (): { text: string; disabled: boolean; action: () => void } => {
    if (!isConnected) {
      return { text: "Connect Wallet", disabled: true, action: () => {} };
    }
    if (!tokenIn || !tokenOut) {
      return { text: "Select Tokens", disabled: true, action: () => {} };
    }
    if (!amountIn || parseFloat(amountIn) === 0) {
      return { text: "Enter Amount", disabled: true, action: () => {} };
    }
    if (needsApproval) {
      return { text: isApproving ? "Approving..." : "Approve", disabled: isApproving, action: approve };
    }
    return { text: isSwapping ? "Swapping..." : "Swap", disabled: isSwapping, action: swap };
  };

  const buttonState = getButtonState();

  return (
    <Card className="mx-auto w-full max-w-md p-6" glow>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Swap</h2>
        <SwapSettingsButton />
      </div>

      {/* Token inputs */}
      <div className="relative space-y-2">
        {/* From */}
        <TokenInput
          label="From"
          token={tokenIn}
          amount={amountIn}
          onTokenChange={setTokenIn}
          onAmountChange={setAmountIn}
          excludeToken={tokenOut}
        />

        {/* Switch button */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={switchTokens}
            className="rounded-xl border-4 border-[#0f0f1a] bg-[#1a1a2e] p-2.5 transition-all duration-200 hover:bg-[#252540] hover:rotate-180"
          >
            <ArrowDownUp className="h-4 w-4 text-zinc-400" />
          </button>
        </div>

        {/* To */}
        <TokenInput
          label="To"
          token={tokenOut}
          amount={amountOut}
          onTokenChange={setTokenOut}
          onAmountChange={() => {}}
          excludeToken={tokenIn}
          readOnly
        />
      </div>

      {/* Price info */}
      {tokenIn && tokenOut && amountIn && amountOut && (
        <div className="mt-4 rounded-xl border border-white/5 bg-white/5 p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-400">Price Impact</span>
            <span className="font-medium text-white">{quote.priceImpact.toFixed(2)}%</span>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Action button */}
      <div className="mt-6">
        {!isConnected ? (
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        ) : (
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={buttonState.action}
            disabled={buttonState.disabled}
            loading={isApproving || isSwapping}
          >
            {buttonState.text}
          </Button>
        )}
      </div>
    </Card>
  );
}
