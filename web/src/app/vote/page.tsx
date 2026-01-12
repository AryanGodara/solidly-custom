"use client";

import { useState } from "react";

const GAUGES = [
  { id: 1, pair: "WMON/USDC", votes: "25.5%", bribes: "$1,000", myVotes: "0%" },
  { id: 2, pair: "WMON/WETH", votes: "15.2%", bribes: "$500", myVotes: "0%" },
  { id: 3, pair: "USDC/USDT", votes: "10.8%", bribes: "$200", myVotes: "0%" },
];

export default function VotePage() {
  const [allocations, setAllocations] = useState<Record<number, number>>({});
  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);

  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      <div className="window" style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Title Bar */}
        <div className="window-title">
          <span>🗳️ Vote - Gauge Allocation</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>_</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>□</button>
            <button style={{ minWidth: "20px", padding: "0 4px" }}>×</button>
          </div>
        </div>

        {/* Content */}
        <div className="window-content">
          {/* Epoch Info */}
          <fieldset>
            <legend>Epoch Information</legend>
            <table>
              <tbody>
                <tr>
                  <td>Current Epoch</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>1</td>
                </tr>
                <tr>
                  <td>Time Remaining</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>6d 23h 45m</td>
                </tr>
                <tr>
                  <td>Your Voting Power</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>0 veNFT</td>
                </tr>
                <tr>
                  <td>Votes Allocated</td>
                  <td className="text-mono" style={{ textAlign: "right" }}>{totalAllocated}%</td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          {/* Gauges */}
          <fieldset style={{ marginTop: "16px" }}>
            <legend>Gauges</legend>
            <table>
              <thead>
                <tr>
                  <th>Pool</th>
                  <th style={{ textAlign: "right" }}>Total Votes</th>
                  <th style={{ textAlign: "right" }}>Bribes</th>
                  <th style={{ textAlign: "right" }}>My Vote</th>
                  <th>Allocation</th>
                </tr>
              </thead>
              <tbody>
                {GAUGES.map((gauge) => (
                  <tr key={gauge.id}>
                    <td className="text-mono">{gauge.pair}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{gauge.votes}</td>
                    <td className="text-mono text-success" style={{ textAlign: "right" }}>{gauge.bribes}</td>
                    <td className="text-mono" style={{ textAlign: "right" }}>{gauge.myVotes}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={allocations[gauge.id] || 0}
                        onChange={(e) => setAllocations({ ...allocations, [gauge.id]: Number(e.target.value) })}
                        style={{ width: "60px", textAlign: "right" }}
                      />
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          {/* Actions */}
          <div style={{ marginTop: "16px" }}>
            <button className="btn-primary" disabled={totalAllocated === 0}>
              Cast Votes
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          Remaining: {100 - totalAllocated}%
        </div>
      </div>
    </div>
  );
}
