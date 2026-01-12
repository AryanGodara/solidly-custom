"use client";

import { useState } from "react";
import { SECONDS_PER_WEEK, MAX_LOCK_DURATION } from "@/lib/constants";
import { formatDuration } from "@/lib/format";

export default function LockPage() {
  const [amount, setAmount] = useState("");
  const [weeks, setWeeks] = useState(4);

  const duration = weeks * SECONDS_PER_WEEK;
  const multiplier = duration / MAX_LOCK_DURATION;
  const votingPower = amount ? (parseFloat(amount) * multiplier).toFixed(4) : "0.0000";

  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      <div className="window" style={{ maxWidth: "500px", margin: "0 auto" }}>
        {/* Title Bar */}
        <div className="window-title">
          <span>🔒 Lock Tokens</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>_</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>□</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>×</button>
          </div>
        </div>

        {/* Content */}
        <div className="window-content">
          {/* Amount */}
          <fieldset>
            <legend>Amount to Lock</legend>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0.00"
                style={{ flex: 1 }}
              />
              <span className="text-mono">SOLID</span>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Balance: 0.00
            </div>
          </fieldset>

          {/* Duration */}
          <fieldset style={{ marginTop: "16px" }}>
            <legend>Lock Duration</legend>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="number"
                min="1"
                max="26"
                value={weeks}
                onChange={(e) => setWeeks(Math.min(26, Math.max(1, Number(e.target.value))))}
                style={{ width: "80px" }}
              />
              <span>weeks</span>
              <span className="text-muted">({formatDuration(duration)})</span>
            </div>
          </fieldset>

          {/* Summary */}
          <fieldset style={{ marginTop: "16px" }}>
            <legend>Summary</legend>
            <table>
              <tbody>
                <tr>
                  <td>Lock Amount</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>{amount || "0"} SOLID</td>
                </tr>
                <tr>
                  <td>Lock Duration</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>{weeks} weeks</td>
                </tr>
                <tr>
                  <td>Voting Power</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>{votingPower} veNFT</td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          {/* Action */}
          <div style={{ marginTop: "16px" }}>
            <button className="btn-primary" disabled={!amount || parseFloat(amount) <= 0} style={{ width: "100%" }}>
              Create Lock
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          Your veNFTs: 0
        </div>
      </div>
    </div>
  );
}
