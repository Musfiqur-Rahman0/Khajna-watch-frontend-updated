import { Skeleton } from "@/components/ui/skeleton";

export function PlotCardSkeleton() {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index}>
            <Skeleton className="h-3 w-12" />
            <Skeleton className="mt-2 h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SnapshotSkeleton() {
  return (
    <div className="rounded-lg bg-surface/80 px-4 py-3 shadow-[0_0_0_1px_var(--color-line)]">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-2 h-8 w-12" />
    </div>
  );
}

export function ReportCardSkeleton() {
  return (
    <li className="rounded-xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-line)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-5/6" />
      <div className="mt-4 flex justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </li>
  );
}

export function PlotDetailSkeleton() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10" aria-busy="true">
      <Skeleton className="h-3 w-24" />
      <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <Skeleton className="h-10 w-72 max-w-full" />
          <Skeleton className="mt-2 h-5 w-64 max-w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] sm:p-6">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index}>
                <Skeleton className="h-3 w-14" />
                <Skeleton className="mt-2 h-5 w-24" />
              </div>
            ))}
          </div>
          <Skeleton className="mt-6 h-4 w-5/6" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
        <div className="rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
          <Skeleton className="h-5 w-28" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex justify-between gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex gap-1 overflow-hidden">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-11 w-24 shrink-0" />
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-4 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-4/5" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </div>
    </main>
  );
}
