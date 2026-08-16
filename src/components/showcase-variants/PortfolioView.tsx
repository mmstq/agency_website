'use client';

import { useSearchParams } from 'next/navigation';
import ScrollReveal from '@/components/ScrollReveal';
import SplitText from '@/components/SplitText';
import StackScaleBack from './StackScaleBack';
import PortfolioSingle from './PortfolioSingle';
import { projects } from '@/lib/data/projects';

/* ─────────────────────────────────────────────────────────────────────────
   PortfolioView — decides which /portfolio experience to show, by the `p`
   query param (reactive via useSearchParams, so it re-resolves on every
   navigation — unlike the URL hash, which Next's router does not track).

   - No `?p` (opened via the homepage "View all projects" button) → the hero +
     the SCALE-BACK stacking-scroll of all projects.
   - `?p=koor` (from a homepage hover-list row) → single-project mode
     (one project + the numbered rail), keyed so a new project remounts cleanly.

   The global navbar remains available on /portfolio; only the footer is hidden
   by MasterLayout so visitors keep a clear route back into the site.
   ───────────────────────────────────────────────────────────────────────── */

export default function PortfolioView() {
    const pid = useSearchParams().get('p');
    const single = !!pid && projects.some((p) => p.id === pid);

    if (single) {
        return (
            <div className="flex min-h-[calc(100svh-4.5rem)] flex-col md:h-[calc(100svh-4.5rem)] md:overflow-hidden">
                <PortfolioSingle key={pid} initialId={pid} />
            </div>
        );
    }

    return (
        // No bottom padding: the stack must end exactly where the last card
        // pins, so there's no dead scroll / empty space past it (the footer is
        // hidden on /portfolio — see MasterLayout).
        <div>
            {/* Hero is passed into the stack so it becomes the pinned bottom
                layer — project 1 rises up and covers it on scroll (see
                StackScaleBack). The layer owns the top padding now. */}
            <StackScaleBack
                hero={
                    <div className="w-full px-6 md:px-12">
                        <div className="max-w-4xl space-y-6">
                            <ScrollReveal>
                                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.3em] text-white/30">Our Work</p>
                            </ScrollReveal>

                            <h1 className="perspective-1000 text-5xl font-black leading-[0.95] tracking-tighter text-white md:text-8xl">
                                <SplitText
                                    text="Technical artifacts of human progress."
                                    delay={35}
                                    duration={0.8}
                                    splitType="words"
                                    from={{ opacity: 0, y: 80, rotateX: -30 }}
                                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                                    tag="span"
                                />
                            </h1>

                            <ScrollReveal delay="delay-200">
                                <p className="text-xl font-medium leading-tight text-white/50 md:text-3xl">
                                    A collection of high-performance mobile and web platforms built with surgical precision.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
