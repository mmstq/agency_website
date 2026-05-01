# Architecture Research

**Project:** Modall Agency Website — v1.0 page expansion
**Researched:** 2026-04-30
**Confidence:** HIGH — verified against Next.js 16.2.2 docs in node_modules

---

## Page Structure (App Router)

Next.js App Router uses file-system routing: each folder under `src/app/` maps to a URL segment, and a `page.tsx` inside that folder renders at that URL. The root `layout.tsx` wraps every page automatically.

### New page files to create

```
src/app/
├── page.tsx                          (exists — Home)
├── layout.tsx                        (exists — wraps all pages via MasterLayout)
├── not-found.tsx                     (NEW — global 404, replaces manual 404 page)
│
├── about/
│   └── page.tsx                      (NEW — /about)
│
├── services/
│   └── page.tsx                      (NEW — /services)
│
├── portfolio/
│   ├── page.tsx                      (NEW — /portfolio index)
│   └── [slug]/
│       └── page.tsx                  (NEW — /portfolio/:slug, individual case study detail)
│
├── case-studies/
│   ├── page.tsx                      (NEW — /case-studies index)
│   └── [slug]/
│       └── page.tsx                  (NEW — /case-studies/:slug)
│
├── blog/
│   ├── page.tsx                      (NEW — /blog index)
│   └── [slug]/
│       └── page.tsx                  (NEW — /blog/:slug)
│
└── contact/
    └── page.tsx                      (NEW — /contact)
```

### Static export requirement for dynamic routes

With `output: 'export'`, any `[slug]` dynamic route **must** export `generateStaticParams()`. This runs at build time and tells Next.js exactly which slugs to render as static HTML files. Without it, the build will fail.

```typescript
// src/app/blog/[slug]/page.tsx
import { getAllPosts } from '@/lib/data/blog'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

The slug data comes from the static data files described in the Static Content Strategy section below.

### 404 page

`src/app/not-found.tsx` is the App Router convention for a global 404. With static export, Next.js renders it to `out/404.html` automatically — Netlify will serve it for unmatched routes if configured with `[[redirects]] from="/*" to="/404.html" status=404`.

---

## Shared Layout Extension

### Current state

`src/app/layout.tsx` wraps everything in `MasterLayout`, which renders `CanvasGrid` behind all content. The `Navbar` is currently imported inside `page.tsx` (Home), not in `layout.tsx`.

### Required change: Navbar moves to layout.tsx

The Navbar must be in `layout.tsx` (or inside `MasterLayout`) so it appears on every page without re-mounting on navigation. Currently each page would need to manually import Navbar, which causes it to unmount/remount on route transitions.

```typescript
// src/components/MasterLayout.tsx (modified)
'use client';
import CanvasGrid from './CanvasGrid';
import Navbar from './Navbar';

export default function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-transparent text-white overflow-hidden selection:bg-white/20">
      <CanvasGrid />
      <div className="relative z-20 max-w-7xl mx-auto px-6 pb-12 bg-transparent">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
```

After this change, `page.tsx` (Home) removes its `<Navbar />` import.

### Navbar active link states

The Navbar is a Client Component (`'use client'`), so `usePathname()` from `next/navigation` works directly. The current `navLinks` array uses `#hash` hrefs — these must be updated to real page paths (`/about`, `/blog`, etc.) for proper active state detection.

```typescript
// Navbar.tsx — add active detection
import { usePathname } from 'next/navigation';

// Inside component:
const pathname = usePathname();

// In render:
const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
```

Active link visual: change `text-white/60` to `text-white` using a conditional class. No new library needed.

### Services dropdown: update hrefs

The four services items currently link to `#services`. They should link to `/services` (or `/services#web-applications`, etc.) for proper navigation.

### "Get started" CTA: wire to /contact

The button in Navbar (desktop + mobile drawer) should link to `/contact`:

```typescript
<Link href="/contact" className="...">Get started</Link>
```

Use `next/link` not `<a>` — it enables client-side prefetching.

### Per-page metadata

Each new `page.tsx` should export a `Metadata` object. This is a Server Component feature and works in static export:

