'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BubbleField from './BubbleField';
import { InstagramIcon, LinkedInIcon } from './BrandIcons';

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

    const socials = [
        { label: 'Instagram', href: 'https://www.instagram.com/teamfalconhq/', icon: InstagramIcon },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/company/weasagency/?viewAsMember=true', icon: LinkedInIcon },
    ];

    return (
        <footer className="relative z-20 mt-6 md:mt-10 overflow-hidden bg-transparent pt-12 md:pt-16 pb-12">
            {/* Rising-bubble field — bubbles seep up from the bottom edge */}
            <BubbleField />
            <div className="relative w-full px-6 md:px-12">
                <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-8 mb-16">
                    
                    {/* Brand Column */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-[#f7f7f2] transition-transform group-hover:scale-105">
                                <Image
                                    src="/images/modall-falcon-logo.jpeg"
                                    alt=""
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                />
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
                        <div
                            key={section.title}
                            className={section.title === 'Company' ? 'text-right lg:text-left' : undefined}
                        >
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
