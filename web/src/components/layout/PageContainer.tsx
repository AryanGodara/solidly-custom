import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto min-h-screen max-w-6xl px-4 pb-28 pt-24 sm:pb-20",
        className
      )}
    >
      {children}
    </main>
  );
}
