import type { MetadataRoute } from 'next';

// Static metadata route — generated once at build time (output: 'export'),
// emitted as /robots.txt. SEO infrastructure only. Mirrors sitemap.ts:
// same BASE, same force-static requirement.

// Required by output: 'export' — the route is rendered once at build time.
export const dynamic = 'force-static';

const BASE = 'https://modall.agency';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${BASE}/sitemap.xml`,
        host: BASE,
    };
}
