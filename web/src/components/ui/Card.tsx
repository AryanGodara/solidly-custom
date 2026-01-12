import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn("section", className)}
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        padding: "16px",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
