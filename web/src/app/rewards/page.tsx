"use client";

const REWARDS = [
  { source: "Gauge Emissions", token: "SOLID", amount: "0.00", value: "$0.00" },
  { source: "Trading Fees", token: "USDC", amount: "0.00", value: "$0.00" },
  { source: "Bribes", token: "WMON", amount: "0.00", value: "$0.00" },
];

export default function RewardsPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      <div className="window" style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Title Bar */}
        <div className="window-title">
          <span>💰 Rewards</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>_</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>□</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>×</button>
          </div>
        </div>

        {/* Content */}
        <div className="window-content">
          {/* Total */}
          <fieldset>
            <legend>Total Claimable</legend>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="text-mono" style={{ fontSize: "18px" }}>$0.00</span>
              <button className="btn-primary" disabled>Claim All</button>
            </div>
          </fieldset>

          {/* Breakdown */}
          <fieldset style={{ marginTop: "16px" }}>
            <legend>Breakdown</legend>
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Token</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th style={{ textAlign: "right" }}>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {REWARDS.map((r, i) => (
                  <tr key={i}>
                    <td>{r.source}</td>
                    <td className="text-mono">{r.token}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{r.amount}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{r.value}</td>
                    <td>
                      <button disabled>Claim</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          Last claimed: Never
        </div>
      </div>
    </div>
  );
}
