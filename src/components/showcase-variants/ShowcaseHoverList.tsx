'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import SplitText from '../SplitText';

/**
 * ShowcaseHoverList — editorial hover-reveal list.
 *
 * Big project titles are stacked as rows (01–06). Hovering a desktop row sends
 * its full screenshot train quickly in from the right, eases it into the space
 * beside the project copy, then keeps it moving right-to-left as a slow seamless
 * marquee. The other projects keep their full visual weight.
 *
 * Touch / no-hover fallback: the middle carousel stays hidden and tapping a row
 * toggles the existing inline screenshot strip. No automatic row emphasis is
 * applied, so every project retains the same visual weight.
 */

// Editorial metadata per project. Copy is sourced from real, verifiable proof
// points — never invented numbers.
interface Meta {
    category: string;
    proof: string;
}

const META: Record<string, Meta> = {
    marhaba: {
        category: 'Enterprise Auctions',
        proof: 'Real-time WebSocket bidding, an in-app wallet and a full payment gateway across the entire vehicle lifecycle — sell, buy and ship.',
    },
    koor: {
        category: 'PropTech Marketplace',
        proof: '10K+ downloads in the first month with zero marketing spend, sustained at a 4.5★ rating — multilingual, offline-first, AI-moderated.',
    },
    movermate: {
        category: 'Logistics Platform',
        proof: 'Stripe Tap-to-Pay at the door, Radar-powered navigation and geofencing, with live crew tracking and in-app scheduling.',
    },
    counsellor_app: {
        category: 'Field-Sales CRM',
        proof: 'An on-device dialer with call logging and recording, wired to live lead pipelines for a mobile sales force.',
    },
    spotted: {
        category: 'Fintech · Scan-Pay-Earn',
        proof: 'Scan a QR, pay through any UPI app, and earn instant cashback to an in-app wallet — with a real-time social feed and chat.',
    },
    ssc_ai: {
        category: 'AI Exam Prep',
        proof: 'Gemini explains every question, an AI tutor generates papers and notes, and previous-year questions are extracted by a local Phi-4 LLM.',
    },
};

// Build the short availability label from the real link fields on each project.
function availability(p: (typeof projects)[number]): string {
    const platforms: string[] = [];
    if (p.iosLink) platforms.push('iOS');
    if (p.link) platforms.push('Android');
    if (p.webLink) platforms.push('Web');
    return platforms.join(' · ');
}

const EASE = 'cubic-bezier(0.16,1,0.3,1)';

