'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import SplitText from '../SplitText';

/**
 * ShowcaseHoverList — editorial hover-reveal list.
 *
 * Big project titles stacked as rows (01–06). Hovering a row dims the others and
 * brightens the active one, while a floating preview panel reveals that
 * project's screenshots and smoothly tracks toward the cursor via a rAF lerp
 * (the parallax pattern reused from CaseStudyPreviewRow.tsx).
 *
 * Touch / no-hover fallback: the floating panel is hidden; tapping a row toggles
 * an inline screenshot strip, and a gentle auto-cycle keeps one row highlighted
 * so the work is never invisible on mobile. All driven by refs + direct DOM
 * mutation — no setState-in-effect, no animation libraries (per AGENTS.md).
 */

// Editorial metadata per project. Copy is sourced from real, verifiable proof
// points — never invented numbers.
interface Meta {
    client: string;
    category: string;
    proof: string;
    metric: string;
    metricLabel: string;
}

const META: Record<string, Meta> = {
    marhaba: {
        client: 'Marhaba Auctions · Dubai',
        category: 'Enterprise Auctions',
        proof: 'Real-time WebSocket bidding, an in-app wallet and a full payment gateway across the entire vehicle lifecycle — sell, buy and ship.',
        metric: 'Live',
        metricLabel: 'WebSocket bidding',
    },
    koor: {
        client: 'Koor · Gulf',
        category: 'PropTech Marketplace',
        proof: '10K+ downloads in the first month with zero marketing spend, sustained at a 4.5★ rating — multilingual, offline-first, AI-moderated.',
        metric: '10K+',
        metricLabel: 'First-month installs',
    },
    movermate: {
        client: 'MoverMate · Australia',
        category: 'Logistics Platform',
        proof: 'Stripe Tap-to-Pay at the door, Radar-powered navigation and geofencing, with live crew tracking and in-app scheduling.',
        metric: 'Tap',
        metricLabel: 'Stripe in-person pay',
    },
    counsellor_app: {
        client: 'SwiftAMS Business',
        category: 'Field-Sales CRM',
        proof: 'An on-device dialer with call logging and recording, wired to live lead pipelines for a mobile sales force.',
        metric: 'CRM',
        metricLabel: 'Mobile sales suite',
    },
    spotted: {
        client: 'Spotted · India',
        category: 'Fintech · Scan-Pay-Earn',
        proof: 'Scan a QR, pay through any UPI app, and earn instant cashback to an in-app wallet — with a real-time social feed and chat.',
        metric: 'UPI',
        metricLabel: 'Scan · pay · earn',
    },
    ssc_ai: {
        client: 'SSC Ai · India',
        category: 'AI Exam Prep',
        proof: 'Gemini explains every question, an AI tutor generates papers and notes, and previous-year questions are extracted by a local Phi-4 LLM.',
        metric: 'AI',
        metricLabel: 'Gemini + local Phi-4',
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
    const sectionRef = useRef<HTMLElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const headerRef = useRef<HTMLElement>(null);

    // Per-project image stacks inside the floating panel (cross-faded).
    const imageStackRefs = useRef<(HTMLDivElement | null)[]>([]);
    // Per-row <li> elements so hover / auto-cycle can mutate their styling.
    const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
    // Inner reveal wrappers (one per row) used for the staggered scroll reveal,
    // kept off the <li> so the reveal never collides with hover emphasis.
    const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Cursor-follow lerp state.
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const seededRef = useRef(false);
    const rafRef = useRef(0);

    // Active row index (-1 = none). Held in a ref to avoid setState-in-effect.
    const activeRef = useRef(-1);
    // Defaults to true so SSR / first paint treats clicks as plain navigation.
    const hoverCapableRef = useRef(true);

    // Apply hover emphasis to every row and cross-fade the floating panel image.
    const applyActive = (next: number) => {
        if (activeRef.current === next) return;
        activeRef.current = next;

        rowRefs.current.forEach((row, i) => {
            if (!row) return;
            const isActive = i === next;
            const dimmed = next !== -1 && !isActive;
            row.style.opacity = dimmed ? '0.32' : '1';
            row.style.transform = isActive ? 'translateX(12px)' : 'translateX(0px)';
        });

        imageStackRefs.current.forEach((stack, i) => {
            if (!stack) return;
            stack.style.opacity = i === next ? '1' : '0';
            stack.style.transform = i === next ? 'scale(1)' : 'scale(1.05)';
        });

        const panel = panelRef.current;
        if (panel) panel.style.opacity = next === -1 ? '0' : '1';
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

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        // ---------------- TOUCH / NO-HOVER FALLBACK ----------------
        // No floating panel and no horizontal nudge. Gently auto-cycle which row
        // reads as "active" so the work is always surfaced; tap-to-expand (the
        // onClick below) reveals the inline screenshot strip.
        if (!hoverCapable) {
            const setEmphasis = (active: number) => {
                rowRefs.current.forEach((row, i) => {
                    if (!row) return;
                    row.style.opacity = i === active ? '1' : '0.42';
                });
            };
            setEmphasis(0);
            if (reduceMotion) return; // hold the first row, no cycling

            // Track which rows are actually on-screen — excluding the band
            // under the sticky navbar — so the cycle only ever highlights a
            // row the user can actually see, never one hidden behind the nav.
            const visible = new Set<number>();
            const io = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        const i = rowRefs.current.indexOf(entry.target as HTMLLIElement);
                        if (i === -1) continue;
                        if (entry.isIntersecting) visible.add(i);
                        else visible.delete(i);
                    }
                },
                { rootMargin: '-110px 0px -20% 0px', threshold: 0.3 },
            );
            rowRefs.current.forEach((row) => row && io.observe(row));

            let lastActive = 0;
            const id = window.setInterval(() => {
                if (!visible.size) return; // nothing visible — hold last state
                const sorted = [...visible].sort((a, b) => a - b);
                const next = sorted.find((i) => i > lastActive) ?? sorted[0];
                lastActive = next;
                setEmphasis(next);
            }, 2600);
            return () => {
                window.clearInterval(id);
                io.disconnect();
            };
        }

        // ---------------- DESKTOP / HOVER ----------------
        const section = sectionRef.current;
        const list = listRef.current;
        const panel = panelRef.current;
        if (!section || !list || !panel) return;

        const onMove = (e: MouseEvent) => {
            const sr = section.getBoundingClientRect();
            const lr = list.getBoundingClientRect();
            const panelW = panel.offsetWidth;
            const panelH = panel.offsetHeight;
            // Float the panel to the right of the cursor, clamped to the section
            // width and — crucially — to the LIST's vertical band, so the preview
            // never drifts up into the header or below the last row.
            const rawX = e.clientX - sr.left + 28;
            const maxX = Math.max(0, sr.width - panelW - 8);
            targetRef.current.x = Math.min(rawX, maxX);
            const minY = Math.max(8, lr.top - sr.top);
            const maxY = Math.max(minY, lr.bottom - sr.top - panelH - 8);
            targetRef.current.y = Math.min(
                Math.max(e.clientY - sr.top - panelH / 2, minY),
                maxY,
            );
        };

        const onLeave = () => {
            applyActive(-1);
            // Reset the lerp seed so the next entry snaps fresh instead of
            // sliding in from a stale position.
            seededRef.current = false;
        };

        const loop = () => {
            const t = targetRef.current;
            const c = currentRef.current;
            if (!seededRef.current && (t.x !== 0 || t.y !== 0)) {
                c.x = t.x;
                c.y = t.y;
                seededRef.current = true;
            }
            const k = reduceMotion ? 1 : 0.12;
            c.x += (t.x - c.x) * k;
            c.y += (t.y - c.y) * k;
            panel.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
            rafRef.current = requestAnimationFrame(loop);
        };

        list.addEventListener('mousemove', onMove);
        list.addEventListener('mouseleave', onLeave);
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            list.removeEventListener('mousemove', onMove);
            list.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const handleEnter = (i: number) => {
        if (!hoverCapableRef.current) return;
        applyActive(i);
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
            ref={sectionRef}
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
                            Selected Work — 2024 / 2025
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
                <ul ref={listRef} className="relative flex flex-col">
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
                                className="group/row relative transition-[opacity,transform] duration-500"
                                style={{
                                    transitionTimingFunction: EASE,
                                    willChange: 'opacity, transform',
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
                                        <div className="flex min-w-0 flex-1 flex-col gap-4">
                                            <div className="flex min-w-0 items-center gap-4">
                                                {/* Logo chip */}
                                                <span className="relative hidden h-11 w-11 shrink-0 overflow-hidden rounded-[12px] ring-1 ring-inset ring-white/[0.08] sm:block">
                                                    <Image
                                                        src={project.logo}
                                                        alt=""
                                                        fill
                                                        sizes="44px"
                                                        className="object-cover"
                                                    />
                                                </span>

                                                <h3 className="truncate font-black leading-[0.9] tracking-tighter text-white text-[2.25rem] sm:text-[2.75rem] md:text-[3.75rem]">
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

                                        {/* Tech (first 3) — desktop only */}
                                        <div className="hidden shrink-0 flex-col items-end gap-2 lg:flex">
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

            {/* ── Floating cursor-tracking preview panel (DESKTOP / HOVER) ──── */}
            <div
                ref={panelRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
                style={{
                    opacity: 0,
                    transition: `opacity 0.45s ${EASE}`,
                    willChange: 'transform, opacity',
                }}
            >
                <div className="relative h-[380px] w-[300px] overflow-hidden rounded-[24px] bg-[#1a1a1a] shadow-[0_30px_70px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-white/[0.08]">
                    {projects.map((project, idx) => {
                        const meta = META[project.id];
                        return (
                            <div
                                key={project.id}
                                ref={(el) => {
                                    imageStackRefs.current[idx] = el;
                                }}
                                className="absolute inset-0"
                                style={{
                                    opacity: 0,
                                    transform: 'scale(1.05)',
                                    transition: `opacity 0.5s ${EASE}, transform 0.7s ${EASE}`,
                                    willChange: 'opacity, transform',
                                }}
                            >
                                {/* Two screenshots side-by-side for a richer hero */}
                                <div className="flex h-full items-start justify-center gap-3 px-5 pt-2">
                                    {project.screenshotPaths.slice(0, 2).map((shot, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="relative aspect-[9/19] h-[300px] shrink-0 overflow-hidden rounded-[16px] bg-[#121212] ring-1 ring-inset ring-white/[0.08]"
                                        >
                                            <Image
                                                src={shot}
                                                alt=""
                                                fill
                                                sizes="150px"
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Caption with a real metric */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent px-5 pb-5 pt-14">
                                    <p className="text-[0.625rem] font-bold uppercase tracking-[0.22em] text-white/45">
                                        {meta?.client}
                                    </p>
                                    <div className="mt-1.5 flex items-baseline gap-2.5">
                                        <span className="font-black leading-none tracking-tighter text-white text-2xl">
                                            {meta?.metric}
                                        </span>
                                        <span className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-white/40">
                                            {meta?.metricLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
