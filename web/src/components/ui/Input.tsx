"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  onMax?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onChange, suffix, onMax, disabled, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only allow numbers and decimals
      const newValue = e.target.value.replace(/[^0-9.]/g, "");
      // Prevent multiple decimals
      const parts = newValue.split(".");
      if (parts.length > 2) return;
      onChange(newValue);
    };

    return (
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent text-right text-2xl font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder="0"
          {...props}
        />
        {(suffix || onMax) && (
          <div className="ml-2 flex items-center gap-2">
            {onMax && (
              <button
                type="button"
                onClick={onMax}
                disabled={disabled}
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
              >
                MAX
              </button>
            )}
            {suffix && (
              <span className="text-sm text-zinc-400">{suffix}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
