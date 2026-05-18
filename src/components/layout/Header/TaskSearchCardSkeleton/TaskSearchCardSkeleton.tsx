export default function TaskSearchCardSkeleton() {
  return (
    <div className="flex w-full justify-between p-2.5 rounded-2xl border border-neutral-200 items-center gap-2.5 h-20">
      <div className="shrink grow">
        <div className="h-5 bg-neutral-200 rounded animate-pulse w-3/4" />
      </div>

      <div className="rounded-lg overflow-hidden shrink-0">
        <div className="w-25 h-10 bg-neutral-200 animate-pulse" />
      </div>
    </div>
  );
}
