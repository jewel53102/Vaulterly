import Link from "next/link";
import type { Metadata } from "next";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Student Study Tips & AI Writing Guides",
  description:
    "Practical guides for students: how to organise research, use ChatGPT without hallucinating sources, and write better essays with AI tools.",
  alternates: { canonical: "/blog" },
  openGraph: {
    images: [
      {
        url: "/api/og?title=Student+Study+Tips+%26+AI+Writing+Guides&description=Practical+guides+for+students+on+how+to+use+ChatGPT+without+hallucinating+sources+and+write+better+essays.",
        width: 1200,
        height: 630,
        alt: "Student Study Tips & AI Writing Guides",
      },
    ],
    title: "Student Study Tips & AI Writing Guides | Vaulterly",
    description:
      "Practical guides for students: how to organise research, use ChatGPT without hallucinating sources, and write better essays with AI tools.",
    url: "https://myvaulterly.com/blog",
    siteName: "Vaulterly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Study Tips & AI Writing Guides | Vaulterly",
    description:
      "Practical guides for students: how to organise research, use ChatGPT without hallucinating sources, and write better essays with AI tools.",
  },
};

const categoryColors: Record<string, string> = {
  "AI Study Tips": "bg-[#ebf2f8] text-[#4a7a9b]",
  "Study Skills": "bg-emerald-50 text-emerald-700",
  Tools: "bg-amber-50 text-amber-700",
  "Study Tips": "bg-violet-50 text-violet-700",
  "Writing Workflow": "bg-sky-50 text-sky-700",
  "AI Writing": "bg-[#ebf2f8] text-[#4a7a9b]",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeaderAuth showNewVaultButton={false} />

      <main className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Study Tips & Guides
          </h1>
          <p className="text-lg text-gray-600">
            Practical advice on research, writing, and using AI tools without
            letting them do your thinking for you.
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readingTime}</span>
                <span className="text-xs text-gray-400">·</span>
                <time className="text-xs text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2 leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#779EBF] transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {post.description}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-[#4a7a9b] hover:text-[#779EBF] transition-colors"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