```typescript
// src/app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Modall',
  description: 'We build tech infrastructure for the future of business.',
  openGraph: {
    title: 'About — Modall',
    description: '...',
    images: ['/og/about.png'],
  },
};
```

Root `layout.tsx` should also add `metadataBase` so OG image URLs resolve correctly on Netlify.

---

## Contact Form Architecture

**Constraint:** `output: 'export'` means Route Handlers that read from `Request` (i.e., POST handlers) are not executed at runtime — they are attempted at build time and fail if they depend on request data. The current `src/app/api/newsletter/route.ts` POST handler will not work in production with static export. This is confirmed by the Next.js 16 static export docs: "Route Handlers that rely on Request" are listed under Unsupported Features.

**Server Actions are also unsupported** with static export (listed explicitly in the static exports unsupported features list).

### Recommended approach: Resend via client-side fetch

Send the form data directly from the browser to the Resend API using their REST endpoint. No server required.

```
Browser → fetch('https://api.resend.com/emails', { headers: { Authorization: 'Bearer ...' } })
```

**Problem with this approach:** The Resend API key is exposed in the client bundle. Resend provides domain-restricted API keys for exactly this use case, which limits the key to sending from/to specific domains — acceptable for a contact form on a marketing site.

**Alternative: Formspree (recommended for zero-key-exposure)**

Formspree provides a POST endpoint you own: `https://formspree.io/f/{form-id}`. The form POSTs directly to Formspree from the browser. No API keys in the frontend code. Free tier: 50 submissions/month. No SDK needed — plain `fetch`.

```typescript
// ContactForm.tsx (client component)
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
```

**Alternative: EmailJS**

EmailJS sends email directly from the browser using a service account (Gmail, SendGrid, etc.). SDK is ~7KB. Free tier: 200 emails/month. Requires `NEXT_PUBLIC_` env vars for service ID and template ID. No key exposure risk beyond service/template IDs (not account credentials).

### Decision matrix

| Option | Key exposure | Free tier | Setup complexity | Best for |
|--------|-------------|-----------|-----------------|----------|
| Formspree | None | 50/mo | Minimal (no SDK) | Simple contact form, fast ship |
| EmailJS | Template ID only | 200/mo | Low (install SDK) | Custom email templates |
| Resend client-side | API key in bundle | 3000/mo | Low | Acceptable with domain-restricted key |

**Recommendation: Formspree for contact form.** Zero server code, zero key exposure, integrates with the existing `fetch`-based pattern already used in `HeroSection.tsx`. Add Resend later for transactional emails if needed (newsletter confirmation, etc.) via a serverless function on Netlify.

### Newsletter endpoint (existing route.ts)

The current POST handler in `src/app/api/newsletter/route.ts` is dead in static export. Options:
1. Wire to a Netlify Function (`netlify/functions/newsletter.ts`) — keeps the same `/api/newsletter` path if Netlify redirects are configured
2. Wire directly to Mailchimp/ConvertKit API from the client using a public-facing subscribe URL (Mailchimp provides these for embedded forms)
3. Keep console.log stub for v1.0 and defer real wiring

For v1.0 scope: wire to Mailchimp embedded form URL (no API key needed in client) or Formspree — same pattern as contact form.

---

## Static Content Strategy

Since there is no CMS and no database, all content for blog posts, case studies, and portfolio items lives as TypeScript data files. This is the correct pattern for a static export marketing site.

### Directory structure

```
src/lib/
├── data/
│   ├── blog.ts           (post metadata array + getPost(slug) helper)
│   ├── case-studies.ts   (case study metadata + getCaseStudy(slug) helper)
│   ├── portfolio.ts      (portfolio item metadata + getPortfolioItem(slug) helper)
│   ├── services.ts       (services list — used by Services page and Navbar dropdown)
│   └── testimonials.ts   (testimonials array — used by Home page)
│
└── types/
    ├── blog.ts           (Post interface)
    ├── case-study.ts     (CaseStudy interface)
    └── portfolio.ts      (PortfolioItem interface)
```

### Data shape example (blog)

