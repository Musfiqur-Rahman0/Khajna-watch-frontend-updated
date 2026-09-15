import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface p-4 text-ink shadow-[0_0_0_1px_var(--color-line),0_1px_2px_rgba(28,25,20,0.04)]",
        className,
      )}
      {...props}
    />
  );
}
