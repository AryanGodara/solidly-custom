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
      {/* FULL WIDTH Window */}
      <div className="window window-fullscreen">
        {/* Title Bar */}
        <div className="window-title">
          <span>🔒 Lock Tokens - Create veNFT</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>_</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>□</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>×</button>
          </div>
        </div>

        {/* Content */}
        <div className="window-content">
          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Left Column - Create Lock */}
            <div>
              <fieldset>
                <legend>Create New Lock</legend>
                
                {/* Amount */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}>
                    Amount to Lock
                  </label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                      placeholder="0.00"
                      style={{ flex: 1, fontSize: "16px", padding: "10px 12px" }}
                    />
                    <span className="text-mono" style={{ fontSize: "16px", fontWeight: 700 }}>SOLID</span>
                  </div>
                  <div style={{ marginTop: "8px", color: "var(--text-secondary)" }}>
                    Available Balance: <span className="text-mono">0.00</span> SOLID
                  </div>
                </div>

                {/* Duration */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}>
                    Lock Duration
                  </label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="number"
                      min="1"
                      max="26"
                      value={weeks}
                      onChange={(e) => setWeeks(Math.min(26, Math.max(1, Number(e.target.value))))}
                      style={{ width: "100px", fontSize: "16px", padding: "10px 12px" }}
                    />
                    <span style={{ fontWeight: 600 }}>weeks</span>
                    <span style={{ color: "var(--text-secondary)" }}>
                      = {formatDuration(duration)}
                    </span>
                  </div>
                  <div style={{ marginTop: "8px", color: "var(--text-secondary)" }}>
                    Maximum: 26 weeks (6 months)
                  </div>
                </div>

                {/* Quick Duration Buttons */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 700 }}>
                    Quick Select
                  </label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {[1, 4, 8, 13, 26].map((w) => (
                      <button
                        key={w}
                        onClick={() => setWeeks(w)}
                        style={{ background: weeks === w ? "#e0e0ff" : undefined }}
                      >
                        {w} week{w > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>

            {/* Right Column - Summary */}
            <div>
              <fieldset>
                <legend>Lock Summary</legend>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Lock Amount</td>
                      <td className="text-mono" style={{ textAlign: "right", fontSize: "16px" }}>
                        {amount || "0"} SOLID
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Lock Duration</td>
                      <td className="text-mono" style={{ textAlign: "right", fontSize: "16px" }}>
                        {weeks} weeks
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Unlock Date</td>
                      <td className="text-mono" style={{ textAlign: "right", fontSize: "16px" }}>
                        {new Date(Date.now() + duration * 1000).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr style={{ background: "#e8ffe8" }}>
                      <td style={{ fontWeight: 700, fontSize: "16px" }}>Voting Power</td>
                      <td className="text-mono text-success" style={{ textAlign: "right", fontSize: "18px", fontWeight: 700 }}>
                        {votingPower} veNFT
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ marginTop: "24px" }}>
                  <button 
                    className="btn-primary" 
                    disabled={!amount || parseFloat(amount) <= 0}
                    style={{ width: "100%", padding: "12px 24px", fontSize: "16px" }}
                  >
                    Create Lock
                  </button>
                </div>
              </fieldset>

              {/* Your Locks */}
              <fieldset style={{ marginTop: "16px" }}>
                <legend>Your veNFTs</legend>
                <div style={{ padding: "20px", textAlign: "center", color: "var(--text-secondary)" }}>
                  <p style={{ margin: "8px 0", fontSize: "15px" }}>
                    No veNFTs found.
                  </p>
                  <p style={{ margin: "8px 0" }}>
                    Create a lock to receive your first veNFT.
                  </p>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          <strong>Your veNFTs:</strong> 0 | <strong>Total Voting Power:</strong> 0
        </div>
      </div>
    </div>
  );
}
