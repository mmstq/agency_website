'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

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
        {
            title: 'Resources',
            links: [
                { label: 'Documentation', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Sitemap', href: '/sitemap.xml' },
            ],
        },
    ];

    const socials = [
        { label: 'X (Twitter)', href: 'https://x.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' },
        { label: 'GitHub', href: 'https://github.com' },
    ];

    return (
        <footer className="relative z-20 mt-20 border-t border-white/5 bg-transparent pt-16 pb-12">
            <div className="w-full px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                                <svg suppressHydrationWarning xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a1c1c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                                    <line x1="4" y1="22" x2="4" y2="15"></line>
                                </svg>
                            </div>
                            <span className="text-2xl font-bold tracking-tighter text-white">Modall</span>
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
                                    <span className="text-[10px] font-bold uppercase tracking-tighter">{social.label.split(' ')[0][0]}</span>
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
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/30 text-xs font-medium uppercase tracking-widest">
                        © {currentYear} Modall Agency. All rights reserved.
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
