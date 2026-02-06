"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout";
import { Card, Button, Badge } from "@/components/ui";

// Placeholder gauge data
const GAUGES = [
  { id: 1, token0: "WMON", token1: "USDC", votes: 25.5, bribes: 1000, userVotes: 0 },
  { id: 2, token0: "WMON", token1: "WETH", votes: 15.2, bribes: 500, userVotes: 0 },
  { id: 3, token0: "USDC", token1: "USDT", votes: 10.8, bribes: 200, userVotes: 0 },
];

export default function VotePage() {
  const [voteAllocations, setVoteAllocations] = useState<Record<number, number>>({});

  const totalVotes = Object.values(voteAllocations).reduce((sum, v) => sum + v, 0);
  const remainingVotes = 100 - totalVotes;

  const handleVoteChange = (gaugeId: number, value: number) => {
    const newValue = Math.min(value, remainingVotes + (voteAllocations[gaugeId] || 0));
    setVoteAllocations((prev) => ({
      ...prev,
      [gaugeId]: newValue,
    }));
  };

  const handleCastVotes = () => {
    // TODO: Implement vote casting
    console.log("Casting votes:", voteAllocations);
  };

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Vote</h1>
        <p className="mt-2 text-zinc-400">
          Vote for pools to direct emissions
        </p>
      </div>

      {/* Epoch info */}
      <Card className="mb-6" glow>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm text-zinc-400">Current Epoch</p>
            <p className="text-2xl font-bold text-white">1</p>
          </div>
          <div className="sm:text-center">
            <p className="text-sm text-zinc-400">Time Until Next Epoch</p>
            <p className="text-2xl font-bold text-white">6d 23h 45m</p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-zinc-400">Your Voting Power</p>
            <p className="text-2xl font-bold text-indigo-400">0 veNFT</p>
          </div>
        </div>
      </Card>

      {/* Vote allocation */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            Votes allocated: <span className="font-medium text-white">{totalVotes}%</span>
          </span>
          <span className="text-sm text-zinc-400">
            Remaining: <span className="font-medium text-white">{remainingVotes}%</span>
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${totalVotes}%` }}
          />
        </div>
      </Card>

      {/* Gauge list */}
      <div className="space-y-3">
        {GAUGES.map((gauge) => (
          <GaugeCard
            key={gauge.id}
            gauge={gauge}
            allocation={voteAllocations[gauge.id] || 0}
            onAllocationChange={(value) => handleVoteChange(gauge.id, value)}
          />
        ))}
      </div>

      {/* Cast votes button */}
      <div className="mt-6">
        <Button
          size="lg"
          className="w-full"
          onClick={handleCastVotes}
          disabled={totalVotes === 0}
        >
          Cast Votes
        </Button>
      </div>
    </PageContainer>
  );
}

interface Gauge {
  id: number;
  token0: string;
  token1: string;
  votes: number;
  bribes: number;
  userVotes: number;
}

interface GaugeCardProps {
  gauge: Gauge;
  allocation: number;
  onAllocationChange: (value: number) => void;
}

function GaugeCard({ gauge, allocation, onAllocationChange }: GaugeCardProps) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Token pair icons */}
        <div className="flex -space-x-3">
          <div className="h-10 w-10 rounded-full border-2 border-[#0f0f1a] bg-gradient-to-br from-indigo-500 to-purple-600" />
          <div className="h-10 w-10 rounded-full border-2 border-[#0f0f1a] bg-gradient-to-br from-amber-500 to-orange-600" />
        </div>
        <div>
          <span className="font-semibold text-white">
            {gauge.token0}/{gauge.token1}
          </span>
          <p className="text-xs text-zinc-500">
            {gauge.votes}% of total votes
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-xs text-zinc-500">Bribes</p>
          <p className="font-medium text-green-400">${gauge.bribes}</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={allocation}
            onChange={(e) => onAllocationChange(parseInt(e.target.value))}
            className="h-2 w-28"
          />
          <span className="w-12 text-right font-mono text-sm text-white">
            {allocation}%
          </span>
        </div>
      </div>
    </Card>
  );
}
