"use client";

import Link from "next/link";
import { ArrowRight, Droplets, Vote, Lock, Gift } from "lucide-react";
import { PageContainer } from "@/components/layout";
import { Card, Button } from "@/components/ui";

const FEATURES = [
  {
    icon: Droplets,
    title: "Swap",
    description: "Trade tokens with minimal slippage",
    href: "/swap",
  },
  {
    icon: Droplets,
    title: "Liquidity",
    description: "Provide liquidity and earn fees",
    href: "/liquidity",
  },
  {
    icon: Vote,
    title: "Vote",
    description: "Vote for pools and earn bribes",
    href: "/vote",
  },
  {
    icon: Lock,
    title: "Lock",
    description: "Lock tokens to get veNFTs",
    href: "/lock",
  },
  {
    icon: Gift,
    title: "Rewards",
    description: "Claim your emissions and bribes",
    href: "/rewards",
  },
];

export default function HomePage() {
  return (
    <PageContainer>
      {/* Hero */}
      <div className="py-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Solidly DEX
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-zinc-400">
          The first ve(3,3) DEX on Monad. Trade, provide liquidity, vote for emissions,
          and earn rewards.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/swap">
            <Button size="lg">
              Start Trading
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/liquidity">
            <Button variant="secondary" size="lg">
              Add Liquidity
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 py-8 sm:grid-cols-3">
        <Card className="text-center">
          <p className="text-sm text-zinc-400">Total Value Locked</p>
          <p className="text-2xl font-bold text-zinc-100">$0.00</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-zinc-400">24h Volume</p>
          <p className="text-2xl font-bold text-zinc-100">$0.00</p>
        </Card>
        <Card className="text-center">
          <p className="text-sm text-zinc-400">Total veNFTs</p>
          <p className="text-2xl font-bold text-zinc-100">0</p>
        </Card>
      </div>

      {/* Features */}
      <div className="py-8">
        <h2 className="mb-6 text-xl font-semibold text-zinc-100">Get Started</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <Card className="h-full transition-colors hover:border-zinc-700">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-indigo-900/30 p-2">
                    <feature.icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-100">{feature.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{feature.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
