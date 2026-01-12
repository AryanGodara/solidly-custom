"use client";

import { useAccount } from "wagmi";
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
    <div className="window" style={{ maxWidth: "400px", margin: "0 auto" }}>
      {/* Title Bar */}
      <div className="window-title">
        <span>💱 Swap Tokens</span>
        <SwapSettingsButton />
      </div>

      {/* Content */}
      <div className="window-content">
        {/* From */}
        <fieldset>
          <legend>From</legend>
          <TokenInput
            label="FROM"
            token={tokenIn}
            amount={amountIn}
            onTokenChange={setTokenIn}
            onAmountChange={setAmountIn}
            excludeToken={tokenOut}
          />
        </fieldset>

        {/* Switch */}
        <div style={{ textAlign: "center", margin: "8px 0" }}>
          <button onClick={switchTokens}>↕ Switch</button>
        </div>

        {/* To */}
        <fieldset>
          <legend>To</legend>
          <TokenInput
            label="TO"
            token={tokenOut}
            amount={amountOut}
            onTokenChange={setTokenOut}
            onAmountChange={() => {}}
            excludeToken={tokenIn}
            readOnly
          />
        </fieldset>

        {/* Price Info */}
        {tokenIn && tokenOut && amountIn && amountOut && (
          <fieldset style={{ marginTop: "8px" }}>
            <legend>Details</legend>
            <table>
              <tbody>
                <tr>
                  <td>Price Impact</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>{quote.priceImpact.toFixed(2)}%</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        )}

        {/* Error */}
        {error && (
          <div style={{ 
            marginTop: "8px", 
            padding: "4px 8px", 
            background: "#ffcccc", 
            border: "1px solid var(--color-error)",
            color: "var(--color-error)"
          }}>
            ⚠ {error}
          </div>
        )}

        {/* Action */}
        <div style={{ marginTop: "16px", textAlign: "center" }}>
          {!isConnected ? (
            <ConnectButton />
          ) : (
            <button
              className="btn-primary"
              onClick={buttonState.action}
              disabled={buttonState.disabled}
              style={{ width: "100%" }}
            >
              {isApproving || isSwapping ? "..." : buttonState.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