```typescript
// src/lib/data/blog.ts
export interface Post {
  slug: string;
  title: string;
  date: string;          // ISO 8601
  excerpt: string;
  category: string;
  readTime: number;      // minutes
  content: string;       // HTML string or MDX — see below
  ogImage?: string;
}

const posts: Post[] = [
  {
    slug: 'ai-integration-patterns-2026',
    title: 'AI Integration Patterns for Modern SaaS',
    date: '2026-03-15',
    excerpt: '...',
    category: 'Engineering',
    readTime: 6,
    content: '<p>...</p>',
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}
```

### Content format: inline HTML vs MDX

MDX requires additional Next.js configuration (`@next/mdx`) and adds build complexity. For v1.0 with ~5-10 blog posts and ~3-5 case studies, **inline HTML strings** in the data file are sufficient. They render with `dangerouslySetInnerHTML` inside the detail page component. This avoids the MDX pipeline entirely and keeps the build simple.

If content volume grows significantly in v2, migrate to MDX files in `src/content/blog/` and use `@next/mdx` — the data layer abstraction (`getPost(slug)`) means the page components won't need to change.

### Images

Static export with `output: 'export'` does not support the default `next/image` loader (it requires a server). Two options:
1. Use plain `<img>` tags — acceptable for a marketing site
2. Configure a custom image loader (Cloudinary, imgix) in `next.config.ts`

For v1.0, use `<img>` with explicit `width`/`height` and `loading="lazy"`. Add `unoptimized` prop if using `next/image` for the benefit of the `<picture>` element syntax:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```

This disables the image optimization server but lets `next/image` components build without errors.

---

## New Component Inventory

### Home page (additions to existing scaffold)

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `LogoMarquee` | New | Scrolling client logo strip |
| `IndustriesSection` | New | Industries grid (anchor: `#industries`) |
| `ProcessSection` | New | How we work — numbered steps |
| `TestimonialsSection` | New | Quote cards, 2-3 testimonials |
| `CaseStudyPreviewRow` | New | 2-3 horizontal case study teasers |
| `HomeCTA` | New | Final CTA section before footer |
| `Footer` | New | Links, copyright, social icons |

### Shared / layout

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `MasterLayout` | Modified | Add Navbar, accept optional `fullWidth` prop for pages that need edge-to-edge |
| `Navbar` | Modified | Active link state via `usePathname`, real hrefs, CTA wired to /contact |
| `PageHero` | New | Reusable page-level hero (title + subtitle) for About, Services, Contact pages |
| `SectionLabel` | New | Small uppercase label above section headings (pattern already used in HeroSection) |

### About page

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `TeamGrid` | New | Team member cards |
| `ValuesSection` | New | 3-4 company values in glassmorphism cards |
| `AboutHero` | New (or reuse PageHero) | Page hero with company positioning statement |

### Services page

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `ServiceCard` | New | Individual service with icon, description, bullet points |
| `ServicesGrid` | New | 2x2 or 2x3 grid of ServiceCard |
| `TechStackSection` | New | Technology logos / list |

### Portfolio page

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `PortfolioGrid` | New | Masonry or uniform grid of portfolio cards |
| `PortfolioCard` | New | Project thumbnail, title, tags, link |
| `PortfolioDetail` | New | Full-page case study layout (used in [slug] page) |

### Case Studies page

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `CaseStudyCard` | New | Horizontal card: image, client, result metric |
| `CaseStudyDetail` | New | Long-form layout: challenge/solution/results |

### Blog page

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `BlogCard` | New | Post thumbnail, title, excerpt, date, category |
| `BlogGrid` | New | Responsive grid of BlogCard |
| `BlogPostLayout` | New | Article layout: prose typography, metadata, back link |
| `CategoryFilter` | New | Optional client-side category filter (client component, no server needed) |

### Contact page

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `ContactForm` | New | Name, email, message fields. Submits to Formspree via fetch |
| `ContactInfo` | New | Email, calendly link, social handles |

### 404 page

| Component | New/Modified | Purpose |
|-----------|-------------|---------|
| `not-found.tsx` | New (App Router convention) | Custom 404 with nav back to Home |

### Reuse opportunities

