"use client";

import { useState } from "react";
import { Settings, Sliders } from "lucide-react";
import { Modal, Button, Tabs } from "@/components/ui";
import { useSettingsStore } from "@/stores";
import { SLIPPAGE_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SwapSettingsProps {
  open: boolean;
  onClose: () => void;
}

export function SwapSettings({ open, onClose }: SwapSettingsProps) {
  const { slippage, deadline, setSlippage, setDeadline } = useSettingsStore();
  const [customSlippage, setCustomSlippage] = useState("");

  const handleSlippagePreset = (value: number) => {
    setSlippage(value);
    setCustomSlippage("");
  };

  const handleCustomSlippage = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 50) {
      setSlippage(num);
    }
    setCustomSlippage(value);
  };

  const handleDeadline = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0 && num <= 180) {
      setDeadline(num);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Settings">
      {/* Slippage */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Slippage Tolerance
        </label>
        <div className="flex gap-2">
          {SLIPPAGE_OPTIONS.map((value) => (
            <button
              key={value}
              onClick={() => handleSlippagePreset(value)}
              className={cn(
                "flex-1 rounded-lg py-2 text-sm font-medium transition-colors",
                slippage === value && !customSlippage
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              )}
            >
              {value}%
            </button>
          ))}
          <div className="relative flex-1">
            <input
              type="text"
              value={customSlippage}
              onChange={(e) => handleCustomSlippage(e.target.value)}
              placeholder="Custom"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-3 pr-8 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
              %
            </span>
          </div>
        </div>
        {slippage > 1 && (
          <p className="mt-2 text-xs text-yellow-500">
            High slippage may result in unfavorable trades
          </p>
        )}
      </div>

      {/* Transaction deadline */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Transaction Deadline
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={deadline}
            onChange={(e) => handleDeadline(e.target.value)}
            min="1"
            max="180"
            className="w-20 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none"
          />
          <span className="text-sm text-zinc-400">minutes</span>
        </div>
      </div>
    </Modal>
  );
}

export function SwapSettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
      >
        <Sliders className="h-5 w-5" />
      </button>
      <SwapSettings open={open} onClose={() => setOpen(false)} />
    </>
  );
}
