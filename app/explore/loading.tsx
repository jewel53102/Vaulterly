export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header skeleton */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse max-w-3xl">
            <div className="mb-3 h-6 w-36 rounded-full bg-slate-200" />
            <div className="h-10 w-2/3 rounded-xl bg-slate-200" />
            <div className="mt-4 h-6 w-full max-w-lg rounded-lg bg-slate-200" />
            <div className="mt-2 h-6 w-1/2 rounded-lg bg-slate-200" />
            <div className="mt-6 flex gap-3">
              <div className="h-11 w-36 rounded-xl bg-slate-200" />
              <div className="h-11 w-44 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured vault skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse rounded-3xl border border-[#e8d8c8] bg-[#F1DFCA] p-6 sm:p-8">
          <div className="mb-4 h-6 w-28 rounded-full bg-[#e8c8a8]" />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="h-8 w-3/4 rounded-xl bg-[#e8c8a8]" />
              <div className="mt-3 h-5 w-full rounded-lg bg-[#e8c8a8]" />
              <div className="mt-2 h-5 w-5/6 rounded-lg bg-[#e8c8a8]" />
              <div className="mt-6 h-11 w-32 rounded-xl bg-[#e8c8a8]" />
              <div className="mt-5 h-px w-full bg-[#e8c8a8]" />
              <div className="mt-4 h-5 w-40 rounded-lg bg-[#e8c8a8]" />
            </div>
            <div className="rounded-2xl border border-[#e8d8c8] bg-white p-5">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="mt-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border border-[#e8d8c8] bg-[#faf6f2] p-4">
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="mt-2 h-3 w-full rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search + grid skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search bar */}
        <div className="animate-pulse mb-6 max-w-2xl">
          <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="h-12 flex-1 rounded-xl bg-slate-200" />
            <div className="h-12 w-24 rounded-xl bg-slate-200" />
          </div>
        </div>

        {/* Vault card grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              {/* Badge row */}
              <div className="mb-4 flex items-center justify-between">
                <div className="h-5 w-20 rounded-full bg-slate-200" />
                <div className="h-5 w-16 rounded-full bg-slate-200" />
              </div>
              {/* Title */}
              <div className="h-5 w-3/4 rounded-lg bg-slate-200" />
              <div className="mt-1.5 h-5 w-1/2 rounded-lg bg-slate-200" />
              {/* Description */}
              <div className="mt-3 h-4 w-full rounded bg-slate-200" />
              <div className="mt-1.5 h-4 w-5/6 rounded bg-slate-200" />
              {/* Tags */}
              <div className="mt-4 flex gap-2">
                <div className="h-5 w-14 rounded-full bg-slate-200" />
                <div className="h-5 w-16 rounded-full bg-slate-200" />
                <div className="h-5 w-12 rounded-full bg-slate-200" />
              </div>
              {/* Entries preview */}
              <div className="mt-4 space-y-2">
                {[1, 2].map((j) => (
                  <div key={j} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="h-3.5 w-3/4 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div className="mt-auto pt-5 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-9 rounded-xl bg-slate-200" />
                  <div className="h-9 rounded-xl bg-slate-200" />
                </div>
                <div className="h-9 rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
