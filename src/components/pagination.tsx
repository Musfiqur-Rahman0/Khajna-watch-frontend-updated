"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  /** Current page, 1-indexed. */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** How many page numbers to show on each side of the current page. */
  siblingCount?: number;
  className?: string;
  labels?: { prev: string; next: string };
};

const ELLIPSIS = "ellipsis" as const;

function getPageRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | typeof ELLIPSIS)[] {
  const totalSlots = siblingCount * 2 + 5; // first + last + current + 2*siblings + 2 possible ellipses

  if (totalSlots >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = 3 + siblingCount * 2;
    const leftRange = Array.from({ length: leftCount }, (_, i) => i + 1);
    return [...leftRange, ELLIPSIS, totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = 3 + siblingCount * 2;
    const rightRange = Array.from(
      { length: rightCount },
      (_, i) => totalPages - rightCount + i + 1,
    );
    return [1, ELLIPSIS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, i) => leftSibling + i,
  );
  return [1, ELLIPSIS, ...middleRange, ELLIPSIS, totalPages];
}

/**
 * Renders nothing when there's zero or one page — callers don't need to
 * guard this themselves before dropping <Pagination /> into a page.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  labels = { prev: "Previous", next: "Next" },
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageRange(page, totalPages, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label={labels.prev}
        className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-sm font-medium text-muted transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((p, i) =>
        p === ELLIPSIS ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-subtle"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
              p === page
                ? "bg-forest text-forest-fg"
                : "text-ink hover:bg-paper-2",
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label={labels.next}
        className="inline-flex h-9 items-center gap-1 rounded-md px-2 text-sm font-medium text-muted transition-colors hover:text-ink disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
