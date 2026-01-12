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
    return { text: isSwapping ? "Swapping..." : "Execute Swap", disabled: isSwapping, action: swap };
  };

  const buttonState = getButtonState();

  return (
    <div className="window" style={{ width: "100%", maxWidth: "500px" }}>
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
        <div style={{ textAlign: "center", margin: "12px 0" }}>
          <button onClick={switchTokens} style={{ padding: "8px 24px", fontSize: "16px" }}>
            ↕ Switch Tokens
          </button>
        </div>

        {/* To */}
        <fieldset>
          <legend>To (Estimated)</legend>
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
          <fieldset style={{ marginTop: "12px" }}>
            <legend>Trade Details</legend>
            <table>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Price Impact</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>{quote.priceImpact.toFixed(2)}%</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Minimum Received</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>{amountOut}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        )}

        {/* Error */}
        {error && (
          <div style={{ 
            marginTop: "12px", 
            padding: "12px", 
            background: "#ffeeee", 
            border: "2px solid var(--color-error)",
            color: "var(--color-error)",
            fontWeight: 600
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Action */}
        <div style={{ marginTop: "20px" }}>
          {!isConnected ? (
            <div style={{ textAlign: "center" }}>
              <ConnectButton />
            </div>
          ) : (
            <button
              className="btn-primary"
              onClick={buttonState.action}
              disabled={buttonState.disabled}
              style={{ width: "100%", padding: "14px 24px", fontSize: "16px" }}
            >
              {isApproving || isSwapping ? "..." : buttonState.text}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
