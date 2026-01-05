"use client";

import { PageContainer } from "@/components/layout";
import { Card, Button, Badge } from "@/components/ui";

// Placeholder rewards data
const REWARDS = [
  { id: 1, token: "SOLID", amount: 0, source: "Gauge Emissions", value: 0 },
  { id: 2, token: "USDC", amount: 0, source: "Trading Fees", value: 0 },
  { id: 3, token: "WMON", amount: 0, source: "Bribes", value: 0 },
];

export default function RewardsPage() {
  const totalClaimable = REWARDS.reduce((sum, r) => sum + r.value, 0);

  const handleClaimAll = () => {
    // TODO: Implement claim all
    console.log("Claiming all rewards");
  };

  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Rewards</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Claim your emissions, trading fees, and bribes
        </p>
      </div>

      {/* Overview */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">Total Claimable</p>
            <p className="text-3xl font-bold text-zinc-100">
              ${totalClaimable.toLocaleString()}
            </p>
          </div>
          <Button onClick={handleClaimAll} disabled={totalClaimable === 0}>
            Claim All
          </Button>
        </div>
      </Card>

      {/* Rewards by category */}
      <div className="space-y-4">
        <RewardCategory
          title="Gauge Emissions"
          description="Rewards from staking LP tokens in gauges"
          rewards={REWARDS.filter((r) => r.source === "Gauge Emissions")}
        />
        <RewardCategory
          title="Trading Fees"
          description="Your share of trading fees from voting"
          rewards={REWARDS.filter((r) => r.source === "Trading Fees")}
        />
        <RewardCategory
          title="Bribes"
          description="Incentives for voting on specific pools"
          rewards={REWARDS.filter((r) => r.source === "Bribes")}
        />
      </div>
    </PageContainer>
  );
}

interface Reward {
  id: number;
  token: string;
  amount: number;
  source: string;
  value: number;
}

interface RewardCategoryProps {
  title: string;
  description: string;
  rewards: Reward[];
}

function RewardCategory({ title, description, rewards }: RewardCategoryProps) {
  const totalValue = rewards.reduce((sum, r) => sum + r.value, 0);

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-zinc-100">{title}</h3>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
        <Badge variant={totalValue > 0 ? "success" : "default"}>
          ${totalValue.toLocaleString()}
        </Badge>
      </div>

      {rewards.length === 0 || totalValue === 0 ? (
        <p className="text-sm text-zinc-500">No rewards available</p>
      ) : (
        <div className="space-y-2">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between rounded-lg bg-zinc-800/50 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                <div>
                  <span className="font-medium text-zinc-100">{reward.token}</span>
                  <p className="text-xs text-zinc-500">{reward.amount}</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Claim
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
