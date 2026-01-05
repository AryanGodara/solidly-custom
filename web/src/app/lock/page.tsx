"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Plus } from "lucide-react";
import { PageContainer } from "@/components/layout";
import { Card, Button, Badge, Skeleton } from "@/components/ui";
import { formatDuration } from "@/lib/format";
import { SECONDS_PER_WEEK, MAX_LOCK_DURATION } from "@/lib/constants";

const LOCK_PRESETS = [
  { label: "1 Week", value: SECONDS_PER_WEEK },
  { label: "4 Weeks", value: SECONDS_PER_WEEK * 4 },
  { label: "12 Weeks", value: SECONDS_PER_WEEK * 12 },
  { label: "26 Weeks", value: MAX_LOCK_DURATION },
];

export default function LockPage() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(SECONDS_PER_WEEK * 4);

  // Calculate voting power based on lock duration
  const votingPowerMultiplier = duration / MAX_LOCK_DURATION;
  const estimatedVotingPower = amount ? parseFloat(amount) * votingPowerMultiplier : 0;

  const handleCreateLock = () => {
    // TODO: Implement lock creation
    console.log("Creating lock:", { amount, duration });
  };

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Lock</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Lock tokens to receive veNFTs and voting power
        </p>
      </div>

      {/* Create lock card */}
      <Card className="mx-auto max-w-lg">
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Create Lock</h2>

        {/* Amount input */}
        <div className="mb-4">
          <label className="mb-2 block text-sm text-zinc-400">Amount to Lock</label>
          <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="0"
              className="flex-1 bg-transparent text-right text-xl font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />
            <span className="font-medium text-zinc-400">SOLID</span>
          </div>
          <p className="mt-1 text-right text-xs text-zinc-500">
            Balance: 0.00
          </p>
        </div>

        {/* Duration selector */}
        <div className="mb-4">
          <label className="mb-2 block text-sm text-zinc-400">Lock Duration</label>
          <div className="mb-3 grid grid-cols-4 gap-2">
            {LOCK_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setDuration(preset.value)}
                className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                  duration === preset.value
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={SECONDS_PER_WEEK}
            max={MAX_LOCK_DURATION}
            step={SECONDS_PER_WEEK}
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full cursor-pointer accent-indigo-600"
          />
          <div className="mt-1 flex justify-between text-xs text-zinc-500">
            <span>1 week</span>
            <span>{formatDuration(duration)}</span>
            <span>26 weeks</span>
          </div>
        </div>

        {/* Estimated voting power */}
        <div className="mb-6 rounded-lg bg-zinc-800/50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Estimated Voting Power</span>
            <span className="text-xl font-bold text-indigo-400">
              {estimatedVotingPower.toFixed(4)} veNFT
            </span>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Longer lock duration = more voting power. Voting power decays linearly
            until unlock.
          </p>
        </div>

        {/* Create button */}
        <Button
          size="lg"
          className="w-full"
          onClick={handleCreateLock}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          Create Lock
        </Button>
      </Card>

      {/* Existing veNFTs */}
      <div className="mx-auto mt-8 max-w-lg">
        <h2 className="mb-4 text-lg font-semibold text-zinc-100">Your veNFTs</h2>
        <Card className="py-8 text-center">
          <p className="text-zinc-400">No veNFTs found</p>
          <p className="mt-1 text-sm text-zinc-500">
            Create a lock to receive your first veNFT
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}
