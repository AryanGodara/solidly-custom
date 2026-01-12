"use client";

import Link from "next/link";

const STATS = [
  { label: "Total Value Locked", value: "$0.00" },
  { label: "Volume (24h)", value: "$0.00" },
  { label: "veNFTs Created", value: "0" },
];

const POOLS = [
  { pair: "WMON/USDC", type: "Volatile", tvl: "$0.00", apr: "0.00%" },
  { pair: "WMON/WETH", type: "Volatile", tvl: "$0.00", apr: "0.00%" },
  { pair: "USDC/USDT", type: "Stable", tvl: "$0.00", apr: "0.00%" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      {/* Main Window */}
      <div className="window" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Title Bar */}
        <div className="window-title">
          <span>📊 Meridian DEX - Welcome</span>
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
          {/* Welcome */}
          <fieldset>
            <legend>Welcome to Meridian</legend>
            <p style={{ margin: "8px 0" }}>
              Meridian is a decentralized exchange on <strong>Monad</strong>.
            </p>
            <p style={{ margin: "8px 0" }}>
              Low fees. Fast swaps. No custodians.
            </p>
            <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
              <Link href="/swap">
                <button>Trade</button>
              </Link>
              <Link href="/liquidity">
                <button>Pools</button>
              </Link>
              <Link href="/vote">
                <button>Vote</button>
              </Link>
            </div>
          </fieldset>

          {/* Stats */}
          <fieldset style={{ marginTop: "16px" }}>
            <legend>Protocol Statistics</legend>
            <table>
              <tbody>
                {STATS.map((stat, i) => (
                  <tr key={i}>
                    <td>{stat.label}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          {/* Top Pools */}
          <fieldset style={{ marginTop: "16px" }}>
            <legend>Top Pools</legend>
            <table>
              <thead>
                <tr>
                  <th>Pair</th>
                  <th>Type</th>
                  <th style={{ textAlign: "right" }}>TVL</th>
                  <th style={{ textAlign: "right" }}>APR</th>
                </tr>
              </thead>
              <tbody>
                {POOLS.map((pool, i) => (
                  <tr key={i}>
                    <td className="text-mono">{pool.pair}</td>
                    <td>{pool.type}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{pool.tvl}</td>
                    <td className="text-mono text-success" style={{ textAlign: "right" }}>{pool.apr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          Connected to Monad | Block: 0
        </div>
      </div>
    </div>
  );
}
