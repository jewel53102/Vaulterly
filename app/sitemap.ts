import { getAllPosts } from '@/lib/blog';
import { createAdminClient } from '@/utils/supabase/admin';

export default async function sitemap() {
  const base = 'https://myvaulterly.com';

  const staticRoutes = [
    { url: `${base}/`,              lastModified: new Date('2026-05-12'), changeFrequency: 'weekly'  as const, priority: 1.0 },
    { url: `${base}/explore`,       lastModified: new Date('2026-05-12'), changeFrequency: 'daily'   as const, priority: 0.9 },
    { url: `${base}/pricing`,       lastModified: new Date('2026-05-12'), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/blog`,          lastModified: new Date('2026-05-12'), changeFrequency: 'weekly'  as const, priority: 0.8 },
    { url: `${base}/how-it-works`,  lastModified: new Date('2026-05-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/essays`,        lastModified: new Date('2026-05-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/exam-prep`,     lastModified: new Date('2026-05-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/group-projects`,lastModified: new Date('2026-05-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${base}/privacy`,       lastModified: new Date('2026-05-11'), changeFrequency: 'yearly'  as const, priority: 0.3 },
    { url: `${base}/terms`,         lastModified: new Date('2026-05-11'), changeFrequency: 'yearly'  as const, priority: 0.3 },
  ];

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const supabase = createAdminClient();
  const { data: vaults } = await supabase
    .from('vaults')
    .select('id, updated_at')
    .eq('is_public', true)
    .eq('public_status', 'approved');

  const vaultRoutes = (vaults ?? []).map((vault) => ({
    url: `${base}/vaults/${vault.id}`,
    lastModified: new Date(vault.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...vaultRoutes];
}
