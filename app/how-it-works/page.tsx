import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";

export const metadata: Metadata = {
  title: "How the AI Export Works",
  description:
    "See exactly how Vaulterly turns your saved research into AI-ready context. Works with ChatGPT, Claude, Gemini, and any AI that accepts text.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    images: [
      {
        url: "/api/og?title=How+the+AI+Export+Works&description=See+exactly+how+Vaulterly+turns+your+saved+research+into+AI-ready+context.+Works+with+ChatGPT%2C+Claude%2C+and+Gemini.",
        width: 1200,
        height: 630,
        alt: "How the AI Export Works",
      },
    ],
    title: "How the AI Export Works | Vaulterly",
    description:
      "See exactly how Vaulterly turns your saved research into AI-ready context. Works with ChatGPT, Claude, Gemini, and any AI that accepts text.",
    url: "https://myvaulterly.com/how-it-works",
    siteName: "Vaulterly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How the AI Export Works | Vaulterly",
    description:
      "See exactly how Vaulterly turns your saved research into AI-ready context. Works with ChatGPT, Claude, Gemini, and any AI that accepts text.",
  },
};

const steps = [
  {
    number: "01",
    heading: "Save your sources as you find them",
    body: "Paste any URL into your vault — articles, videos, PDFs, Canvas pages, anything. Add a note explaining why you saved it and which class or paper it belongs to. Takes 20 seconds per source.",
    detail:
      "Most students save things in browser bookmarks or Google Docs and lose context within days. In Vaulterly, every source keeps its note attached — so two weeks later you still know why it mattered.",
  },
  {
    number: "02",
    heading: "Organize by class, paper, or project",
    body: "Group sources into vaults — one per class, one per paper, one per topic. Tag them so you can filter by keyword. Your vault becomes a structured record of everything you found, not a random pile of links.",
    detail:
      "You're not reorganizing later. You're building the structure as you go, in the same time it would take to dump everything into a folder you'll never open again.",
  },
  {
    number: "03",
    heading: "Copy your vault context with one click",
    body: "When you're ready to write, hit \"Copy vault context.\" Vaulterly formats your entire vault — every title, URL, and note — as clean plain text. The whole thing is on your clipboard in one second.",
    detail:
      "No file exports. No special format. Just text, structured the way an AI can read and use it. Every source is listed with its title, link, and your personal note about why it matters.",
  },
  {
    number: "04",
    heading: "Paste into any AI and start your prompt",
    body: "Open ChatGPT, Claude, Gemini, Perplexity — any AI with a chat window. Paste your vault context at the top of your message. Then ask it to help you write.",
    detail: "Works with any AI that accepts a text prompt. No plugins, no integrations, no API key. If you can type into it, your vault context works in it.",
  },
  {
    number: "05",
    heading: "Get output that's grounded in your actual research",
    body: "Because your AI now has your sources, notes, and context, it writes from what you actually found — not from its general training data. No hallucinated citations. No generic arguments.",
    detail:
      "The difference is real. An AI writing from your vault will reference your specific sources, use the framing from your notes, and produce arguments that match your actual position.",
  },
];

