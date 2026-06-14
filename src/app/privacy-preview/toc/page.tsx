import React from 'react';
import { Metadata } from 'next';
import {
    SECTIONS,
    TOC_ITEMS,
    LAST_UPDATED,
    INTRO,
    Eyebrow,
    SectionRow,
    ContactSection,
    AnimatedTitle,
} from '../_shared';
import Toc from '../Toc';

export const metadata: Metadata = {
    title: 'Privacy — Option 1: Sticky contents nav',
};

/* TEMPORARY preview. Option 1: full-width hero + content left, sticky TOC right. */

export default function PrivacyTocPreview() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                <div className="mx-auto max-w-5xl">
                    {/* Hero */}
                    <div className="mb-20 space-y-6">
                        <Eyebrow />
                        <AnimatedTitle className="text-5xl md:text-7xl" />
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                            Last updated: {LAST_UPDATED}
                        </p>
                        <p className="text-white/50 text-xl font-medium max-w-2xl">{INTRO}</p>
                    </div>

                    {/* Content + sticky TOC */}
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-12 lg:gap-16">
                        <div className="space-y-12">
                            {SECTIONS.map((s) => (
                                <SectionRow key={s.n} {...s} />
                            ))}
                            <ContactSection />
                        </div>
                        <Toc items={TOC_ITEMS} />
                    </div>
                </div>
            </div>
        </div>
    );
}
