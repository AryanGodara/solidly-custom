"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Repeat, Droplets, Vote, Lock, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/swap", label: "Swap", icon: Repeat },
  { href: "/liquidity", label: "Liquidity", icon: Droplets },
  { href: "/vote", label: "Vote", icon: Vote },
  { href: "/lock", label: "Lock", icon: Lock },
  { href: "/rewards", label: "Rewards", icon: Gift },
];

export function BottomNav() {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#050510]/95 backdrop-blur-xl sm:hidden">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 transition-all duration-200",
                isActive ? "text-white" : "text-zinc-500"
              )}
            >
              <div className="relative">
                <item.icon className={cn("h-5 w-5", isActive && "text-indigo-400")} />
                {isActive && (
                  <div className="absolute -inset-2 rounded-full bg-indigo-500/20 blur-md" />
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-2 h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              )}
            </Link>
          );
        })}
      </div>
      {/* Safe area spacing for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
