"use client";

import Link from "next/link";

const POOLS = [
  { id: 1, pair: "WMON/USDC", type: "Volatile", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00", volume24h: "$0.00" },
  { id: 2, pair: "WMON/WETH", type: "Volatile", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00", volume24h: "$0.00" },
  { id: 3, pair: "USDC/USDT", type: "Stable", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00", volume24h: "$0.00" },
  { id: 4, pair: "WBTC/WETH", type: "Volatile", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00", volume24h: "$0.00" },
  { id: 5, pair: "USDC/DAI", type: "Stable", tvl: "$0.00", apr: "0.00%", myLiquidity: "$0.00", volume24h: "$0.00" },
];

export default function LiquidityPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      <div className="window window-fullscreen">
        {/* Title Bar */}
        <div className="window-title">
          <span>💧 Liquidity Pools</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>_</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>□</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>×</button>
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
          {/* Toolbar */}
          <div style={{ marginBottom: "20px", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/liquidity/add">
              <button className="btn-primary" style={{ padding: "10px 20px", fontSize: "15px" }}>
                + Add Liquidity
              </button>
            </Link>
            <button style={{ padding: "10px 20px" }}>
              🔄 Refresh
            </button>
            <div style={{ marginLeft: "auto" }}>
              <input type="text" placeholder="Search pairs..." style={{ padding: "8px 12px", width: "200px" }} />
            </div>
          </div>

          {/* My Positions */}
          <fieldset style={{ marginBottom: "20px" }}>
            <legend>My Positions</legend>
            <div style={{ padding: "20px", textAlign: "center", color: "var(--text-secondary)" }}>
              <p>No active positions. Add liquidity to earn fees.</p>
            </div>
          </fieldset>

          {/* All Pools */}
          <fieldset>
            <legend>All Available Pools</legend>
            <table>
              <thead>
                <tr>
                  <th>Pair</th>
                  <th>Type</th>
                  <th style={{ textAlign: "right" }}>TVL</th>
                  <th style={{ textAlign: "right" }}>24h Volume</th>
                  <th style={{ textAlign: "right" }}>APR</th>
                  <th style={{ textAlign: "right" }}>My Liquidity</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {POOLS.map((pool) => (
                  <tr key={pool.id}>
                    <td className="text-mono" style={{ fontWeight: 700 }}>{pool.pair}</td>
                    <td>{pool.type}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{pool.tvl}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{pool.volume24h}</td>
                    <td className="text-mono text-success" style={{ textAlign: "right" }}>{pool.apr}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{pool.myLiquidity}</td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                        <Link href={`/liquidity/${pool.id}/add`}>
                          <button>Add</button>
                        </Link>
                        <Link href={`/liquidity/${pool.id}`}>
                          <button>Details</button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          <strong>{POOLS.length} pools</strong> | Total TVL: $0.00 | Your Liquidity: $0.00
        </div>
      </div>
    </div>
  );
}
