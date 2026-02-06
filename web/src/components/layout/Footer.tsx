"use client";

import Link from "next/link";
import { useBlockNumber } from "wagmi";
import { monad } from "@/lib/wagmi";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const { data: blockNumber } = useBlockNumber({
    chainId: monad.id,
    watch: true,
  });

  return (
    <footer className="border-t border-white/5 bg-[#050510]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="#"
            className="flex items-center gap-1 text-zinc-500 transition-colors hover:text-white"
          >
            Docs
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-zinc-500 transition-colors hover:text-white"
          >
            GitHub
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-zinc-500 transition-colors hover:text-white"
          >
            Twitter
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        {/* Chain info */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-zinc-500">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Monad</span>
          </div>
          {blockNumber && (
            <span className="font-mono text-xs text-zinc-600">
              Block {blockNumber.toString()}
            </span>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 px-4 py-4 text-center text-xs text-zinc-600">
        © 2024 Solidly DEX. All rights reserved.
      </div>
    </footer>
  );
}
