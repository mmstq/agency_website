import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'How Modall collects, uses and protects your information.',
};

/* Shared building blocks for the legal pages (privacy / terms): an eyebrow +
   headline hero matching the other pages, then editorial body sections. */

const SECTIONS = [
    {
        title: '1. Information we collect',
        body: [
            'We collect information you choose to give us — typically your name, email address and project details when you reach out through our contact form or by email.',
            'We also collect standard technical data when you browse the site (IP address, browser type, pages visited and referring URLs) through privacy-respecting analytics, used only in aggregate to understand how the site performs.',
        ],
    },
    {
        title: '2. How we use your information',
        body: [
            'We use your contact details to respond to enquiries, scope projects and maintain our client relationship with you. We use aggregate analytics to improve the site.',
            'We do not sell, rent or trade your personal information to third parties. We do not use your information for automated decision-making or profiling.',
        ],
    },
    {
        title: '3. Cookies & analytics',
        body: [
            'The site uses only the cookies necessary for it to function and lightweight analytics to measure traffic. No cross-site advertising trackers are used.',
        ],
    },
    {
        title: '4. Data retention',
        body: [
            'We keep enquiry and project correspondence for as long as needed to serve you and to meet our legal and accounting obligations, after which it is deleted.',
        ],
    },
    {
        title: '5. Your rights',
        body: [
            'You may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Email us and we will act on your request within 30 days.',
        ],
    },
    {
        title: '6. Third-party services',
        body: [
            'Where we rely on third-party processors (such as hosting and email providers), they are bound by their own privacy obligations and process data only on our instructions.',
        ],
    },
    {
        title: '7. Changes to this policy',
        body: [
            'If we change this policy we will update this page and revise the date below. Material changes will be highlighted on the site.',
        ],
    },
];

export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                <div className="max-w-3xl">
                    {/* Hero */}
                    <div className="mb-16 space-y-6">
                        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                            Legal
                        </p>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95]">
                            Privacy Policy
                        </h1>
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                            Last updated: June 12, 2026
                        </p>
                        <p className="text-white/50 text-xl font-medium">
                            We collect as little as possible, use it only to work with
                            you, and never sell it. The details follow.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-12">
                        {SECTIONS.map((section) => (
                            <section key={section.title}>
                                <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-4">
                                    {section.title}
                                </h2>
                                <div className="space-y-4">
                                    {section.body.map((p) => (
                                        <p key={p} className="text-white/50 text-base leading-relaxed">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        ))}

                        <section>
                            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-4">
                                8. Contact
                            </h2>
                            <p className="text-white/50 text-base leading-relaxed">
                                Questions about this policy or your data? Email{' '}
                                <a
                                    href="mailto:hello@modall.agency"
                                    className="text-white/80 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                                >
                                    hello@modall.agency
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
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
