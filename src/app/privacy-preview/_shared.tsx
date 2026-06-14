import React from 'react';
import Link from 'next/link';
import SplitText from '@/components/SplitText';
import ScrollReveal from '@/components/ScrollReveal';

/* TEMPORARY preview-only building blocks for comparing privacy-page layouts.
   Delete the whole `privacy-preview/` folder once a layout is chosen. */

export const LAST_UPDATED = 'June 12, 2026';
export const INTRO =
    'We collect as little as possible, use it only to work with you, and never sell it. The details follow.';

export interface Section {
    n: string;
    title: string;
    body: string[];
}

export const SECTIONS: Section[] = [
    {
        n: '01',
        title: 'Information we collect',
        body: [
            'We collect information you choose to give us — typically your name, email address and project details when you reach out through our contact form or by email.',
            'We also collect standard technical data when you browse the site (IP address, browser type, pages visited and referring URLs) through privacy-respecting analytics, used only in aggregate to understand how the site performs.',
        ],
    },
    {
        n: '02',
        title: 'How we use your information',
        body: [
            'We use your contact details to respond to enquiries, scope projects and maintain our client relationship with you. We use aggregate analytics to improve the site.',
            'We do not sell, rent or trade your personal information to third parties. We do not use your information for automated decision-making or profiling.',
        ],
    },
    {
        n: '03',
        title: 'Cookies & analytics',
        body: [
            'The site uses only the cookies necessary for it to function and lightweight analytics to measure traffic. No cross-site advertising trackers are used.',
        ],
    },
    {
        n: '04',
        title: 'Data retention',
        body: [
            'We keep enquiry and project correspondence for as long as needed to serve you and to meet our legal and accounting obligations, after which it is deleted.',
        ],
    },
    {
        n: '05',
        title: 'Your rights',
        body: [
            'You may request a copy of the personal data we hold about you, ask us to correct it, or ask us to delete it. Email us and we will act on your request within 30 days.',
        ],
    },
    {
        n: '06',
        title: 'Third-party services',
        body: [
            'Where we rely on third-party processors (such as hosting and email providers), they are bound by their own privacy obligations and process data only on our instructions.',
        ],
    },
    {
        n: '07',
        title: 'Changes to this policy',
        body: [
            'If we change this policy we will update this page and revise the date below. Material changes will be highlighted on the site.',
        ],
    },
];

export const TOC_ITEMS = [
    ...SECTIONS.map(({ n, title }) => ({ n, title })),
    { n: '08', title: 'Contact' },
];

export function Eyebrow() {
    return (
        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
            Legal
        </p>
    );
}

export function SectionRow({ n, title, body }: Section) {
    return (
        <ScrollReveal tag="section">
            <div id={`sec-${n}`} className="scroll-mt-32 flex gap-5 md:gap-8">
                <span
                    aria-hidden
                    className="shrink-0 pt-1.5 text-base md:text-lg font-black tabular-nums text-white/20 leading-none"
                >
                    {n}
                </span>
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
                        {title}
                    </h2>
                    <div className="space-y-4">
                        {body.map((p) => (
                            <p key={p} className="text-white/50 text-base leading-relaxed">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
}

export function ContactSection() {
    return (
        <ScrollReveal tag="section">
            <div id="sec-08" className="scroll-mt-32 flex gap-5 md:gap-8">
                <span
                    aria-hidden
                    className="shrink-0 pt-1.5 text-base md:text-lg font-black tabular-nums text-white/20 leading-none"
                >
                    08
                </span>
                <div className="flex-1 space-y-4">
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
                        Contact
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
                </div>
            </div>
        </ScrollReveal>
    );
}

export function AnimatedTitle({ className = '' }: { className?: string }) {
    return (
        <h1 className={`font-black tracking-tighter text-white leading-[0.95] perspective-1000 ${className}`}>
            <SplitText
                text="Privacy Policy"
                delay={35}
                duration={0.8}
                splitType="words"
                from={{ opacity: 0, y: 80, rotateX: -30 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                tag="span"
            />
        </h1>
    );
}
