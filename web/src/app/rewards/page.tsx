"use client";

const REWARDS = [
  { source: "Gauge Emissions", pool: "WMON/USDC", token: "SOLID", amount: "0.00", value: "$0.00" },
  { source: "Gauge Emissions", pool: "WMON/WETH", token: "SOLID", amount: "0.00", value: "$0.00" },
  { source: "Trading Fees", pool: "WMON/USDC", token: "USDC", amount: "0.00", value: "$0.00" },
  { source: "Trading Fees", pool: "WMON/WETH", token: "WETH", amount: "0.00", value: "$0.00" },
  { source: "Bribes", pool: "WMON/USDC", token: "WMON", amount: "0.00", value: "$0.00" },
];

export default function RewardsPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      <div className="window window-fullscreen">
        {/* Title Bar */}
        <div className="window-title">
          <span>💰 Rewards - Claim Your Earnings</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>_</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>□</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>×</button>
          </div>
        </div>

        {/* Content */}
        <div className="window-content">
          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <fieldset>
              <legend>Total Claimable</legend>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <div className="text-mono" style={{ fontSize: "28px", fontWeight: 700 }}>$0.00</div>
                <div style={{ marginTop: "12px" }}>
                  <button className="btn-primary" disabled style={{ padding: "10px 24px" }}>Claim All</button>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Emissions</legend>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <div className="text-mono" style={{ fontSize: "28px", fontWeight: 700 }}>$0.00</div>
                <div style={{ marginTop: "8px", color: "var(--text-secondary)" }}>0.00 SOLID</div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Fees & Bribes</legend>
              <div style={{ textAlign: "center", padding: "16px" }}>
                <div className="text-mono" style={{ fontSize: "28px", fontWeight: 700 }}>$0.00</div>
                <div style={{ marginTop: "8px", color: "var(--text-secondary)" }}>Various tokens</div>
              </div>
            </fieldset>
          </div>

          {/* Detailed Breakdown */}
          <fieldset>
            <legend>Detailed Breakdown</legend>
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Pool</th>
                  <th>Token</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th style={{ textAlign: "right" }}>Value</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {REWARDS.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.source}</td>
                    <td className="text-mono">{r.pool}</td>
                    <td className="text-mono" style={{ fontWeight: 600 }}>{r.token}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{r.amount}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{r.value}</td>
                    <td style={{ textAlign: "center" }}>
                      <button disabled>Claim</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          {/* History */}
          <fieldset style={{ marginTop: "20px" }}>
            <legend>Claim History</legend>
            <div style={{ padding: "20px", textAlign: "center", color: "var(--text-secondary)" }}>
              <p>No claims yet.</p>
            </div>
          </fieldset>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          <strong>Last Claimed:</strong> Never | <strong>Total Lifetime Earnings:</strong> $0.00
        </div>
      </div>
    </div>
  );
}
