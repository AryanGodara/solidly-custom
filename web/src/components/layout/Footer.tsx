"use client";

import Link from "next/link";
import { useBlockNumber } from "wagmi";
import { monad } from "@/lib/wagmi";

export function Footer() {
  const { data: blockNumber } = useBlockNumber({
    chainId: monad.id,
    watch: true,
  });

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Links */}
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <Link href="#" className="hover:text-zinc-300">
            Docs
          </Link>
          <Link href="#" className="hover:text-zinc-300">
            GitHub
          </Link>
          <Link href="#" className="hover:text-zinc-300">
            Twitter
          </Link>
        </div>

        {/* Chain info */}
        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span>Monad</span>
          {blockNumber && (
            <span className="font-mono">Block {blockNumber.toString()}</span>
          )}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-zinc-800 px-4 py-3 text-center text-xs text-zinc-600">
        © 2024 Solidly DEX. All rights reserved.
      </div>
    </footer>
  );
}
