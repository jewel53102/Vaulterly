import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";

export const metadata: Metadata = {
  title: "Exam Prep Organiser — Build a Study Vault for Every Subject",
  description:
    "Save every lecture link, video, and study resource into one vault per subject. Copy your vault into ChatGPT to generate study guides, flashcard prompts, and practice questions from your actual materials.",
  openGraph: {
    title: "Exam Prep Organiser | Vaulterly",
    description:
      "Save every lecture link, video, and study resource into one vault per subject. Copy your vault into ChatGPT to generate study guides, flashcard prompts, and practice questions from your actual materials.",
    url: "https://myvaulterly.com/exam-prep",
    siteName: "Vaulterly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exam Prep Organiser | Vaulterly",
    description:
      "Save every lecture link, video, and study resource into one vault per subject. Copy your vault into ChatGPT to generate study guides, flashcard prompts, and practice questions from your actual materials.",
  },
};

const faqItems = [
  {
    q: "How is Vaulterly different from just taking notes?",
    a: "Notes capture what you write down in the moment. Vaulterly captures where the information lives — so you can go back to the source, not just your summary of it. When you combine notes with saved sources, you have both the record and the original.",
  },
  {
    q: "Can I use Vaulterly to make flashcards?",
    a: "Not directly — but you can export your vault into ChatGPT or Claude and ask it to generate flashcard-style questions from your sources. Prompt: 'Based on the materials in my vault, generate 20 flashcard questions for [topic]. Include the answer for each.'",
  },
  {
    q: "What types of sources can I save?",
    a: "Any URL: lecture slides (if they have a link), YouTube explainer videos, textbook pages, Wikipedia articles, journal papers, revision websites, past paper PDFs. Add a note to each so you remember why you saved it.",
  },
  {
    q: "Can I share my study vault with classmates?",
    a: "Yes. Make your vault public and share the link. Everyone in your study group gets instant access to the same curated source list.",
  },
  {
    q: "Does it work on mobile?",
    a: "Yes. Vaulterly works in any browser on any device. Save sources on your phone during a lecture, then export on your laptop when you're ready to study.",
  },
];

export default function ExamPrepPage() {
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
              { "@type": "ListItem", position: 2, name: "Exam Prep", item: "https://myvaulterly.com/exam-prep" },
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
            <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Exam Prep
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              One vault per subject. Everything you need to study — in one place.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Vaulterly lets you save every study resource across the semester — videos, slides, articles, revision sites — and export them into your AI the week before exams to generate study guides, practice questions, and concept summaries from your actual materials.
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
                See student examples
              </Link>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              The exam problem
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Week twelve. Exam in three days. Your study materials are scattered across twelve tabs and four apps.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              That YouTube video that explained the concept better than the textbook — where did you save it? The revision site your lecturer mentioned in week four? Gone. You spend the first hour of revision just trying to find the things you already found.
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Building a vault during the semester means everything is waiting for you when revision starts — no hunting, no re-Googling, no starting from scratch.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Build a study vault that actually works under exam pressure
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                step: "01",
                heading: "One vault per subject",
                body: "Create a vault for each module or subject at the start of semester. Every resource you find for that subject — lecture recordings, readings, explainer videos, past papers — goes in that vault.",
              },
              {
                step: "02",
                heading: "Save as you go, not in one panic",
                body: "Add sources during the semester, not the week before the exam. When your lecturer mentions a useful article, save it immediately with a note. Takes 20 seconds. Saves you an hour of searching later.",
              },
              {
                step: "03",
                heading: "Export for AI-assisted revision",
                body: "Paste your vault into ChatGPT or Claude and ask it to generate a study guide, quiz you on key concepts, or explain the hardest topics in plain language — using your specific materials as context.",
              },
              {
                step: "04",
                heading: "Share with your study group",
                body: "Make your vault public and send the link to your classmates. Everyone benefits from the sources you found. They can save it to their own vaults and add their own materials.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700">
                  {item.step}
                </span>
                <h3 className="text-base font-semibold text-slate-900">{item.heading}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI prompts */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              AI-assisted revision
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Prompts that turn your vault into a revision session
            </h2>
            <p className="mb-6 text-base leading-7 text-slate-600">
              Copy your subject vault into ChatGPT or Claude, then try these:
            </p>

            <div className="grid gap-3">
              {[
                {
                  label: "Generate a study guide",
                  prompt: "Based on the materials in my vault, write a concise study guide for [subject]. Cover the key concepts, definitions, and themes I should know for an exam.",
                },
                {
                  label: "Quiz me",
                  prompt: "Generate 15 exam-style questions based on the sources in my vault. Mix short-answer and essay questions. Include model answers.",
                },
                {
                  label: "Explain the hardest concept",
                  prompt: "Based on my vault, explain [concept] in plain language. I struggle with this — give me an analogy and a worked example.",
                },
                {
                  label: "Identify key themes",
                  prompt: "Review all the sources in my vault. What are the three or four major themes that keep coming up? Which sources support each theme?",
                },
                {
                  label: "Predict exam questions",
                  prompt: "Based on the topics covered in my vault, what are the five questions most likely to appear on a [subject] exam? Explain why for each.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-mono text-sm italic text-slate-700">
                    &ldquo;{item.prompt}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Works with ChatGPT, Claude, Gemini, and any AI that accepts a text prompt.{" "}
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
              Build your revision vault now. Thank yourself at exam time.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-300">
              Free. Works for every subject. Takes 30 seconds to start.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Build your study vault — free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
