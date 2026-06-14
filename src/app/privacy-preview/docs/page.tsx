import React from 'react';
import { Metadata } from 'next';
import {
    SECTIONS,
    LAST_UPDATED,
    INTRO,
    Eyebrow,
    SectionRow,
    ContactSection,
    AnimatedTitle,
} from '../_shared';

export const metadata: Metadata = {
    title: 'Privacy — Option 2: Two-column docs layout',
};

/* TEMPORARY preview. Option 2: sticky left panel (title/meta/CTA) + scrolling
   sections on the right. */

export default function PrivacyDocsPreview() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-12 lg:gap-20">
                        {/* Sticky left panel */}
                        <aside className="lg:sticky lg:top-32 lg:self-start space-y-7">
                            <Eyebrow />
                            <AnimatedTitle className="text-4xl md:text-5xl" />
                            <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                                Last updated: {LAST_UPDATED}
                            </p>
                            <p className="text-white/50 text-lg font-medium">{INTRO}</p>
                            <a
                                href="mailto:hello@modall.agency"
                                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-bold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Email us
                                <span aria-hidden>→</span>
                            </a>
                        </aside>

                        {/* Scrolling sections */}
                        <div className="space-y-12 max-w-3xl">
                            {SECTIONS.map((s) => (
                                <SectionRow key={s.n} {...s} />
                            ))}
                            <ContactSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
