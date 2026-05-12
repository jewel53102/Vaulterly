import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import AppHeaderAuth from "@/app/components/AppHeaderAuth";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Vaulterly`,
      description: post.description,
      url: `https://myvaulterly.com/blog/${slug}`,
      siteName: "Vaulterly",
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Vaulterly`,
      description: post.description,
    },
  };
}

const categoryColors: Record<string, string> = {
  "AI Study Tips": "bg-[#ebf2f8] text-[#4a7a9b]",
  "Study Skills": "bg-emerald-50 text-emerald-700",
  Tools: "bg-amber-50 text-amber-700",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Vaulterly",
      url: "https://myvaulterly.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Vaulterly",
      url: "https://myvaulterly.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://myvaulterly.com/blog/${slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://myvaulterly.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://myvaulterly.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://myvaulterly.com/blog/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <AppHeaderAuth showNewVaultButton={false} />

      <main className="max-w-2xl mx-auto px-4 py-16">
        <nav className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-[#4a7a9b] hover:text-[#779EBF] transition-colors"
          >
            ← All articles
          </Link>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
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

          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            {post.description}
          </p>
        </header>

        <div className="prose-article">
          <MDXRemote source={post.content} />
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-[#ebf2f8] rounded-xl p-6">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Try Vaulterly free
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Save your sources, add notes, and copy your research into any AI
              tool in one click.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-[#779EBF] hover:bg-[#5a87ac] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Start your free vault →
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
