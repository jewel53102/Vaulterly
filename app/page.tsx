import Link from "next/link";
import AppHeader from "@/app/components/AppHeader";

export default function HomePage() {
  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                  Vaulterly
                </p>

                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  The Reference Manager for Everything
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Save sources, articles, datasets, tools, and notes — and pipe the whole vault into your AI when you're ready to write.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Start Your First Vault
                  </Link>

                  <Link
                    href="/explore"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Explore Public Vaults
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-[#e8d8c8] bg-[#F1DFCA] p-4 shadow-sm">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#fef3e8] px-3 py-1 text-xs font-medium text-[#F69149]">
                      Student Research
                    </span>
                    <span className="rounded-full bg-[#faf6f2] px-3 py-1 text-xs font-semibold text-[#553F28]">
                      Public
                    </span>
                  </div>

                  <h2 className="text-xl font-bold leading-7 text-[#553F28]">
                    Psychology 101 Study Vault
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#8a7060]">
                    Articles, notes, tools, and references organized in one
                    place for quick review later.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fef3e8] px-2.5 py-1 text-xs font-medium text-[#F69149]">
                      #study
                    </span>
                    <span className="rounded-full bg-[#fef3e8] px-2.5 py-1 text-xs font-medium text-[#F69149]">
                      #research
                    </span>
                    <span className="rounded-full bg-[#fef3e8] px-2.5 py-1 text-xs font-medium text-[#F69149]">
                      #sources
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-[#e8d8c8] bg-[#faf6f2] p-4">
                      <p className="text-sm font-semibold text-[#553F28]">
                        Essay Sources
                      </p>
                      <p className="mt-1 text-sm text-[#8a7060]">
                        Saved with notes so the context is still clear later.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#e8d8c8] bg-[#faf6f2] p-4">
                      <p className="text-sm font-semibold text-[#553F28]">
                        Study Tools
                      </p>
                      <p className="mt-1 text-sm text-[#8a7060]">
                        Useful links grouped by class, project, or topic.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Find Your Information, Quickly
            </p>

            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950">
              You already have the information. You just can’t find it.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              You save links. You take notes. You open 20 tabs. But when it’s
              time to use it, you’re digging, re-searching, and starting over.
              Vaulterly gives all your information a place to live.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
              How It Works
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Turn scattered information into something usable.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-blue-500">
                Save what matters
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep links, notes, ideas, tools, and research together.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-blue-500">Add context</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Write why you saved something so it makes sense later.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-blue-500">Build vaults</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Organize information by class, project, topic, or goal.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-blue-500">Find it again</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Search and return to what you saved when you need it.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                Use Cases
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Built for how you actually work
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-blue-500">Students</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Keep research, essays, study materials, and sources organized.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-blue-500">Researchers</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Track papers, sources, links, and notes without losing them.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-blue-500">Writers</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Collect ideas, references, outlines, and inspiration.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <h3 className="text-lg font-bold text-blue-500">Teachers</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Plan lessons, organize resources, and reuse good material.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              First Step
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Save one thing. You’ll understand immediately.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              The first time you save a link and actually find it later, that’s
              when it clicks. No complex setup. Just a better system.
            </p>

            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Create Your First Vault
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
              Explore
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              See how others organize knowledge
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Browse real vaults built by students, researchers, and creators.
              Steal the structure, use the ideas, and build your own.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Explore Vaults
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 text-center shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Stop losing useful information.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Start organizing it.
            </p>

            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-500 transition hover:bg-slate-100"
            >
              Start Your First Vault
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}