import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "solid";
  glow?: boolean;
}

export function Card({
  className,
  children,
  variant = "default",
  glow = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 transition-all duration-300",
        {
          "border border-white/8 bg-[rgba(15,15,25,0.8)] backdrop-blur-xl": variant === "default" || variant === "glass",
          "bg-[#0f0f1a]": variant === "solid",
          "hover:border-white/12 hover:bg-[rgba(20,20,35,0.9)]": true,
        },
        glow && "glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
