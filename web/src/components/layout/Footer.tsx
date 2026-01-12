"use client";

import { useBlockNumber } from "wagmi";
import { monad } from "@/lib/wagmi";

export function Footer() {
  const { data: blockNumber } = useBlockNumber({
    chainId: monad.id,
    watch: true,
  });

  return (
    <footer
      style={{
        background: "var(--window-bg)",
        borderTop: "2px solid",
        borderColor: "var(--bevel-light) var(--bevel-dark) var(--bevel-dark) var(--bevel-light)",
        padding: "4px 8px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "11px",
        }}
      >
        <span>© 2024 Meridian DEX</span>
        <span>
          Monad | Block: {blockNumber?.toString() || "0"}
        </span>
      </div>
    </footer>
  );
}
