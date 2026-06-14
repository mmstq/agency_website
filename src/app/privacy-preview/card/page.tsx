import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import GlassSurface from '@/components/GlassSurface';
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
    title: 'Privacy — Option 3: Sticky info card',
};

/* TEMPORARY preview. Option 3: full-width hero + content left, sticky
   GlassSurface info/CTA card on the right. */

export default function PrivacyCardPreview() {
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

                    {/* Content + sticky card */}
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 lg:gap-16">
                        <div className="space-y-12">
                            {SECTIONS.map((s) => (
                                <SectionRow key={s.n} {...s} />
                            ))}
                            <ContactSection />
                        </div>

                        <aside className="hidden lg:block">
                            <div className="sticky top-32">
                                <GlassSurface
                                    width="100%"
                                    height="auto"
                                    borderRadius={24}
                                    backgroundOpacity={0.08}
                                    saturation={1.55}
                                    distortionScale={-110}
                                    className="glass-surface--flush"
                                >
                                    <div className="w-full p-6 space-y-6">
                                        <div className="space-y-1">
                                            <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                                                Last updated
                                            </p>
                                            <p className="text-white/80 font-medium">{LAST_UPDATED}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                                                Your rights
                                            </p>
                                            <p className="text-white/50 text-sm leading-relaxed">
                                                Access, correction and deletion — we act on requests within 30 days.
                                            </p>
                                        </div>

                                        <div className="space-y-3 pt-1">
                                            <a
                                                href="mailto:hello@modall.agency?subject=Data%20request"
                                                className="block rounded-xl bg-white/10 px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-white/15"
                                            >
                                                Request my data
                                            </a>
                                            <Link
                                                href="/contact"
                                                className="block rounded-xl bg-white/5 px-5 py-3 text-center text-sm font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                            >
                                                Contact us
                                            </Link>
                                        </div>
                                    </div>
                                </GlassSurface>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}
