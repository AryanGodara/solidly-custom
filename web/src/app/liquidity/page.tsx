"use client";

import { PageContainer } from "@/components/layout";
import Link from "next/link";

const POOLS = [
  { id: 1, pair: "WMON/USDC", type: "Volatile", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00" },
  { id: 2, pair: "WMON/WETH", type: "Volatile", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00" },
  { id: 3, pair: "USDC/USDT", type: "Stable", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00" },
];

export default function LiquidityPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      <div className="window" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Title Bar */}
        <div className="window-title">
          <span>💧 Liquidity Pools</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>_</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>□</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>×</button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="menubar">
          <span className="menubar-item"><u>F</u>ile</span>
          <span className="menubar-item"><u>E</u>dit</span>
          <span className="menubar-item"><u>V</u>iew</span>
          <span className="menubar-item"><u>H</u>elp</span>
        </div>

        {/* Content */}
        <div className="window-content">
          {/* Actions */}
          <div style={{ marginBottom: "16px" }}>
            <Link href="/liquidity/add">
              <button className="btn-primary">+ Add Liquidity</button>
            </Link>
          </div>

          {/* Pools Table */}
          <fieldset>
            <legend>Available Pools</legend>
            <table>
              <thead>
                <tr>
                  <th>Pair</th>
                  <th>Type</th>
                  <th style={{ textAlign: "right" }}>TVL</th>
                  <th style={{ textAlign: "right" }}>APR</th>
                  <th style={{ textAlign: "right" }}>My Liquidity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {POOLS.map((pool) => (
                  <tr key={pool.id}>
                    <td className="text-mono">{pool.pair}</td>
                    <td>{pool.type}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{pool.tvl}</td>
                    <td className="text-mono text-success" style={{ textAlign: "right" }}>{pool.apr}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{pool.myLiquidity}</td>
                    <td>
                      <Link href={`/liquidity/${pool.id}`}>
                        <button>Manage</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          {POOLS.length} pools available
        </div>
      </div>
    </div>
  );
}
