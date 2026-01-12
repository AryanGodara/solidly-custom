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
  { pair: "WBTC/WETH", type: "Volatile", tvl: "$0.00", apr: "0.00%" },
  { pair: "USDC/DAI", type: "Stable", tvl: "$0.00", apr: "0.00%" },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      {/* Main Window - FULL WIDTH */}
      <div className="window window-fullscreen">
        {/* Title Bar */}
        <div className="window-title">
          <span>📊 Meridian DEX - Welcome</span>
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
          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Left Column */}
            <div>
              {/* Welcome */}
              <fieldset>
                <legend>Welcome to Meridian</legend>
                <p style={{ margin: "12px 0", fontSize: "16px" }}>
                  <strong>Meridian</strong> is a decentralized exchange on <strong>Monad</strong>.
                </p>
                <p style={{ margin: "12px 0", fontSize: "15px" }}>
                  Low fees. Fast swaps. No custodians.
                </p>
                <div style={{ marginTop: "20px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/swap">
                    <button className="btn-primary">Trade</button>
                  </Link>
                  <Link href="/liquidity">
                    <button>Pools</button>
                  </Link>
                  <Link href="/vote">
                    <button>Vote</button>
                  </Link>
                  <Link href="/lock">
                    <button>Lock</button>
                  </Link>
                  <Link href="/rewards">
                    <button>Rewards</button>
                  </Link>
                </div>
              </fieldset>

              {/* Stats */}
              <fieldset>
                <legend>Protocol Statistics</legend>
                <table>
                  <tbody>
                    {STATS.map((stat, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{stat.label}</td>
                        <td className="text-mono" style={{ textAlign: "right" }}>{stat.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </fieldset>
            </div>

            {/* Right Column */}
            <div>
              {/* Top Pools */}
              <fieldset>
                <legend>Top Liquidity Pools</legend>
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
                <div style={{ marginTop: "16px" }}>
                  <Link href="/liquidity">
                    <button>View All Pools →</button>
                  </Link>
                </div>
              </fieldset>
            </div>
          </div>

          {/* Quick Links */}
          <fieldset style={{ marginTop: "16px" }}>
            <legend>Quick Links</legend>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="https://docs.meridian.exchange" target="_blank" rel="noopener">📖 Documentation</a>
              <a href="https://github.com/meridian-dex" target="_blank" rel="noopener">💻 GitHub</a>
              <a href="https://twitter.com/meridian_dex" target="_blank" rel="noopener">🐦 Twitter</a>
              <a href="https://discord.gg/meridian" target="_blank" rel="noopener">💬 Discord</a>
            </div>
          </fieldset>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          <strong>Connected to Monad</strong> | Block: 0 | Ready
        </div>
      </div>
    </div>
  );
}