- `SectionLabel` (uppercase tracking label) — used on every page section, matches existing HeroSection pattern
- `PageHero` — About, Services, Contact all have the same "big headline + subtitle" opener
- `BlogCard` and `CaseStudyCard` are similar enough to share a base `ContentCard` component with slot props for metadata
- `Footer` appears on all pages — belongs in `MasterLayout` alongside Navbar

---

## Suggested Build Order

### Phase 1: Layout foundation (unblocks everything)

Build first because all subsequent pages depend on it.

1. Move `Navbar` into `MasterLayout` (remove from `page.tsx`)
2. Update Navbar hrefs to real page paths
3. Add active link state via `usePathname`
4. Wire "Get started" CTA to `/contact`
5. Create `Footer` component, add to `MasterLayout`
6. Add `metadataBase` to `layout.tsx`
7. Add `images: { unoptimized: true }` to `next.config.ts`
8. Create `not-found.tsx`

**Why first:** Every page built after this inherits the correct nav and footer. Building pages before the layout is settled means rework.

### Phase 2: Complete Home page

Build second because it's the highest-traffic page and the design system reference.

1. `LogoMarquee`
2. `IndustriesSection` (add `id="industries"` — resolves existing nav anchor)
3. `CaseStudyPreviewRow` (uses CaseStudy data → create `src/lib/data/case-studies.ts`)
4. `ProcessSection`
5. `TestimonialsSection` (create `src/lib/data/testimonials.ts`)
6. `HomeCTA`

**Why second:** The bento grid is already built. The remaining Home sections use the simplest components (no dynamic routing). Completing Home validates the design system before applying it to inner pages.

### Phase 3: Contact page + form

Build third because it's the primary conversion goal and can be built independently.

1. Create `src/app/contact/page.tsx`
2. `ContactForm` component (Formspree integration)
3. `ContactInfo` component
4. Wire newsletter in `HeroSection` (same Formspree pattern)

**Why third:** Contact is the conversion endpoint for all CTAs. Building it before inner pages lets all "Get started" links work end-to-end during phase 4+ development.

### Phase 4: About + Services pages

1. Create `src/lib/data/services.ts` (used by both Services page and Navbar dropdown)
2. `src/app/services/page.tsx` + `ServicesGrid`, `ServiceCard`
3. Update Navbar Services dropdown to pull from `services.ts`
4. `src/app/about/page.tsx` + `TeamGrid`, `ValuesSection`

**Why fourth:** These are static pages with no dynamic routing complexity. Services data must exist before the Navbar dropdown can show real descriptions.

### Phase 5: Portfolio + Case Studies

1. Create `src/lib/data/portfolio.ts` and `src/lib/data/case-studies.ts`
2. `src/app/portfolio/page.tsx` + `PortfolioGrid`, `PortfolioCard`
3. `src/app/portfolio/[slug]/page.tsx` + `generateStaticParams` + `PortfolioDetail`
4. `src/app/case-studies/page.tsx` + `CaseStudyCard`
5. `src/app/case-studies/[slug]/page.tsx` + `generateStaticParams` + `CaseStudyDetail`

**Why fifth:** Requires data layer to be established. Dynamic routing adds build complexity — better to have simpler pages working first to catch any static export issues early.

### Phase 6: Blog

1. Create `src/lib/data/blog.ts` with initial posts
2. `src/app/blog/page.tsx` + `BlogGrid`, `BlogCard`
3. `src/app/blog/[slug]/page.tsx` + `generateStaticParams` + `BlogPostLayout`
4. Optional: `CategoryFilter` (client component)

**Why last:** Blog is lowest conversion priority. It shares the same dynamic routing pattern as Portfolio/Case Studies — build those first to validate the pattern.

### Phase 7: SEO + polish

1. Add `Metadata` export to each page
2. Create `src/app/sitemap.ts` (App Router convention — generates `/sitemap.xml` as static file)
3. Create `public/robots.txt`
4. Fix `cursor: none` on touch devices (media query check in CanvasGrid)
5. Review VideoCard height on small screens
6. Remove unused `recharts` dep

**Why last:** Non-blocking, can be done in parallel with any phase, but most impactful after all pages exist.

