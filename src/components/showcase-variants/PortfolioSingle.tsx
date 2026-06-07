'use client';

import { useState, useCallback } from 'react';
import { projects } from '@/lib/data/projects';
import { DetailLayout } from './portfolioShared';

/* ─────────────────────────────────────────────────────────────────────────
   PortfolioSingle — the SINGLE-PROJECT mode of /portfolio.

   Entered when /portfolio is opened with ?p=<id> (e.g. /portfolio?p=koor, from
   a homepage hover-list row). Shows ONE project plus a numbered rail (01–06)
   that swaps the project IN PLACE (quick crossfade) and keeps the `?p` query in
   sync (via replaceState — shareable, no extra history entries). No stacking;
   browser Back returns to the homepage. The shown project's phone carousel
   auto-cycles (active = true).
   ───────────────────────────────────────────────────────────────────────── */

const N = projects.length;

export default function PortfolioSingle({ initialId }: { initialId?: string }) {
    const [active, setActive] = useState(() => {
        const i = projects.findIndex((p) => p.id === initialId);
        return i >= 0 ? i : 0;
    });

    const goTo = useCallback((i: number) => {
        const idx = ((i % N) + N) % N;
        setActive(idx);
        if (typeof window !== 'undefined') {
            // Keep the URL shareable without adding history entries.
            window.history.replaceState(null, '', `/portfolio?p=${projects[idx].id}`);
        }
    }, []);

    const onRailKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                goTo(active + 1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                goTo(active - 1);
            }
        },
        [active, goTo],
    );

    const project = projects[active];

    return (
        <section id="work" className="relative scroll-mt-24 py-16 md:py-20">
            <div className="w-full px-6 md:px-12">
                {/* Numbered rail — switches the shown project in place. */}
                <div
                    className="mb-10 border-t border-white/[0.06] pt-6"
                    role="group"
                    aria-label="Project navigation"
                    onKeyDown={onRailKeyDown}
                >
                    <div className="flex flex-wrap items-center gap-x-7 gap-y-3 md:gap-x-9">
                        {projects.map((p, i) => {
                            const on = i === active;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => goTo(i)}
                                    aria-current={on ? 'true' : 'false'}
                                    aria-label={`Show ${p.title}`}
                                    className="group/rail relative flex items-center gap-3 rounded-md outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/40"
                                    style={{ color: on ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.32)' }}
                                >
                                    <span className="text-sm font-black tabular-nums tracking-tight">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 group-hover/rail:text-white/70 sm:inline">
                                        {p.title}
                                    </span>
                                    <span className="relative ml-1 h-px w-8 overflow-hidden rounded-full bg-white/10 md:w-12">
                                        <span
                                            className="absolute inset-0 origin-left rounded-full bg-white transition-transform duration-500"
                                            style={{ transform: on ? 'scaleX(1)' : 'scaleX(0)' }}
                                        />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Screen-reader announcement for the active project. */}
                <span className="sr-only" aria-live="polite" aria-atomic="true">
                    {project.title}, project {active + 1} of {N}
                </span>

                {/* The active project — re-keyed so each swap fades in. */}
                <div key={active} className="portfolio-single-fade">
                    <DetailLayout project={project} index={active} active />
                </div>
            </div>

            <style jsx>{`
                .portfolio-single-fade {
                    animation: portfolioSingleFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                @keyframes portfolioSingleFade {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .portfolio-single-fade {
                        animation-duration: 0.01ms;
                    }
                }
            `}</style>
        </section>
    );
}
