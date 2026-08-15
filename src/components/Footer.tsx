'use client';
import React from 'react';
import Link from 'next/link';
import BubbleField from './BubbleField';

/* Brand icons (simple-icons paths, CC0) — inline SVGs, no icon-font dep.
   lucide-react deprecated its brand glyphs, so these stay accurate. */
const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Two nav columns only — per the premium-agency convention (Instrument,
    // ustwo, MetaLab): no "Documentation"/"Resources" filler, legal links live
    // in the bottom bar, sitemap.xml is generated for SEO but not user-linked.
    const sections = [
        {
            title: 'Solutions',
            links: [
                { label: 'Web Applications', href: '/services#web-apps' },
                { label: 'Mobile Solutions', href: '/services#mobile' },
                { label: 'AI Integration', href: '/services#ai' },
                { label: 'SaaS Development', href: '/services#saas' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About us', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
            ],
        },
    ];

    // TODO: replace placeholder hrefs with the real profile URLs.
    const socials = [
        { label: 'X (Twitter)', href: 'https://x.com', icon: XIcon },
        { label: 'LinkedIn', href: 'https://linkedin.com', icon: LinkedInIcon },
        { label: 'GitHub', href: 'https://github.com', icon: GitHubIcon },
    ];

    return (
        <footer className="relative z-20 mt-6 md:mt-10 overflow-hidden bg-transparent pt-12 md:pt-16 pb-12">
            {/* Rising-bubble field — bubbles seep up from the bottom edge */}
            <BubbleField />
            <div className="relative w-full px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                                <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1c1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                    <line x1="4" y1="22" x2="4" y2="15"></line>
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tighter text-white">Falcons</span>
                        </Link>
                        <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
                            High-end technology infrastructure for the next generation of enterprise applications. We build digital monoliths that stand the test of time.
                        </p>
                        <div className="flex gap-4">
                            {socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav Sections */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white text-[0.6875rem] uppercase tracking-[0.2em] font-bold mb-6">{section.title}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href}
                                            className="text-white/40 hover:text-white transition-colors text-sm font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
                        © {currentYear} Falcons Agency. All rights reserved.
                    </p>
                    <div className="flex items-center gap-8">
                        <Link href="/privacy" className="text-white/30 hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em] font-bold">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-white/30 hover:text-white transition-colors text-[10px] uppercase tracking-[0.15em] font-bold">
                            Terms
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-white/30 text-[10px] uppercase tracking-[0.15em] font-bold">Systems Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
