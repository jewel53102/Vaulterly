# Vaulterly Pre-Launch Checklist

Last updated: 2026-05-12

Items are grouped by category and severity. Fix **Blockers** before any real traffic hits the site.

---

## 🚨 Blockers — Fix Before Going Live

### Stripe: Webhook secret is wrong
`STRIPE_WEBHOOK_SECRET` in `.env.local` is currently set to the webhook URL, not the signing secret.

**Current (wrong):**
```
STRIPE_WEBHOOK_SECRET=whsec_https://myvaulterly.com/api/stripe/webhook
```
**Fix:**
1. Stripe Dashboard → Developers → Webhooks → click your endpoint
2. Click **Reveal** under "Signing secret"
3. Copy the `whsec_xxxxx...` value and replace the env var

This must also be updated in **Vercel → Settings → Environment Variables** before deploying.

---

### Stripe: Using live keys in development
`.env.local` has `STRIPE_SECRET_KEY=sk_live_...`. Using live keys locally risks real charges during testing.

**Fix:** Create a test-mode key (`sk_test_...`) and use it in `.env.local`. Keep `sk_live_` only in Vercel production env vars.

---

### Stripe: SQL migration not confirmed
The `stripe_customer_id` column may not exist on the `profiles` table yet.

**Fix:** Run in Supabase → SQL Editor:
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE;
```

---

### Stripe: Unauthenticated users get a 401 on checkout
If a visitor clicks "Get Pro" or "Claim Founding Member" on the pricing page without being logged in, the checkout API returns a 401 and the button stays stuck.

**Fix needed in:** `app/components/CheckoutButton.tsx`
After receiving a 401, redirect to `/signup?next=/pricing` instead of showing an alert.

---

### Pricing: Launch deadline not set
`LAUNCH_DEADLINE` in `app/pricing/page.tsx` is currently `"2026-06-14T00:00:00Z"` — a placeholder.

**Fix:** Update to your actual planned launch date before going live.

---

### Legal: Contact email not set
Two TODO comments remain in the legal pages.

**Files to update:**
- `app/terms/page.tsx` — replace TODO contact email
- `app/privacy/page.tsx` — replace TODO contact email
- `app/terms/page.tsx:212` — update jurisdiction clause to reflect your actual jurisdiction (currently a placeholder)

---

### Vercel: Env vars not in production
All Stripe env vars are currently only in `.env.local`. They need to be in Vercel too.

**Add to Vercel → Settings → Environment Variables:**
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...   ← fix this first (see above)
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_PRO_ANNUAL=price_...
STRIPE_PRICE_FOUNDING=price_...
NEXT_PUBLIC_SITE_URL=https://myvaulterly.com
```

---

### Stripe: Register production webhook
The webhook endpoint needs to be registered for live mode.

**Steps:**
1. Stripe Dashboard (live mode) → Developers → Webhooks → Add endpoint
2. URL: `https://myvaulterly.com/api/stripe/webhook`
3. Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
4. Copy the signing secret into Vercel env vars as `STRIPE_WEBHOOK_SECRET`

---

## ⚠️ Should Fix Before Launch

### Account page: `useSearchParams` without Suspense
`app/account/page.tsx` calls `useSearchParams()` directly. In Next.js App Router this requires the component to be wrapped in a `<Suspense>` boundary, otherwise the build may warn or partially fail with static generation.

**Fix:** Wrap the account page export in a Suspense boundary, or extract the `useSearchParams` logic into a child component wrapped in `<Suspense>`.

---

### SEO: Public vaults not in sitemap
Public vault pages (`/vaults/[id]`) have canonical tags and metadata but are not included in `app/sitemap.ts`. These pages are indexable and valuable for SEO.

**Fix:** Add a dynamic section to `app/sitemap.ts` that queries all public vaults from Supabase using the admin client and appends their URLs.

---

### SEO: Blog posts have no per-post OG image
`generateMetadata` in `app/blog/[slug]/page.tsx` does not include an `images` field, so blog post shares on social media fall back to the generic layout OG image.

**Fix:** Add to `generateMetadata`:
```ts
openGraph: {
  ...
  images: [
    {
      url: `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`,
      width: 1200,
      height: 630,
      alt: post.title,
    },
  ],
},
twitter: {
  ...
  images: [`/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`],
},
```

---

### SEO: No Twitter/X handle in metadata
No `twitter:site` handle is set. This attribute improves how Twitter/X attributes shared cards.

**Fix:** If you have a Twitter/X account for Vaulterly, add to `app/layout.tsx`:
```ts
twitter: {
  ...
  site: "@yourtwitterhandle",
},
```

---

### Domain: www redirect not configured
Canonical tags point to `myvaulterly.com` (non-www) but Vercel needs to be configured to enforce the redirect.

**Fix:** Vercel → Settings → Domains → set `myvaulterly.com` as the primary domain. Vercel will automatically redirect `www.myvaulterly.com` to it.

---

## 🔵 Nice to Have (Post-Launch)

### Favicon variants missing
Only `favicon.ico` exists. Modern browsers and mobile devices expect additional sizes.

**Recommended additions to `app/`:**
- `icon.png` (512×512) — used by Next.js as the default app icon
- `apple-icon.png` (180×180) — iOS home screen icon

---

### Public user profile pages not in sitemap
`/u/[username]` pages are not included in the sitemap.

**Fix:** Add a dynamic section to `app/sitemap.ts` that queries all public profiles.

---

### No structured data on blog posts
Blog posts currently only have a BreadcrumbList JSON-LD on some pages. Adding `Article` structured data improves Google rich results.

---

## ✅ Completed

- GA4 funnel tracking (sign_up, vault_created, onboarding_complete, entry_saved, vault_published, vault_shared, vault_visitor_signup_click)
- Sentry error tracking (client, server, edge)
- Loading skeleton states (explore, vault, dashboard, account, vault edit)
- Nonce-based Content Security Policy via middleware
- Pricing page (Free / Pro / Founding Member, countdown, feature table, FAQ)
- Stripe checkout, webhook, and billing portal integration
- Vault creation limit (3 free vaults) enforced in server actions and Copy Vault button
- Copy Vault button: vault limit check, correct column names, slug generation, duplicate name handling
- Share + Copy Vault buttons added to dashboard followed vaults
- Canonical URLs on all public pages
- noindex on all app pages (dashboard, account, onboarding, welcome, login, signup)
- Per-page OG images (explore, essays, exam-prep, group-projects, how-it-works, blog, pricing)
- Sitemap: real dates, changeFrequency, priority on all entries
- Robots.txt with sitemap reference
