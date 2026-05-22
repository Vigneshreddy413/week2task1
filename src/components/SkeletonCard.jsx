export default function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex gap-3">
        <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((item) => <div key={item} className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />)}
      </div>
    </div>
  );
}
