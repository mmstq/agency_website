import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy layout previews',
};

/* TEMPORARY preview index. Delete `privacy-preview/` once a layout is chosen. */

const OPTIONS = [
    {
        href: '/privacy-preview/toc',
        n: '01',
        title: 'Sticky contents nav',
        desc: 'Full-width hero + content left, with a sticky table of contents on the right that highlights the section you are reading.',
    },
    {
        href: '/privacy-preview/docs',
        n: '02',
        title: 'Two-column docs layout',
        desc: 'Sticky left panel (title, date, summary, contact CTA) with the sections scrolling on the right — like premium documentation.',
    },
    {
        href: '/privacy-preview/card',
        n: '03',
        title: 'Sticky info card',
        desc: 'Full-width hero + content left, with a sticky GlassSurface card on the right (last updated, rights summary, request-data / contact buttons).',
    },
];

export default function PrivacyPreviewIndex() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                <div className="max-w-3xl space-y-12">
                    <div className="space-y-6">
                        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                            Preview
                        </p>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95]">
                            Privacy layouts
                        </h1>
                        <p className="text-white/50 text-xl font-medium">
                            Three ways to use the empty right rail. Open each, then tell me which to keep.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {OPTIONS.map((o) => (
                            <Link
                                key={o.href}
                                href={o.href}
                                className="group flex gap-5 md:gap-8 rounded-2xl bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]"
                            >
                                <span className="shrink-0 pt-1 text-base md:text-lg font-black tabular-nums text-white/20 leading-none">
                                    {o.n}
                                </span>
                                <div className="flex-1 space-y-2">
                                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
                                        {o.title}
                                        <span aria-hidden className="ml-2 inline-block text-white/30 transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </h2>
                                    <p className="text-white/50 text-base leading-relaxed">{o.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
