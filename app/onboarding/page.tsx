"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/AppHeader";
import { createClient } from "@/app/lib/supabase/client";

type StarterVault = {
  id: "exam" | "internship" | "semester";
  label: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  examples: {
    title: string;
    source: string;
    usefulness: string;
  }[];
};

const STARTER_VAULTS: StarterVault[] = [
  {
    id: "exam",
    label: "Best for studying",
    title: "Ace Your Next Exam",
    description:
      "Collect study guides, lecture notes, review videos, Quizlets, and important resources in one place.",
    category: "Study",
    tags: ["Study Guide", "Review", "Important"],
    examples: [
      {
        title: "Biology Midterm Study Guide",
        source: "Paste a link or quick note here",
        usefulness: "Covers chapters 1–4",
      },
      {
        title: "Crash Course Review Video",
        source: "https://example.com",
        usefulness: "Helpful overview before reviewing notes",
      },
      {
        title: "Professor’s Exam Notes",
        source: "Remember to review lecture slides from Week 3",
        usefulness: "Likely exam topics",
      },
    ],
  },
  {
    id: "internship",
    label: "Best for career prep",
    title: "Land an Internship",
    description:
      "Save job posts, resume examples, portfolio links, company research, and interview prep resources.",
    category: "Career",
    tags: ["Career", "Application", "Interview Prep"],
    examples: [
      {
        title: "Summer Internship Posting",
        source: "Paste the job link here",
        usefulness: "Good match for my experience",
      },
      {
        title: "Resume Example",
        source: "https://example.com",
        usefulness: "Use as structure for my own resume",
      },
      {
        title: "Interview Prep Questions",
        source: "Practice behavioral answers before applying",
        usefulness: "Helps me prepare faster",
      },
    ],
  },
  {
    id: "semester",
    label: "Best for class organization",
    title: "Organize This Semester",
    description:
      "Keep syllabi, class links, assignment instructions, tools, deadlines, and resources together.",
    category: "School",
    tags: ["Class Resource", "Assignment", "Tool"],
    examples: [
      {
        title: "English 201 Syllabus",
        source: "Paste a link or quick note here",
        usefulness: "Has deadlines and grading info",
      },
      {
        title: "Group Project Instructions",
        source: "https://example.com",
        usefulness: "Need this for the final project",
      },
      {
        title: "Citation Generator",
        source: "https://example.com",
        usefulness: "Useful for papers this semester",
      },
    ],
  },
];

