"use client";

import { SwapCard } from "@/components/swap";

export default function SwapPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      {/* Centered but larger swap card */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "flex-start",
        paddingTop: "24px"
      }}>
        <SwapCard />
      </div>
    </div>
  );
}
