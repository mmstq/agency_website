import type { MetadataRoute } from 'next';

// Static metadata route — generated once at build time (output: 'export'),
// emitted as /sitemap.xml. SEO infrastructure only; it is intentionally not
// linked from the footer (premium-site convention — raw XML isn't user-facing).

// Required by output: 'export' — the route is rendered once at build time.
export const dynamic = 'force-static';

const BASE = 'https://modall.agency';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return [
        { url: `${BASE}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
        { url: `${BASE}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE}/portfolio`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${BASE}/about`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
        { url: `${BASE}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${BASE}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
        { url: `${BASE}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
        { url: `${BASE}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    ];
}