---

## Files Modified vs New

| File | Status | Reason |
|------|--------|--------|
| `src/app/layout.tsx` | Modified | Add `metadataBase` to Metadata object |
| `src/components/MasterLayout.tsx` | Modified | Add `<Navbar />` and `<Footer />`, remove padding that belongs to individual pages |
| `src/components/Navbar.tsx` | Modified | Real hrefs, active state via `usePathname`, CTA links to /contact, Services pulls from data file |
| `src/app/page.tsx` | Modified | Remove `<Navbar />` import (moves to MasterLayout) |
| `next.config.ts` | Modified | Add `images: { unoptimized: true }` |
| `src/app/not-found.tsx` | New | App Router global 404 convention |
| `src/app/about/page.tsx` | New | /about route |
| `src/app/services/page.tsx` | New | /services route |
| `src/app/portfolio/page.tsx` | New | /portfolio index route |
| `src/app/portfolio/[slug]/page.tsx` | New | Dynamic portfolio detail with generateStaticParams |
| `src/app/case-studies/page.tsx` | New | /case-studies index route |
| `src/app/case-studies/[slug]/page.tsx` | New | Dynamic case study detail with generateStaticParams |
| `src/app/blog/page.tsx` | New | /blog index route |
| `src/app/blog/[slug]/page.tsx` | New | Dynamic blog post with generateStaticParams |
| `src/app/contact/page.tsx` | New | /contact route |
| `src/app/sitemap.ts` | New | App Router sitemap convention → /sitemap.xml |
| `public/robots.txt` | New | SEO: allow all, point to sitemap |
| `src/lib/data/blog.ts` | New | Static blog post data + query helpers |
| `src/lib/data/case-studies.ts` | New | Static case study data + query helpers |
| `src/lib/data/portfolio.ts` | New | Static portfolio data + query helpers |
| `src/lib/data/services.ts` | New | Services list — shared by page + Navbar dropdown |
| `src/lib/data/testimonials.ts` | New | Testimonials array for Home page |
| `src/lib/types/` | New | TypeScript interfaces for Post, CaseStudy, PortfolioItem |
| `src/components/Footer.tsx` | New | Site-wide footer |
| `src/components/PageHero.tsx` | New | Reusable page hero (About, Services, Contact) |
| `src/components/LogoMarquee.tsx` | New | Client logo scroll strip |
| `src/components/ContactForm.tsx` | New | Formspree-based contact form |
| `src/components/BlogCard.tsx` | New | Blog post preview card |
| `src/components/BlogGrid.tsx` | New | Blog index grid |
| `src/components/BlogPostLayout.tsx` | New | Article prose layout |
| `src/components/CaseStudyCard.tsx` | New | Case study preview card |
| `src/components/CaseStudyDetail.tsx` | New | Case study long-form layout |
| `src/components/PortfolioCard.tsx` | New | Portfolio project card |
| `src/components/PortfolioGrid.tsx` | New | Portfolio index grid |
| `src/components/ServiceCard.tsx` | New | Individual service card |
| `src/components/TeamGrid.tsx` | New | About page team section |
| `src/app/api/newsletter/route.ts` | Modified (or deleted) | POST handler does not work with static export; wire to Formspree or Netlify Function |

---

## Key Architectural Constraints (static export summary)

1. **No POST route handlers at runtime.** `src/app/api/newsletter/route.ts` is broken in production. Replace with client-side fetch to Formspree or a Netlify Function.
2. **No Server Actions.** `'use server'` form actions are unsupported with `output: 'export'`. All form submissions must use client-side fetch.
3. **Dynamic routes require `generateStaticParams`.** Every `[slug]` page must enumerate all slugs at build time from the static data files.
4. **`next/image` needs `unoptimized: true`.** The default image optimization server is unavailable in static export. Add this config flag to allow `next/image` components to render without errors.
5. **`usePathname` requires Client Component.** The Navbar already has `'use client'` so this is a free addition.
6. **`metadata` exports work fine.** They run at build time as Server Component exports — fully compatible with static export.
7. **`sitemap.ts` works fine.** App Router sitemap convention generates a static XML file at build time.
