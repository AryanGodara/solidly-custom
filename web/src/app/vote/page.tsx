"use client";

import { useState } from "react";

const GAUGES = [
  { id: 1, pair: "WMON/USDC", votes: "25.5%", bribes: "$1,000", myVotes: "0%", weight: 25000 },
  { id: 2, pair: "WMON/WETH", votes: "15.2%", bribes: "$500", myVotes: "0%", weight: 15200 },
  { id: 3, pair: "USDC/USDT", votes: "10.8%", bribes: "$200", myVotes: "0%", weight: 10800 },
  { id: 4, pair: "WBTC/WETH", votes: "8.5%", bribes: "$150", myVotes: "0%", weight: 8500 },
  { id: 5, pair: "USDC/DAI", votes: "5.2%", bribes: "$50", myVotes: "0%", weight: 5200 },
];

export default function VotePage() {
  const [allocations, setAllocations] = useState<Record<number, number>>({});
  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);

  return (
    <div style={{ minHeight: "100vh", padding: "16px" }}>
      <div className="window window-fullscreen">
        {/* Title Bar */}
        <div className="window-title">
          <span>🗳️ Vote - Gauge Allocation</span>
          <div style={{ display: "flex", gap: "2px" }}>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>_</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>□</button>
            <button style={{ minWidth: "24px", padding: "2px 6px", fontSize: "12px" }}>×</button>
          </div>
        </div>

        {/* Content */}
        <div className="window-content">
          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" }}>
            {/* Left - Epoch Info */}
            <div>
              <fieldset>
                <legend>Epoch Information</legend>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Current Epoch</td>
                      <td className="text-mono" style={{ textAlign: "right" }}>1</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Time Remaining</td>
                      <td className="text-mono" style={{ textAlign: "right" }}>6d 23h 45m</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Your Voting Power</td>
                      <td className="text-mono" style={{ textAlign: "right" }}>0 veNFT</td>
                    </tr>
                    <tr style={{ background: totalAllocated > 100 ? "#ffeeee" : "#e8ffe8" }}>
                      <td style={{ fontWeight: 700 }}>Votes Allocated</td>
                      <td className="text-mono" style={{ textAlign: "right", fontWeight: 700 }}>
                        {totalAllocated}%
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600 }}>Remaining</td>
                      <td className="text-mono" style={{ textAlign: "right" }}>
                        {100 - totalAllocated}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>

              <fieldset>
                <legend>Actions</legend>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button 
                    className="btn-primary" 
                    disabled={totalAllocated === 0 || totalAllocated > 100}
                    style={{ width: "100%", padding: "12px" }}
                  >
                    Cast Votes
                  </button>
                  <button 
                    onClick={() => setAllocations({})}
                    style={{ width: "100%" }}
                  >
                    Reset All
                  </button>
                </div>
              </fieldset>
            </div>

            {/* Right - Gauges Table */}
            <fieldset>
              <legend>Gauges - Allocate Your Votes</legend>
              <table>
                <thead>
                  <tr>
                    <th>Pool</th>
                    <th style={{ textAlign: "right" }}>Total Votes</th>
                    <th style={{ textAlign: "right" }}>Bribes</th>
                    <th style={{ textAlign: "right" }}>Expected APR</th>
                    <th style={{ textAlign: "center", width: "150px" }}>Your Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  {GAUGES.map((gauge) => (
                    <tr key={gauge.id}>
                      <td className="text-mono" style={{ fontWeight: 700 }}>{gauge.pair}</td>
                      <td className="text-mono" style={{ textAlign: "right" }}>{gauge.votes}</td>
                      <td className="text-mono text-success" style={{ textAlign: "right" }}>{gauge.bribes}</td>
                      <td className="text-mono" style={{ textAlign: "right" }}>
                        {((Number(gauge.bribes.replace(/[^0-9]/g, "")) / (gauge.weight || 1)) * 100).toFixed(2)}%
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={allocations[gauge.id] || 0}
                            onChange={(e) => setAllocations({ ...allocations, [gauge.id]: Number(e.target.value) })}
                            style={{ width: "70px", textAlign: "right", padding: "6px 8px" }}
                          />
                          <span style={{ fontWeight: 600 }}>%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </fieldset>
          </div>
        </div>

        {/* Status Bar */}
        <div className="statusbar">
          <strong>Epoch ends in:</strong> 6d 23h 45m | <strong>Your Power:</strong> 0 veNFT
        </div>
      </div>
    </div>
  );
}
