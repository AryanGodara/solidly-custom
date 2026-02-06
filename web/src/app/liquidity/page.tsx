"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageContainer } from "@/components/layout";
import { Card, Button, Badge } from "@/components/ui";

// Placeholder pool data
const POOLS = [
  { id: 1, token0: "WMON", token1: "USDC", stable: false, tvl: 0, apr: 0 },
  { id: 2, token0: "WMON", token1: "WETH", stable: false, tvl: 0, apr: 0 },
  { id: 3, token0: "USDC", token1: "USDT", stable: true, tvl: 0, apr: 0 },
];

export default function LiquidityPage() {
  return (
    <PageContainer>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Liquidity</h1>
          <p className="mt-2 text-zinc-400">
            Add liquidity to pools and earn trading fees
          </p>
        </div>
        <Link href="/liquidity/add">
          <Button>
            <Plus className="h-4 w-4" />
            Add Liquidity
          </Button>
        </Link>
      </div>

      {/* Pool list */}
      <div className="space-y-3">
        {POOLS.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>

      {/* Empty state */}
      {POOLS.length === 0 && (
        <Card className="py-12 text-center">
          <p className="text-zinc-400">No pools found</p>
        </Card>
      )}
    </PageContainer>
  );
}

interface Pool {
  id: number;
  token0: string;
  token1: string;
  stable: boolean;
  tvl: number;
  apr: number;
}

function PoolCard({ pool }: { pool: Pool }) {
  return (
    <Card className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Token pair icons */}
        <div className="flex -space-x-3">
          <div className="h-10 w-10 rounded-full border-2 border-[#0f0f1a] bg-gradient-to-br from-indigo-500 to-purple-600" />
          <div className="h-10 w-10 rounded-full border-2 border-[#0f0f1a] bg-gradient-to-br from-amber-500 to-orange-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {pool.token0}/{pool.token1}
            </span>
            <Badge variant={pool.stable ? "success" : "default"}>
              {pool.stable ? "Stable" : "Volatile"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-xs text-zinc-500">TVL</p>
          <p className="font-medium text-white">${pool.tvl.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-zinc-500">APR</p>
          <p className="font-medium text-green-400">{pool.apr}%</p>
        </div>
        <Link href={`/liquidity/${pool.id}`}>
          <Button variant="secondary" size="sm">
            Manage
          </Button>
        </Link>
      </div>
    </Card>
  );
}
