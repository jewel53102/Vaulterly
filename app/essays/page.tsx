import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";

export const metadata: Metadata = {
  title: "Research Organizer for Essays — Save Sources, Write Without Losing Them",
  description:
    "Save every source as you research, add notes on why it matters, and export your whole research vault into ChatGPT or Claude to write essays grounded in real citations.",
  openGraph: {
    title: "Research Organizer for Essays | Vaulterly",
    description:
      "Save every source as you research, add notes on why it matters, and export your whole research vault into ChatGPT or Claude to write essays grounded in real citations.",
    url: "https://myvaulterly.com/essays",
    siteName: "Vaulterly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Organizer for Essays | Vaulterly",
    description:
      "Save every source as you research, add notes on why it matters, and export your whole research vault into ChatGPT or Claude to write essays grounded in real citations.",
  },
};

const faqItems = [
  {
    q: "Does Vaulterly generate citations automatically?",
    a: "No — Vaulterly saves the sources you find and the notes you add. When you export your vault into an AI like ChatGPT or Claude, the AI can reference those real sources in its output. For formatted citations (APA, MLA), paste your export into your AI and ask it to format them, or use a dedicated citation tool alongside Vaulterly.",
  },
  {
    q: "How do I get my research into ChatGPT?",
    a: "Open your vault, click 'Copy vault context', and paste the result into your ChatGPT or Claude conversation before you start prompting. Your vault exports as plain text — titles, notes, and URLs — which any AI can read.",
  },
  {
    q: "Can I organise sources by argument rather than by topic?",
    a: "Yes. You can create separate vaults per essay and use the notes field on each source to record which argument it supports. Many students create one vault per paper and sort sources manually in the order they plan to use them.",
  },
  {
    q: "Is Vaulterly free?",
    a: "Yes, completely free. No usage limits, no paywalled exports.",
  },
  {
    q: "Can I use Vaulterly for every subject?",
    a: "Yes. Vaulterly works for any kind of essay — humanities, sciences, social sciences, law. It handles URLs, PDFs, YouTube videos, textbook pages, and any other source type.",
  },
];

export default function EssaysPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://myvaulterly.com" },
              { "@type": "ListItem", position: 2, name: "Essays & Research Papers", item: "https://myvaulterly.com/essays" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      <AppHeaderAuth showNewVaultButton={false} />

      <main>
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
            <p className="mb-4 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
              Essays &amp; Research Papers
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Stop losing sources mid-essay. Save them once, use them when it counts.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Vaulterly is a free research organiser for students writing essays. Save every source as you find it, add a note on why it matters, then export your entire vault into your AI when it&apos;s time to write — so you get arguments grounded in sources you actually found.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Start your essay vault — free
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                See student examples
              </Link>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              The essay problem
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Research happens in week one. Writing happens in week four. Nothing survives the gap.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              You read a paper in lecture two that would be perfect for your argument. You never saved it properly. By the time you&apos;re writing, you know it exists but can&apos;t find it. You spend an hour re-searching instead of writing.
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Vaulterly closes that gap. Every source gets a permanent entry — title, URL, your note on why you saved it — so nothing is lost between research and writing.
            </p>
          </div>
        </section>

        {/* How it works for essays */}
        <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            How students use Vaulterly to write better essays
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                step: "01",
                heading: "Save sources as you find them",
                body: "Every time you find something useful — a journal paper, a news article, a YouTube explainer, a textbook page — paste the URL into your vault and add a one-line note: what it says and which argument it supports.",
              },
              {
                step: "02",
                heading: "Group by argument, not by topic",
                body: "Create one vault per essay. Use the notes field to record which point each source supports. By the time you sit down to write, your sources are already sorted by how you'll use them.",
              },
              {
                step: "03",
                heading: "Export into your AI",
                body: "Before you open a blank document, copy your vault into ChatGPT or Claude. Your AI now has every source you found — titles, notes, and URLs — as context. It drafts from your actual research, not its training data.",
              },
              {
                step: "04",
                heading: "Write from real sources",
                body: "Ask your AI to outline your argument using only the sources you saved, draft your introduction, or identify what's missing before you write. Every citation it references is one you gave it — verifiable, real.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#ebf2f8] text-sm font-bold text-[#4a7a9b]">
                  {item.step}
                </span>
                <h3 className="text-base font-semibold text-slate-900">{item.heading}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI section */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
              AI that actually helps
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Five prompts that work once your research is in your vault
            </h2>
            <p className="mb-6 text-base leading-7 text-slate-600">
              Copy your vault into ChatGPT, Claude, or Gemini, then try these:
            </p>

            <div className="grid gap-3">
              {[
                {
                  label: "Outline your argument",
                  prompt: "Using only the sources in my research context above, outline a 5-paragraph argument for [thesis]. Cite each source by name.",
                },
                {
                  label: "Draft the introduction",
                  prompt: "Write an introduction paragraph for my essay on [topic] using the research above. Under 150 words. End with my thesis statement.",
                },
                {
                  label: "Find gaps before you write",
                  prompt: "Review my sources. What important perspectives or counterarguments are missing? What should I find before I start writing?",
                },
                {
                  label: "Check your thesis",
                  prompt: "My thesis is [X]. Based only on the sources I've provided, is this well-supported? What's the strongest objection a reader might raise?",
                },
                {
                  label: "Generate a study guide",
                  prompt: "Turn the sources above into a concise study guide for [topic]. Key terms, main claims, one sentence per concept.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#4a7a9b]">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-mono text-sm italic text-slate-700">
                    &ldquo;{item.prompt}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Works with ChatGPT, Claude, Gemini, Perplexity, and any AI that accepts a text prompt.{" "}
              <Link href="/how-it-works" className="font-semibold text-[#4a7a9b] hover:underline">
                See exactly how →
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950">
            Common questions
          </h2>
          <div className="grid gap-4">
            {faqItems.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 text-center shadow-sm sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Build your essay vault before the research disappears.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-300">
              Free. No setup. Save your first source in under a minute.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Start your essay vault — free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