const prompts = [
  {
    label: "Outline",
    prompt:
      "\"Using only the sources in my vault below, outline a 5-paragraph argument for [topic]. Cite each source by name.\"",
  },
  {
    label: "Draft intro",
    prompt:
      "\"Write an introduction paragraph for my essay on [topic] using the research context below. Keep it under 150 words.\"",
  },
  {
    label: "Find gaps",
    prompt:
      "\"Review the sources below and tell me what important perspectives or counterarguments I'm missing before I write.\"",
  },
  {
    label: "Study guide",
    prompt:
      "\"Turn the sources below into a concise study guide for [topic]. Bullet points, key terms, and one sentence per concept.\"",
  },
  {
    label: "Thesis check",
    prompt:
      "\"My thesis is [X]. Based on the sources below, is this well-supported? What's the strongest objection?\"",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <AppHeaderAuth />

      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                How it works
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                From saved source to finished essay — here&apos;s the exact workflow.
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Vaulterly doesn&apos;t write your essay. It gives your AI everything it needs to help you write a good one — from your actual research, not generic training data.
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Works with ChatGPT, Claude, Gemini, Perplexity, and any AI that accepts a text prompt.
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
          </div>
        </section>

        {/* Step-by-step */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
              The workflow
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Five steps. No setup. Works tonight.
            </h2>
          </div>

          <div className="grid gap-5">
            {steps.map((step) => (
              <div
                key={step.number}
                className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[auto_1fr_1fr] lg:items-start"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ebf2f8] text-lg font-bold text-[#4a7a9b]">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    {step.heading}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    {step.body}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-sm leading-6 text-slate-500">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prompt examples */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                What to ask your AI
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Five prompts that work once your vault is pasted in.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                These work in any AI tool. Paste your vault context first, then send one of these. Replace the brackets with your actual topic.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {prompts.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-[#d8e8f5] bg-[#ebf2f8] p-5 shadow-sm"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#4a7a9b]">
                    {item.label}
                  </p>
                  <p className="text-sm leading-6 text-slate-700">
                    {item.prompt}
                  </p>
                </div>
              ))}

              {/* Filler card */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:col-span-2 lg:col-span-1">
                <p className="text-sm font-semibold text-slate-700">
                  The pattern is always the same.
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Paste vault context → describe what you need → be specific about format or length. Your AI has the research. You direct how to use it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Before / after comparison */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              The difference
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Same AI. Different input. Very different output.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Without a vault
              </p>
              <ul className="space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-3">
                  <span className="shrink-0 text-slate-400">✗</span>
                  You paste a bare question. AI has no source material.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-slate-400">✗</span>
                  Output is generic — arguments any student could write.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-slate-400">✗</span>
                  Citations are invented. AI confabulates real-sounding sources.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-slate-400">✗</span>
                  You spend more time fact-checking than writing.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-[#d8e8f5] bg-[#ebf2f8] p-6 shadow-sm sm:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#4a7a9b]">
                With a Vaulterly vault
              </p>
              <ul className="space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-3">
                  <span className="shrink-0 text-[#4a7a9b]">✓</span>
                  AI has all your sources, URLs, and your own notes as context.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-[#4a7a9b]">✓</span>
                  Output is grounded in what you actually found and read.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-[#4a7a9b]">✓</span>
                  Every citation links to a real source you already saved.
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 text-[#4a7a9b]">✓</span>
                  You direct the argument. AI does the drafting work.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="mb-3 inline-flex rounded-full bg-[#ebf2f8] px-3 py-1 text-sm font-medium text-[#4a7a9b]">
                Common questions
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Questions students ask before signing up.
              </h2>
            </div>

            <div className="grid gap-5">
              {[
                {
                  q: "Does Vaulterly connect to ChatGPT directly?",
                  a: "No — and that's intentional. There's no integration to set up, no plugin to install, no API key. You copy your vault context as plain text and paste it into whatever AI you already use. It works everywhere, day one.",
                },
                {
                  q: "How much text does the vault context actually produce?",
                  a: "A vault with 10 sources produces roughly 500–1,500 words of context, depending on how detailed your notes are. That's well within the context window of every major AI tool. A 30-source vault is still usable in most cases.",
                },
                {
                  q: "Is this cheating?",
                  a: "Vaulterly organizes your research — the same research you'd do with or without it. Using AI to help draft or outline from sources you found is the same as using any other writing tool. Always follow your institution's academic integrity policy.",
                },
                {
                  q: "What if I just have links and no notes?",
                  a: "It still works. Vault context includes every URL you saved. An AI can read a URL and understand what a source is likely about. Notes make the output sharper, but they're not required to get started.",
                },
                {
                  q: "Can I use this for subjects other than essays?",
                  a: "Yes. Students use vaults for exam prep (paste notes → ask for a study guide), group projects (share a public vault → everyone uses the same context), and lab research (save papers → ask AI to summarize methodology patterns).",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <h3 className="text-base font-bold text-slate-950">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 py-12 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 text-center shadow-sm sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Your AI needs context. Your vault is where you build it.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Start saving sources for your next paper. Copy your vault when you&apos;re ready to write. The difference shows up in the first draft.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#779EBF] transition hover:bg-slate-100"
              >
                Build your study vault — free
              </Link>

              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-transparent px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-400 hover:text-white"
              >
                Browse student vaults
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://myvaulterly.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "How It Works",
                item: "https://myvaulterly.com/how-it-works",
              },
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
            mainEntity: [
              {
                "@type": "Question",
                name: "Does Vaulterly connect to ChatGPT directly?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No — there's no integration to set up, no plugin to install, no API key. You copy your vault context as plain text and paste it into whatever AI you already use.",
                },
              },
              {
                "@type": "Question",
                name: "How much text does the vault context actually produce?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A vault with 10 sources produces roughly 500–1,500 words of context, depending on how detailed your notes are. That's well within the context window of every major AI tool.",
                },
              },
              {
                "@type": "Question",
                name: "Is this cheating?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Vaulterly organizes your research — the same research you'd do with or without it. Always follow your institution's academic integrity policy.",
                },
              },
              {
                "@type": "Question",
                name: "What if I just have links and no notes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It still works. Vault context includes every URL you saved. Notes make the output sharper, but they're not required to get started.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use this for subjects other than essays?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Students use vaults for exam prep, group projects, lab research, and more.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
