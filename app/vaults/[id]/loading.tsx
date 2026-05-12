export default function VaultLoading() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Vault header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-4 h-4 w-32 rounded bg-slate-200" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="h-8 w-2/3 rounded-xl bg-slate-200" />
                <div className="mt-3 h-5 w-full max-w-lg rounded-lg bg-slate-200" />
                <div className="mt-1.5 h-5 w-1/2 rounded-lg bg-slate-200" />
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-slate-200" />
                  <div className="h-6 w-20 rounded-full bg-slate-200" />
                  <div className="h-6 w-14 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <div className="h-10 w-28 rounded-xl bg-slate-200" />
                <div className="h-10 w-28 rounded-xl bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entry list */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="h-5 w-1/2 rounded-lg bg-slate-200" />
                  <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
                  <div className="mt-1.5 h-4 w-2/3 rounded bg-slate-200" />
                  <div className="mt-3 flex gap-2">
                    <div className="h-5 w-14 rounded-full bg-slate-200" />
                    <div className="h-5 w-16 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="h-8 w-16 shrink-0 rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
