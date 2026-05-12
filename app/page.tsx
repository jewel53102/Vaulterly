import Link from "next/link";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";
import { getAllPosts } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "AI Study Tips": "bg-[#ebf2f8] text-[#4a7a9b]",
  "Study Skills": "bg-emerald-50 text-emerald-700",
  Tools: "bg-amber-50 text-amber-700",
};

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <>
      <AppHeaderAuth />

      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-4 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                  Built for students
                </p>

                <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  The vault every student wishes they had at the start of the semester.
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Save your sources, notes, and study links once — then bring your whole vault into your AI when it&apos;s time to write.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    Build your study vault — free
                  </Link>

                  <Link
                    href="/explore"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Browse student vaults
                  </Link>
                </div>
              </div>

              {/* Mock vault card */}
              <div className="rounded-3xl border border-[#e8d8c8] bg-[#F1DFCA] p-4 shadow-sm">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#fef3e8] px-3 py-1 text-xs font-medium text-[#F69149]">
                      Student Research
                    </span>
                    <span className="rounded-full bg-[#faf6f2] px-3 py-1 text-xs font-semibold text-[#553F28]">
                      Due Friday
                    </span>
                  </div>

                  <h2 className="text-xl font-bold leading-7 text-[#553F28]">
                    The Milgram paper — Conformity &amp; Ethics
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#8a7060]">
                    Everything I need before I start writing. Sources, notes, and the argument I&apos;m building.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fef3e8] px-2.5 py-1 text-xs font-medium text-[#F69149]">
                      #conformity-paper
                    </span>
                    <span className="rounded-full bg-[#fef3e8] px-2.5 py-1 text-xs font-medium text-[#F69149]">
                      #psych101
                    </span>
                    <span className="rounded-full bg-[#fef3e8] px-2.5 py-1 text-xs font-medium text-[#F69149]">
                      #due-friday
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-[#e8d8c8] bg-[#faf6f2] p-4">
                      <p className="text-sm font-semibold text-[#553F28]">
                        Milgram (1963) — original obedience study
                      </p>
                      <p className="mt-1 text-sm text-[#8a7060]">
                        Core source for the ethics argument. Cite in intro and conclusion.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#e8d8c8] bg-[#faf6f2] p-4">
                      <p className="text-sm font-semibold text-[#553F28]">
                        YouTube — Crash Course: Social influence explained
                      </p>
                      <p className="mt-1 text-sm text-[#8a7060]">
                        Way clearer than the textbook. Good framing for the intro paragraph.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#e8d8c8] bg-[#faf6f2] p-4">
                      <p className="text-sm font-semibold text-[#553F28]">
                        Prof&apos;s note — &ldquo;focus on the role of authority, not just obedience&rdquo;
                      </p>
                      <p className="mt-1 text-sm text-[#8a7060]">
                        From office hours. This is probably what distinguishes a B from an A.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#e8d8c8] pt-4">
                    <p className="text-xs text-[#8a7060]">8 sources saved</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ebf2f8] px-3 py-1.5 text-xs font-semibold text-[#4a7a9b]">
                      Copy vault context →
                    </span>
                  </div>

                  {/* AI output snippet */}
                  <div className="mt-4 rounded-2xl border border-[#d8e8f5] bg-[#ebf2f8] p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#4a7a9b]">
                      Claude&apos;s response
                    </p>
                    <p className="text-sm leading-6 text-slate-700">
                      &ldquo;Based on your sources, Milgram&apos;s findings suggest obedience is driven less by personal ethics than by perceived legitimate authority — a distinction your professor specifically flagged. Your intro could open with the authority framing rather than the obedience result to set that argument up from the start.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem section */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Sound familiar?
            </p>

            <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950">
              It&apos;s Sunday night. The paper is due Monday. You saved the source two weeks ago.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              You&apos;ve checked your browser history, three Google Docs, your notes app, and your DMs.
              It&apos;s gone. You start re-searching from scratch.
              Vaulterly gives every source, link, and note a permanent address — so you never lose the thing you actually needed.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
              How It Works
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Four steps. No setup. Works the way you already think.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#779EBF]">
                Drop in the link
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Paste any URL — article, video, PDF, Canvas page — straight into your vault.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#779EBF]">Note why you saved it</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Add which class it&apos;s for and why it matters — so it makes sense two weeks later.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#779EBF]">Group by class or paper</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Organize everything by subject, project, or deadline — not by when you found it.
              </p>
            </div>

            <div className="rounded-3xl border border-[#d8e8f5] bg-[#ebf2f8] p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#4a7a9b]">Bring it into your AI</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                When it&apos;s time to write, copy your vault context into ChatGPT or Claude. Your AI now knows everything you researched.
              </p>
            </div>
          </div>
        </section>

        {/* AI differentiator */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                  The AI advantage
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  Your AI is only as good as the context you give it.
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  Without sources, AI hallucinates citations and writes generic essays. With a vault, you give it everything you actually researched — and it writes from that.
                </p>

                <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                  One click copies your entire vault — titles, notes, and URLs — as plain text. Paste it into any AI chat. Your AI now has everything you found, in context.
                </p>

                <p className="mt-3 max-w-xl text-sm text-slate-500">
                  Works with ChatGPT, Claude, Gemini, Perplexity, and any AI that accepts a text prompt.
                </p>

                <Link
                  href="/how-it-works"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-[#4a7a9b] hover:underline"
                >
                  See exactly how it works →
                </Link>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Without Vaulterly</p>
                  <p className="mt-2 text-base font-semibold text-slate-700">
                    Re-search from scratch. Paste random links. Get a generic essay with made-up citations.
                  </p>
                </div>

                <div className="rounded-3xl border border-[#d8e8f5] bg-[#ebf2f8] p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#4a7a9b]">With Vaulterly</p>
                  <p className="mt-2 text-base font-semibold text-slate-700">
                    Open your vault. Copy context. Paste into your AI. Then ask it to:
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                    <li>→ Outline your argument using only the sources you saved</li>
                    <li>→ Draft your intro paragraph from your actual research</li>
                    <li>→ Find gaps — what did you miss before writing?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof / sharing hook */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                Study smarter, together
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Share your vault. Your classmates will thank you.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Public vaults are shareable — send your whole source list to your study group in one link.
                Browse vaults from other students and steal the structure that works.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <Link
                href="/essays"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <h3 className="text-lg font-bold text-[#779EBF]">Essays &amp; research papers</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Every source cited, annotated, and organized before you start writing.
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[#4a7a9b] group-hover:underline">
                  Learn more →
                </span>
              </Link>

              <Link
                href="/exam-prep"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <h3 className="text-lg font-bold text-[#779EBF]">Exam prep</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  All your study materials, videos, and notes in one searchable place.
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[#4a7a9b] group-hover:underline">
                  Learn more →
                </span>
              </Link>

              <Link
                href="/group-projects"
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <h3 className="text-lg font-bold text-[#779EBF]">Group projects</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Make your vault public and share the link — everyone gets the same sources.
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[#4a7a9b] group-hover:underline">
                  Learn more →
                </span>
              </Link>
            </div>

          </div>
        </section>

        {/* CTA pair */}
        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              Takes 30 seconds
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Save your first source right now.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              The first time you open a vault instead of re-Googling something you already found — that&apos;s when it clicks.
              No complex setup. Just a better system.
            </p>

            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Build your study vault — free
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
              See it in action
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Browse real student vaults
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              See how other students organize their research, essays, and study materials.
              Steal the structure, use the tags, and build your own version.
            </p>

            <Link
              href="/explore"
              className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Browse student vaults
            </Link>
          </div>
        </section>

        {/* From the blog */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                From the blog
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Study tips &amp; AI writing guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden shrink-0 text-sm font-semibold text-[#4a7a9b] hover:underline sm:block"
            >
              All articles →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      categoryColors[post.category] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readingTime}</span>
                </div>

                <h3 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-[#4a7a9b] transition-colors">
                  {post.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
                  {post.description}
                </p>

                <span className="mt-4 text-sm font-medium text-[#4a7a9b]">
                  Read article →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link href="/blog" className="text-sm font-semibold text-[#4a7a9b] hover:underline">
              All articles →
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 text-center shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Build a vault this semester. Feed it your research. Write better papers.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Your AI needs context. Your vault is where you build it.
            </p>

            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#779EBF] transition hover:bg-slate-100"
            >
              Build your study vault — free
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
