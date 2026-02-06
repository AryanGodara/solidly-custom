"use client";

import { useState, useCallback } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits, Address, maxUint256 } from "viem";
import { ADDRESSES, ABIS } from "@/lib/contracts";
import { useSettingsStore } from "@/stores";

interface Route {
  from: Address;
  to: Address;
  stable: boolean;
}

interface UseSwapReturn {
  tokenIn: Address | null;
  tokenOut: Address | null;
  amountIn: string;
  amountOut: string;
  setTokenIn: (token: Address | null) => void;
  setTokenOut: (token: Address | null) => void;
  setAmountIn: (amount: string) => void;
  switchTokens: () => void;
  quote: {
    isLoading: boolean;
    error: Error | null;
    priceImpact: number;
  };
  swap: () => Promise<void>;
  isSwapping: boolean;
  needsApproval: boolean;
  approve: () => Promise<void>;
  isApproving: boolean;
  error: string | null;
}

export function useSwap(): UseSwapReturn {
  const { address, chainId } = useAccount();
  const { slippage, deadline } = useSettingsStore();
  
  const [tokenIn, setTokenIn] = useState<Address | null>(null);
  const [tokenOut, setTokenOut] = useState<Address | null>(null);
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addresses = chainId ? ADDRESSES[chainId] : undefined;
  const routerAddress = addresses?.router;

  // Check allowance
  const { data: allowance } = useReadContract({
    address: tokenIn ?? undefined,
    abi: ABIS.ERC20,
    functionName: "allowance",
    args: address && routerAddress ? [address, routerAddress] : undefined,
    query: { enabled: !!tokenIn && !!address && !!routerAddress },
  });

  // Get quote
  const amountInBigInt = amountIn ? parseUnits(amountIn, 18) : BigInt(0);
  const routes: Route[] = tokenIn && tokenOut ? [{ from: tokenIn, to: tokenOut, stable: false }] : [];

  const { data: amounts, isLoading: quoteLoading, error: quoteError } = useReadContract({
    address: routerAddress,
    abi: ABIS.Router,
    functionName: "getAmountsOut",
    args: [amountInBigInt, routes],
    query: { 
      enabled: !!routerAddress && !!tokenIn && !!tokenOut && amountInBigInt > BigInt(0),
    },
  });

  // Update amountOut when quote changes
  const quotedAmountOut = amounts && amounts.length > 1 ? amounts[amounts.length - 1] : BigInt(0);
  const formattedAmountOut = quotedAmountOut > BigInt(0) ? formatUnits(quotedAmountOut, 18) : "";

  // Write contracts
  const { writeContractAsync: approveAsync, isPending: isApproving } = useWriteContract();
  const { writeContractAsync: swapAsync, isPending: isSwapPending, data: swapTxHash } = useWriteContract();

  const { isLoading: isSwapConfirming } = useWaitForTransactionReceipt({
    hash: swapTxHash,
  });

  // Calculate if approval needed
  const needsApproval = !!tokenIn && !!allowance && allowance < amountInBigInt;

  // Calculate price impact (simplified)
  const priceImpact = 0; // TODO: Calculate actual price impact

  const approve = useCallback(async () => {
    if (!tokenIn || !routerAddress) return;
    setError(null);
    
    try {
      await approveAsync({
        address: tokenIn,
        abi: ABIS.ERC20,
        functionName: "approve",
        args: [routerAddress, maxUint256],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Approval failed");
    }
  }, [tokenIn, routerAddress, approveAsync]);

  const swap = useCallback(async () => {
    if (!tokenIn || !tokenOut || !address || !routerAddress) return;
    if (amountInBigInt === BigInt(0)) return;
    setError(null);

    try {
      const amountOutMin = (quotedAmountOut * BigInt(Math.floor((100 - slippage) * 100))) / BigInt(10000);
      const deadlineTimestamp = BigInt(Math.floor(Date.now() / 1000) + deadline * 60);

      await swapAsync({
        address: routerAddress,
        abi: ABIS.Router,
        functionName: "swapExactTokensForTokens",
        args: [amountInBigInt, amountOutMin, routes, address, deadlineTimestamp],
      });

      // Reset inputs on success
      setAmountIn("");
      setAmountOut("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Swap failed");
    }
  }, [tokenIn, tokenOut, address, routerAddress, amountInBigInt, quotedAmountOut, slippage, deadline, routes, swapAsync]);

  const switchTokens = useCallback(() => {
    const tempIn = tokenIn;
    setTokenIn(tokenOut);
    setTokenOut(tempIn);
    setAmountIn(amountOut);
    setAmountOut(amountIn);
  }, [tokenIn, tokenOut, amountIn, amountOut]);

  return {
    tokenIn,
    tokenOut,
    amountIn,
    amountOut: formattedAmountOut,
    setTokenIn,
    setTokenOut,
    setAmountIn,
    switchTokens,
    quote: {
      isLoading: quoteLoading,
      error: quoteError as Error | null,
      priceImpact,
    },
    swap,
    isSwapping: isSwapPending || isSwapConfirming,
    needsApproval,
    approve,
    isApproving,
    error,
  };
}
