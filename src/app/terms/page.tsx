import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'The terms that govern your use of the Falcons website and services.',
};

/* Legal page layout matches the rest of the site: animated SplitText hero,
   per-section ScrollReveal, and a numbered left rail for editorial rhythm.
   Mirrors the privacy page structure. */

const SECTIONS = [
    {
        n: '01',
        title: 'Acceptance of these terms',
        body: [
            'By accessing this website you agree to these Terms of Service. If you do not agree with any part of them, please do not use the site.',
        ],
    },
    {
        n: '02',
        title: 'Use of the site',
        body: [
            'You may browse, link to and share the content on this site for any lawful purpose. You may not scrape it at scale, attempt to disrupt it, or misrepresent it as your own.',
        ],
    },
    {
        n: '03',
        title: 'Intellectual property',
        body: [
            'All content on this site — copy, design, code, imagery and case-study material — belongs to Falcons or its clients and is protected by copyright. Client work is shown with permission and remains the property of the respective client where so agreed.',
        ],
    },
    {
        n: '04',
        title: 'Client engagements',
        body: [
            'Work we undertake for clients is governed by a separate, signed services agreement. Nothing on this site constitutes an offer, quotation or warranty for any specific engagement; project scope, pricing, timelines and deliverables are defined per agreement.',
        ],
    },
    {
        n: '05',
        title: 'No warranties',
        body: [
            'This site is provided "as is". While we keep its content accurate and current, we make no warranties about completeness or fitness for a particular purpose, and we may change content at any time without notice.',
        ],
    },
    {
        n: '06',
        title: 'Limitation of liability',
        body: [
            'To the maximum extent permitted by law, Falcons is not liable for any indirect or consequential loss arising from your use of this website. Your statutory rights are unaffected.',
        ],
    },
    {
        n: '07',
        title: 'Third-party links',
        body: [
            'The site links to external services (such as app stores and social platforms). We are not responsible for their content or their handling of your data — their own terms apply.',
        ],
    },
    {
        n: '08',
        title: 'Changes to these terms',
        body: [
            'We may update these terms from time to time. The version published on this page is the one in force, and the date below reflects the latest revision.',
        ],
    },
];

export default function TermsPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                <div className="max-w-3xl">
                    {/* Hero */}
                    <div className="mb-20 space-y-6">
                        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                            Legal
                        </p>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] perspective-1000">
                            <SplitText
                                text="Terms of Service"
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 80, rotateX: -30 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                tag="span"
                            />
                        </h1>
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                            Last updated: June 12, 2026
                        </p>
                        <p className="text-white/50 text-xl font-medium">
                            The short version: use the site fairly, our work is our own,
                            and client projects run on signed agreements — not website
                            copy.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                        {SECTIONS.map((section) => (
                            <ScrollReveal key={section.title} tag="section">
                                <div className="flex gap-5 md:gap-8">
                                    <span
                                        aria-hidden
                                        className="shrink-0 pt-1.5 text-base md:text-lg font-black tabular-nums text-white/20 leading-none"
                                    >
                                        {section.n}
                                    </span>
                                    <div className="flex-1 space-y-4">
                                        <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
                                            {section.title}
                                        </h2>
                                        <div className="space-y-4">
                                            {section.body.map((p) => (
                                                <p key={p} className="text-white/50 text-base leading-relaxed">
                                                    {p}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}

                        <ScrollReveal tag="section">
                            <div className="flex gap-5 md:gap-8">
                                <span
                                    aria-hidden
                                    className="shrink-0 pt-1.5 text-base md:text-lg font-black tabular-nums text-white/20 leading-none"
                                >
                                    09
                                </span>
                                <div className="flex-1 space-y-4">
                                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
                                        Contact
                                    </h2>
                                    <p className="text-white/50 text-base leading-relaxed">
                                        Questions about these terms? Email{' '}
                                        <a
                                            href="mailto:info@teamfalcon.in"
                                            className="text-white/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                                        >
                                            info@teamfalcon.in
                                        </a>{' '}
                                        or reach us through the{' '}
                                        <Link
                                            href="/contact"
                                            className="text-white/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                                        >
                                            contact page
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
}
