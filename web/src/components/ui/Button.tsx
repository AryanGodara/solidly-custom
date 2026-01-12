"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", loading, disabled, children, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      fontFamily: "var(--font-mono)",
      fontSize: "14px",
      padding: "8px 16px",
      border: "1px solid var(--border-color)",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled || loading ? 0.5 : 1,
      background: "transparent",
      color: "var(--text-primary)",
    };

    if (variant === "primary") {
      baseStyles.background = "var(--accent)";
      baseStyles.color = "var(--bg-primary)";
      baseStyles.borderColor = "var(--accent)";
    }

    if (variant === "ghost") {
      baseStyles.border = "none";
      baseStyles.background = "transparent";
    }

    return (
      <button
        className={cn(className)}
        ref={ref}
        disabled={disabled || loading}
        style={baseStyles}
        {...props}
      >
        {loading && "..."}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