export default function ShowcaseHoverList() {
    const headerRef = useRef<HTMLElement>(null);
    // Per-row <li> elements support the restrained active-row nudge.
    const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
    const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);
    // Inner reveal wrappers (one per row) used for the staggered scroll reveal,
    // kept off the <li> so the reveal never collides with hover emphasis.
    const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Active row index (-1 = none). Held in a ref to avoid setState-in-effect.
    const activeRef = useRef(-1);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [trainCopyCount, setTrainCopyCount] = useState(2);
    // Defaults to true so SSR / first paint treats clicks as plain navigation.
    const hoverCapableRef = useRef(true);

    // Keep the small active-row nudge without changing any row's opacity.
    const applyActive = (next: number) => {
        if (activeRef.current === next) return;
        activeRef.current = next;

        rowRefs.current.forEach((row, i) => {
            if (!row) return;
            const isActive = i === next;
            row.style.transform = isActive ? 'translateX(12px)' : 'translateX(0px)';
        });
    };

    // ---------------- STAGGERED SCROLL REVEAL ----------------
    // Header + each project row fade/slide up as they enter the viewport. Pure
    // IntersectionObserver toggling .sw-shown — no animation libraries (per
    // AGENTS.md). Reduced motion is handled in CSS (everything shows up front),
    // so we bail early and never hide anything for those users.
    useEffect(() => {
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (reduceMotion) return;

        const targets: HTMLElement[] = [];
        if (headerRef.current) targets.push(headerRef.current);
        revealRefs.current.forEach((el) => el && targets.push(el));
        if (!targets.length) return;

        const io = new IntersectionObserver(
            (entries) => {
                // Re-runs every time a row enters OR leaves the viewport (never
                // unobserve) so the reveal replays on each scroll-back, matching
                // useScrollAnimation. Cascade items that cross the threshold
                // together; the delay collapses to ~0 when they trickle in
                // one-by-one on slow scroll.
                let batch = 0;
                for (const entry of entries) {
                    const el = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        el.style.transitionDelay = `${batch * 120}ms`;
                        el.classList.add('sw-shown');
                        batch += 1;
                    } else {
                        // Reset to the hidden state so the next entry re-animates.
                        el.style.transitionDelay = '0ms';
                        el.classList.remove('sw-shown');
                    }
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -18% 0px' },
        );

        targets.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        const hoverCapable =
            window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        hoverCapableRef.current = hoverCapable;

        const handleResize = () => {
            const active = activeRef.current;
            const lane = carouselRefs.current[active];
            const shotCount = projects[active]?.screenshotPaths.length ?? 0;
            if (!lane || !shotCount) return;

            const setDistance = shotCount * 90;
            setTrainCopyCount(
                Math.max(3, Math.ceil(lane.clientWidth / setDistance) + 2),
            );
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // One continuous motion function owns both the fast arrival and the slow
    // marquee. The arrival uses constant deceleration (not an ease-out tail),
    // then reaches the loop at the exact same velocity on the following frame.
    useEffect(() => {
        if (activeIndex < 0) return;

        const train = carouselRefs.current[activeIndex]?.querySelector<HTMLDivElement>(
            '.sw-image-train',
        );
        const shotCount = projects[activeIndex]?.screenshotPaths.length ?? 0;
        if (!train || !shotCount) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            train.style.transform = 'translate3d(0, -50%, 0)';
            return;
        }

        const arrivalDuration = 1200;
        const entryOffset = Math.min(window.innerWidth * 0.7, 1200);
        const loopDistance = shotCount * 90;
        const cruiseVelocity = -0.052;
        const initialVelocity =
            (-2 * entryOffset) / arrivalDuration - cruiseVelocity;
        const deceleration =
            (cruiseVelocity - initialVelocity) / arrivalDuration;
        let rafId = 0;
        let startTime = 0;

        const frame = (time: number) => {
            if (!startTime) startTime = time;
            const elapsed = time - startTime;
            let x = 0;

            if (elapsed < arrivalDuration) {
                x =
                    entryOffset +
                    initialVelocity * elapsed +
                    0.5 * deceleration * elapsed * elapsed;
            } else {
                x =
                    (cruiseVelocity * (elapsed - arrivalDuration)) % loopDistance;
            }

            train.style.transform = `translate3d(${x.toFixed(3)}px, -50%, 0)`;
            rafId = requestAnimationFrame(frame);
        };

        rafId = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(rafId);
    }, [activeIndex]);

    const handleEnter = (i: number) => {
        if (!hoverCapableRef.current) return;
        const lane = carouselRefs.current[i];
        const shotCount = projects[i]?.screenshotPaths.length ?? 0;
        if (lane && shotCount) {
            const setDistance = shotCount * 90;
            setTrainCopyCount(
                Math.max(3, Math.ceil(lane.clientWidth / setDistance) + 2),
            );
        }
        applyActive(i);
        setActiveIndex(i);
    };

    const handleLeave = (i: number) => {
        if (activeRef.current !== i) return;
        applyActive(-1);
        setActiveIndex(-1);
        setTrainCopyCount(2);
    };

    // Tap-to-expand inline panel toggle for touch devices.
    const toggleInline = (i: number) => {
        const row = rowRefs.current[i];
        if (!row) return;
        const inline = row.querySelector<HTMLDivElement>('[data-inline-panel]');
        if (!inline) return;
        const isOpen = !!inline.style.maxHeight && inline.style.maxHeight !== '0px';

        // Collapse any other open inline panels first.
        rowRefs.current.forEach((other, oi) => {
            if (!other || oi === i) return;
            const p = other.querySelector<HTMLDivElement>('[data-inline-panel]');
            if (p) {
                p.style.maxHeight = '0px';
                p.style.opacity = '0';
            }
        });

        if (isOpen) {
            inline.style.maxHeight = '0px';
            inline.style.opacity = '0';
        } else {
            inline.style.maxHeight = `${inline.scrollHeight}px`;
            inline.style.opacity = '1';
        }
    };

    return (
        <section
            id="case-studies"
            className="relative scroll-mt-24 overflow-hidden py-28 md:py-36"
        >
            <div className="w-full px-6 md:px-12">
                {/* ── Header ───────────────────────────────────────────────── */}
                <header
                    ref={headerRef}
                    className="sw-reveal mb-20 flex flex-col gap-10 md:mb-28 md:flex-row md:items-end md:justify-between"
                >
                    <div className="max-w-2xl">
                        <p className="mb-6 text-[0.6875rem] font-bold uppercase tracking-[0.32em] text-white/30">
                            Selected Work — 2025 / 2026
                        </p>
                        <h2 className="perspective-1000 text-[2.75rem] font-black leading-[0.92] tracking-tighter text-white sm:text-6xl md:text-7xl">
                            <SplitText
                                text="Six products,"
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 60, rotateX: -25 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                textAlign="left"
                                tag="span"
                            />
                            <br />
                            <SplitText
                                text="shipped to the stores."
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 60, rotateX: -25 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                textAlign="left"
                                tag="span"
                                className="text-white/40"
                            />
                        </h2>
                        <p className="mt-7 max-w-md text-base leading-relaxed text-white/45">
                            Production platforms across fintech, proptech, logistics and
                            AI — each live on the App Store, Play Store and web.
                        </p>
                    </div>

                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-2.5 self-start rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1a1c1c] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-[#e2e2e2] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] active:scale-95 shrink-0"
                    >
                        <span>View all projects</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </Link>
                </header>

                {/* ── The List ─────────────────────────────────────────────── */}
                <ul className="relative flex flex-col">
                    {projects.map((project, idx) => {
                        const meta = META[project.id];
                        const isLast = idx === projects.length - 1;
                        const platforms = availability(project);

                        return (
                            <li
                                key={project.id}
                                ref={(el) => {
                                    rowRefs.current[idx] = el;
                                }}
                                onMouseEnter={() => handleEnter(idx)}
                                onMouseLeave={() => handleLeave(idx)}
                                className="group/row relative transition-transform duration-500"
                                style={{
                                    transitionTimingFunction: EASE,
                                    willChange: 'transform',
                                }}
                            >
                              <div
                                ref={(el) => {
                                    revealRefs.current[idx] = el;
                                }}
                                className="sw-reveal"
                              >
                                <Link
                                    href={`/portfolio?p=${project.id}`}
                                    onClick={(e) => {
                                        // On touch, the first tap expands the inline
                                        // preview rather than navigating.
                                        if (hoverCapableRef.current) return;
                                        const row = rowRefs.current[idx];
                                        const inline = row?.querySelector<HTMLDivElement>(
                                            '[data-inline-panel]',
                                        );
                                        const isOpen =
                                            !!inline?.style.maxHeight &&
                                            inline.style.maxHeight !== '0px';
                                        if (!isOpen) {
                                            e.preventDefault();
                                            toggleInline(idx);
                                        }
                                    }}
                                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent"
                                    aria-label={`${project.title} — ${meta?.category ?? 'case study'}`}
                                >
                                    <div
                                        className={`relative flex flex-col gap-5 py-10 md:flex-row md:items-center md:gap-10 md:py-12 ${
                                            isLast ? '' : 'border-b border-white/[0.07]'
                                        }`}
                                    >
                                        {/* Index */}
                                        <span className="font-black leading-none tabular-nums text-white/20 transition-colors duration-500 group-hover/row:text-white/70 text-sm md:w-16 md:shrink-0 md:text-base">
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>

                                        {/* Title + meta */}
                                        <div className="sw-project-copy flex min-w-0 flex-1 flex-col gap-4">
                                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                                {/* Logo chip */}
                                                <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[9px] ring-1 ring-inset ring-white/[0.08] sm:h-11 sm:w-11 sm:rounded-[12px]">
                                                    <Image
                                                        src={project.logo}
                                                        alt=""
                                                        fill
                                                        sizes="(max-width: 639px) 32px, 44px"
                                                        className="object-cover"
                                                    />
                                                </span>

                                                <h3 className="truncate font-black leading-[0.9] tracking-tighter text-white text-[clamp(1.5rem,8.2vw,2.25rem)] sm:text-[2.75rem] md:text-[clamp(2.75rem,6.4vw,3.75rem)]">
                                                    {project.title}
                                                </h3>
                                            </div>

                                            <div className="flex flex-col gap-2.5 sm:pl-[3.75rem]">
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                                                    <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/45">
                                                        {meta?.category}
                                                    </span>
                                                    {platforms && (
                                                        <>
                                                            <span
                                                                aria-hidden="true"
                                                                className="h-1 w-1 rounded-full bg-white/20"
                                                            />
                                                            <span className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-white/30">
                                                                {platforms}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <p className="max-w-xl text-sm leading-relaxed text-white/45 md:text-[0.95rem]">
                                                    {meta?.proof}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hover-only full gallery train in the middle runway */}
                                        <div
                                            ref={(el) => {
                                                carouselRefs.current[idx] = el;
                                            }}
                                            aria-hidden="true"
                                            className="sw-hover-carousel relative hidden h-[190px] min-w-0 flex-1 overflow-hidden"
                                        >
                                            <div
                                                className={`sw-image-train absolute left-0 top-1/2 ${
                                                    activeIndex === idx
                                                        ? 'sw-image-train--active'
                                                        : ''
                                                }`}
                                            >
                                                {Array.from({
                                                    length:
                                                        activeIndex === idx
                                                            ? trainCopyCount
                                                            : 2,
                                                }).map((_, copy) => (
                                                    <div
                                                        key={copy}
                                                        className="sw-image-set flex shrink-0 items-center gap-3"
                                                    >
                                                        {project.screenshotPaths.map((shot, shotIdx) => (
                                                            <div
                                                                key={`${copy}-${shotIdx}`}
                                                                className={`relative h-[164px] w-[78px] shrink-0 overflow-hidden rounded-[14px] bg-[#121212] ring-1 ring-inset ring-white/[0.08] shadow-[0_18px_35px_rgba(0,0,0,0.35)] ${
                                                                    shotIdx % 2 === 0
                                                                        ? '-translate-y-1'
                                                                        : 'translate-y-3'
                                                                }`}
                                                            >
                                                                <Image
                                                                    src={shot}
                                                                    alt=""
                                                                    fill
                                                                    sizes="78px"
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tech (first 3) — desktop only */}
                                        <div className="hidden shrink-0 flex-col items-end gap-2 xl:flex">
                                            {project.tech.slice(0, 3).map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[0.625rem] font-black uppercase tracking-[0.18em] text-white/30 transition-colors duration-500 group-hover/row:text-white/60"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Arrow */}
                                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/60 ring-1 ring-inset ring-white/[0.08] transition-all duration-500 group-hover/row:bg-white group-hover/row:text-black group-hover/row:ring-white">
                                            <ArrowUpRight className="size-5 transition-transform duration-500 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5" />
                                        </span>
                                    </div>

                                    {/* Inline preview strip — TOUCH ONLY (collapsed by default) */}
                                    <div
                                        data-inline-panel
                                        className="overflow-hidden md:hidden"
                                        style={{
                                            maxHeight: '0px',
                                            opacity: 0,
                                            transition: `max-height 0.6s ${EASE}, opacity 0.5s ease`,
                                        }}
                                    >
                                        <div className="flex gap-3 overflow-x-auto pb-9 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                            {project.screenshotPaths.slice(0, 4).map((shot, sIdx) => (
                                                <div
                                                    key={sIdx}
                                                    className="relative aspect-[9/19] w-[42%] max-w-[170px] shrink-0 overflow-hidden rounded-[16px] bg-[#121212] ring-1 ring-inset ring-white/[0.08]"
                                                >
                                                    <Image
                                                        src={shot}
                                                        alt={`${project.title} screenshot ${sIdx + 1}`}
                                                        fill
                                                        sizes="170px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                              </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <style jsx>{`
                .sw-image-train {
                    display: flex;
                    width: max-content;
                    gap: 0.75rem;
                    opacity: 0;
                    transform: translate3d(min(70vw, 1200px), -50%, 0);
                    transition: opacity 220ms ease-out;
                    will-change: transform, opacity;
                }

                .sw-image-train--active {
                    opacity: 1;
                }

                @media (min-width: 1100px) and (hover: hover) and (pointer: fine) {
                    .sw-project-copy {
                        flex: 0 0 min(58%, 620px);
                    }

                    .sw-hover-carousel {
                        display: block;
                        -webkit-mask-image: linear-gradient(
                            to right,
                            transparent,
                            black 8%,
                            black 94%,
                            transparent
                        );
                        mask-image: linear-gradient(
                            to right,
                            transparent,
                            black 8%,
                            black 94%,
                            transparent
                        );
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .sw-image-train--active {
                        opacity: 1;
                        transform: translate3d(0, -50%, 0);
                    }
                }
            `}</style>
        </section>
    );
}