type StarterEntry = {
  title: string;
  source: string;
  usefulness: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedVaultId, setSelectedVaultId] =
    useState<StarterVault["id"]>("exam");
  const [entries, setEntries] = useState<StarterEntry[]>(
    STARTER_VAULTS[0].examples
  );
  const [createdVaultId, setCreatedVaultId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedVault = useMemo(
    () =>
      STARTER_VAULTS.find((vault) => vault.id === selectedVaultId) ??
      STARTER_VAULTS[0],
    [selectedVaultId]
  );

  function chooseVault(vault: StarterVault) {
    setSelectedVaultId(vault.id);
    setEntries(vault.examples);
    setErrorMessage("");
    setStep(2);
  }

  function updateEntry(
    index: number,
    field: keyof StarterEntry,
    value: string
  ) {
    setEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry
      )
    );
  }

  async function createStarterVault() {
    setErrorMessage("");
    setIsSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrorMessage("You must be logged in to create your first vault.");
      setIsSaving(false);
      return;
    }

    const { data: vault, error: vaultError } = await supabase
      .from("vaults")
      .insert({
        user_id: user.id,
        name: selectedVault.title,
        title: selectedVault.title,
        description: selectedVault.description,
        category: selectedVault.category,
        tags: selectedVault.tags,
        is_public: false,
        public_status: "private",
      })
      .select("id")
      .single();

    if (vaultError || !vault) {
      setErrorMessage(vaultError?.message ?? "Could not create your vault.");
      setIsSaving(false);
      return;
    }

    const cleanedEntries = entries
      .map((entry) => ({
        title: entry.title.trim(),
        source: entry.source.trim(),
        usefulness: entry.usefulness.trim(),
      }))
      .filter((entry) => entry.title.length > 0);

    if (cleanedEntries.length > 0) {
      const { data: createdEntries, error: entriesError } = await supabase
        .from("entries")
        .insert(
          cleanedEntries.map((entry) => {
            const sourceLooksLikeUrl =
              entry.source.startsWith("http://") ||
              entry.source.startsWith("https://");

            return {
              vault_id: vault.id,
              user_id: user.id,
              entry_type: sourceLooksLikeUrl ? "url" : "note",
              title: entry.title,
              source_url: sourceLooksLikeUrl ? entry.source : null,
              url: sourceLooksLikeUrl ? entry.source : null,
              description: entry.usefulness || null,
              notes: sourceLooksLikeUrl
                ? entry.usefulness || null
                : [entry.source, entry.usefulness].filter(Boolean).join("\n\n"),
              metadata_status: "pending",
            };
          })
        )
        .select("id");

      if (entriesError) {
        setErrorMessage(entriesError.message);
        setIsSaving(false);
        return;
      }

      const { data: createdTags, error: tagsError } = await supabase
        .from("tags")
        .insert(
          selectedVault.tags.map((tagName) => ({
            user_id: user.id,
            name: tagName,
          }))
        )
        .select("id, name");

      if (!tagsError && createdTags && createdEntries) {
        const firstTag = createdTags[0];

        if (firstTag) {
          await supabase.from("entry_tags").insert(
            createdEntries.map((entry) => ({
              entry_id: entry.id,
              tag_id: firstTag.id,
            }))
          );
        }
      }
    }

    await supabase
      .from("profiles")
      .update({ onboarding_completed: true })
      .eq("id", user.id);

    setCreatedVaultId(vault.id);
    setIsSaving(false);
    setStep(3);
    router.refresh();
  }

  return (
    <>
      <AppHeader />

      <main className="min-h-screen bg-slate-50">
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                  Vaulterly Onboarding
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                  Don’t just save information. Build something with it.
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                  In a few minutes, you’ll turn scattered links, notes, videos,
                  and resources into your first organized vault.
                </p>
              </div>

              <div className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                Step {step} of 3
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`h-2 rounded-full ${
                    step >= stepNumber ? "bg-indigo-600" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {errorMessage ? (
            <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {errorMessage}
            </section>
          ) : null}

          {step === 1 ? (
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Choose your first vault
                </h2>

                <p className="mt-2 text-slate-600">
                  Start with a structure that already matches what students need
                  most.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {STARTER_VAULTS.map((vault) => (
                  <button
                    key={vault.id}
                    type="button"
                    onClick={() => chooseVault(vault)}
                    className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
                  >
                    <span className="mb-4 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {vault.label}
                    </span>

                    <h3 className="text-xl font-bold text-slate-950">
                      {vault.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {vault.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {vault.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm font-semibold">
                      <span className="text-slate-500">{vault.category}</span>
                      <span className="text-indigo-600">
                        Start with this vault →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                    Add a few things you already have
                  </h2>

                  <p className="mt-2 text-slate-600">
                    Paste links, notes, tools, videos, articles, or anything you
                    do not want to lose.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex w-fit items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Change vault
                </button>
              </div>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <span className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {selectedVault.category}
                  </span>

                  <h3 className="text-2xl font-bold text-slate-950">
                    {selectedVault.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedVault.description}
                  </p>
                </div>

                <div className="grid gap-5">
                  {entries.map((entry, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Item {index + 1}
                      </div>

                      <div className="grid gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-800">
                            Title
                          </label>
                          <input
                            value={entry.title}
                            onChange={(e) =>
                              updateEntry(index, "title", e.target.value)
                            }
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            placeholder="Example: Biology Midterm Study Guide"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-800">
                            URL or note
                          </label>
                          <input
                            value={entry.source}
                            onChange={(e) =>
                              updateEntry(index, "source", e.target.value)
                            }
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            placeholder="Paste a link or quick note here"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-slate-800">
                            Why this is useful
                          </label>
                          <textarea
                            value={entry.usefulness}
                            onChange={(e) =>
                              updateEntry(index, "usefulness", e.target.value)
                            }
                            rows={3}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                            placeholder="Example: Covers chapters 1–4"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={createStarterVault}
                    disabled={isSaving}
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? "Organizing..." : "Organize my vault"}
                  </button>
                </div>
              </section>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="mx-auto max-w-4xl">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
                <p className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  Your first vault is ready
                </p>

                <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                  Your information is already becoming useful.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
                  You just turned scattered resources into a vault you can
                  review, organize, and build on.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
                    <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      Before
                    </span>

                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>Random links</li>
                      <li>Notes everywhere</li>
                      <li>Hard to find later</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-left">
                    <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
                      After
                    </span>

                    <ul className="space-y-2 text-sm font-medium text-slate-700">
                      <li>Organized vault</li>
                      <li>Tagged resources</li>
                      <li>Ready to review</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  {createdVaultId ? (
                    <Link
                      href={`/vaults/${createdVaultId}`}
                      className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                    >
                      Go to my vault
                    </Link>
                  ) : null}

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
                  >
                    Back to dashboard
                  </Link>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </>
  );
}