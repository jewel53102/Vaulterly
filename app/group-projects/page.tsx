import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";

export const metadata: Metadata = {
  title: "Shared Research Vault for Group Projects — One Link, Everyone's In",
  description:
    "Create a shared research vault for your group project. Add sources and notes, make it public, send one link — everyone has the same materials instantly.",
  alternates: { canonical: "/group-projects" },
  openGraph: {
    images: [
      {
        url: "/api/og?title=Shared+Research+Vault+for+Group+Projects&description=Create+a+shared+research+vault+for+your+group+project.+Send+one+link+%E2%80%94+everyone+has+the+same+materials+instantly.",
        width: 1200,
        height: 630,
        alt: "Shared Research Vault for Group Projects",
      },
    ],
    title: "Shared Research Vault for Group Projects | Vaulterly",
    description:
      "Create a shared research vault for your group project. Add sources and notes, make it public, send one link — everyone has the same materials instantly.",
    url: "https://myvaulterly.com/group-projects",
    siteName: "Vaulterly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shared Research Vault for Group Projects | Vaulterly",
    description:
      "Create a shared research vault for your group project. Add sources and notes, make it public, send one link — everyone has the same materials instantly.",
  },
};

const faqItems = [
  {
    q: "Can multiple people add to the same vault?",
    a: "Currently each vault is owned by one account. The typical group workflow is for one person to own the shared vault and add sources as the group finds them, or to share the link to a public vault so teammates can view it and save individual sources to their own vaults.",
  },
  {
    q: "How do teammates access the shared vault?",
    a: "Make your vault public and share the URL. Anyone with the link can view the full source list — no account required. They can also follow your vault to get updates.",
  },
  {
    q: "Can we use the vault to write the project together?",
    a: "Each team member can copy the vault context into their own AI conversation and draft their assigned section from the shared sources. This means everyone writes from the same research base, even if they're drafting separately.",
  },
  {
    q: "Is there a vault size limit?",
    a: "No. Add as many sources as your project needs.",
  },
  {
    q: "What if our project covers multiple topics?",
    a: "Create separate vaults for each section of the project, or use the notes field to tag each source with the section it belongs to. When exporting for AI, you can copy a single vault or multiple and paste them together.",
  },
];

export default function GroupProjectsPage() {
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
              { "@type": "ListItem", position: 2, name: "Group Projects", item: "https://myvaulterly.com/group-projects" },
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
            <p className="mb-4 inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
              Group Projects
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              One shared vault. Everyone writes from the same research.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Vaulterly makes it easy to pool your group&apos;s research in one place. Collect sources as a team, share the vault with a single link, and drop the whole thing into your AI when each person is ready to write their section — so no one is working from different sources.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Create a group vault — free
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
              The group project problem
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Four people, four different source lists, one incoherent final document.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Everyone researches independently. Aisha found a great paper that Jake already cited — with a different interpretation. The intro contradicts the conclusion because they were written from different sources. The bibliography is a mess.
            </p>
            <p className="mt-3 text-base leading-7 text-slate-600">
              A shared vault fixes this at the source. One place for all the research. Everyone writes from the same materials. The project hangs together.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            How to run a group project vault
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                step: "01",
                heading: "One person creates the vault",
                body: "The project lead creates a vault named after the project. Set it to public so anyone with the link can view it without needing an account.",
              },
              {
                step: "02",
                heading: "Collect sources as a team",
                body: "As each team member finds useful sources, they send them to the vault owner to add — or add them directly if they have an account. Each source gets a note tagging which section it belongs to.",
              },
              {
                step: "03",
                heading: "Share one link with the group",
                body: "Send the vault URL in your group chat. Everyone instantly has the full curated source list. No Google Doc, no shared folder, no version confusion.",
              },
              {
                step: "04",
                heading: "Each person drafts from the shared research",
                body: "When it's time to write, each team member copies the vault context into their AI conversation and drafts their assigned section. Everyone is drawing from the same pool of sources.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-sm font-bold text-amber-700">
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
            <p className="mb-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
              AI-assisted writing
            </p>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Prompts for writing your section from the shared vault
            </h2>
            <p className="mb-6 text-base leading-7 text-slate-600">
              Copy the group vault into ChatGPT or Claude, then prompt for your assigned section:
            </p>

            <div className="grid gap-3">
              {[
                {
                  label: "Draft your section",
                  prompt: "Using only the sources tagged [section name] in my research context above, draft a 400-word section on [topic]. Cite each source by name.",
                },
                {
                  label: "Check for consistency",
                  prompt: "Based on the sources in my vault, are there any contradictions or tensions between them that the group should be aware of before writing?",
                },
                {
                  label: "Identify gaps",
                  prompt: "Review all the sources in my vault. What important perspectives are missing? What should the group find before writing the [section] section?",
                },
                {
                  label: "Write the introduction",
                  prompt: "Write a 200-word project introduction using the sources in my vault. Establish the topic, the key arguments, and what the project will cover.",
                },
                {
                  label: "Build a shared bibliography",
                  prompt: "List all the sources in my vault as a formatted bibliography in [APA/MLA/Chicago] style. Use the titles and URLs I've provided.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
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
              Start the group vault before everyone goes off and researches separately.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-300">
              Free. Share the link in your group chat. Done in under a minute.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Create a group vault — free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
