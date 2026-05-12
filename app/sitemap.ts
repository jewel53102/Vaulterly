import { getAllPosts } from '@/lib/blog';

export default function sitemap() {
  const base = 'https://myvaulterly.com';

  const staticRoutes = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/explore`, lastModified: new Date() },
    { url: `${base}/how-it-works`, lastModified: new Date() },
    { url: `${base}/essays`, lastModified: new Date() },
    { url: `${base}/exam-prep`, lastModified: new Date() },
    { url: `${base}/group-projects`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
  ];

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...staticRoutes, ...blogRoutes];
}