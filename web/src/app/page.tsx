"use client";

import Link from "next/link";
import { ArrowRight, Repeat, Droplets, Vote, Lock, Gift, TrendingUp, Shield, Zap } from "lucide-react";

const STATS = [
  { label: "Total Value Locked", value: "$0.00", prefix: "" },
  { label: "24h Trading Volume", value: "$0.00", prefix: "" },
  { label: "Total veNFTs", value: "0", prefix: "" },
];

const FEATURES = [
  {
    icon: Repeat,
    title: "Swap",
    description: "Trade tokens with minimal slippage using our optimized AMM",
    href: "/swap",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Droplets,
    title: "Liquidity",
    description: "Provide liquidity to earn trading fees and emission rewards",
    href: "/liquidity",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Vote,
    title: "Vote",
    description: "Direct emissions to your favorite pools and earn bribes",
    href: "/vote",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Lock,
    title: "Lock",
    description: "Lock SOLID tokens to receive veNFTs and voting power",
    href: "/lock",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Gift,
    title: "Rewards",
    description: "Claim your emissions, fees, and bribe rewards",
    href: "/rewards",
    gradient: "from-green-500 to-emerald-500",
  },
];

const HIGHLIGHTS = [
  { icon: Zap, text: "Lightning-fast trades on Monad" },
  { icon: Shield, text: "Audited smart contracts" },
  { icon: TrendingUp, text: "ve(3,3) tokenomics" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-glow-pulse absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl" />
        <div className="animate-glow-pulse absolute -bottom-40 right-0 h-[400px] w-[600px] rounded-full bg-gradient-to-tl from-blue-600/10 via-cyan-600/5 to-transparent blur-3xl" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-32">
        {/* Hero Section */}
        <div className="animate-fade-in mb-20 text-center">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-gradient">Solidly DEX</span>
          </h1>
          <p className="mx-auto mb-4 max-w-2xl text-xl text-zinc-400 sm:text-2xl">
            The first ve(3,3) DEX on Monad
          </p>
          <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-500">
            Trade, provide liquidity, vote for emissions, and earn rewards with the most capital-efficient AMM.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/swap">
              <button className="btn-gradient inline-flex items-center gap-2 text-lg">
                Start Trading
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/liquidity">
              <button className="btn-secondary inline-flex items-center gap-2 text-lg">
                Add Liquidity
              </button>
            </Link>
          </div>

          {/* Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
            {HIGHLIGHTS.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-indigo-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="animate-fade-in mb-20 grid gap-4 sm:grid-cols-3" style={{ animationDelay: "0.2s" }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="glass-card glow p-6 text-center transition-all duration-300"
            >
              <p className="mb-2 text-sm font-medium text-zinc-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.prefix}{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            Get Started
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <div className="glass-card glow group h-full p-6 transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex items-center gap-4">
                    <div className={`rounded-xl bg-gradient-to-br ${feature.gradient} p-3`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-zinc-400">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Spacing for Mobile Nav */}
        <div className="h-20 sm:hidden" />
      </div>
    </div>
  );
}
