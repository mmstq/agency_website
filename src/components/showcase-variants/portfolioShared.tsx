'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { FannedDeck } from './projectVisuals';

/* ─────────────────────────────────────────────────────────────────────────
   Shared building blocks for the /portfolio scroll variants.

   - SPOTLIGHT: per-project editorial copy (tagline, hero stat, proof points).
   - DetailLayout: the full detailed composition for one project + its visual
     (a fanned screenshot deck — see projectVisuals.tsx).
   ───────────────────────────────────────────────────────────────────────── */

export type Spotlight = {
    tagline: string;
    stat: { value: string; label: string };
    proof: [string, string, string];
};

export const SPOTLIGHT: Record<string, Spotlight> = {
    marhaba: {
        tagline:
            "Dubai's #1 auction company — a live, real-time bidding floor with payments and shipping under one roof.",
        stat: { value: 'Dubai', label: 'Enterprise auction house' },
        proof: [
            'WebSocket live bidding, settled in real time',
            'Payment gateway + in-app wallet',
            'Full vehicle lifecycle — sell, pay, ship',
        ],
    },
    koor: {
        tagline:
            '10,000+ downloads in the first month — on zero marketing spend, holding a 4.5★ rating.',
        stat: { value: '10K+', label: 'Installs, month one · zero ad spend' },
        proof: [
            'Offline-first, built for low-connectivity Gulf markets',
            'Multilingual localization + deep linking',
            'AI-moderated listings & nearby search',
        ],
    },
    movermate: {
        tagline:
            'Logistics that take payment on the doorstep — Stripe Tap-to-Pay, live tracking and turn-by-turn nav in one crew app.',
        stat: { value: 'Tap-to-Pay', label: 'Stripe, in the field' },
        proof: [
            'Stripe Tap-to-Pay, no extra hardware',
            'Radar navigation + geofencing',
            'In-app messaging & scheduling calendar',
        ],
    },
    counsellor_app: {
        tagline:
            'A field-sales CRM that turns every call into tracked, assignable pipeline — recordings included.',
        stat: { value: 'CRM', label: 'Field sales, end to end' },
        proof: [
            'Lead & task management with assignment',
            'Native dialer + call logs & recording',
            'Real-time sync to the SwiftAMS dashboard',
        ],
    },
    spotted: {
        tagline:
            'Scan a QR, pay with any UPI app, and earn instant cashback to an in-app wallet.',
        stat: { value: 'Scan · Pay · Earn', label: 'UPI cashback in one tap' },
        proof: [
            'Works with Google Pay, PhonePe, Paytm & more',
            'Instant cashback to an in-app wallet',
            'Social feed + real-time chat (Riverpod)',
        ],
    },
    ssc_ai: {
        tagline:
            'AI exam prep with a Gemini explanation behind every question — and past papers parsed by a local Phi-4 model.',
        stat: { value: 'Gemini', label: 'Explanations on every answer' },
        proof: [
            'Gemini-generated solutions, question by question',
            'AI chat that drafts questions + curated notes',
            'Past papers extracted via a local Phi-4 LLM',
        ],
    },
};

const PlayStoreIcon = () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
        src="https://img.icons8.com/?size=100&id=sDtU582wAEWd&format=png&color=000000"
        alt=""
        aria-hidden="true"
        className="h-4 w-4 object-contain"
    />
);

const AppStoreIcon = () => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
        src="https://img.icons8.com/?size=100&id=2u9oG2V1ZieN&format=png&color=000000"
        alt=""
        aria-hidden="true"
        className="h-4 w-4 object-contain"
    />
);

/**
 * DetailLayout — the full detailed composition for one project. `active`
 * controls whether the visual (the fanned screenshot deck) cycles.
 */
export function DetailLayout({
    project,
    index,
    active,
    copyRef,
    phonesRef,
    fill = false,
}: {
    project: (typeof projects)[number];
    index: number;
    active: boolean;
    // Optional refs so the parent stacking-scroll can apply subtle internal
    // parallax (translateY) to these two columns as the card recedes.
    copyRef?: (el: HTMLDivElement | null) => void;
    phonesRef?: (el: HTMLDivElement | null) => void;
    // Single-project mode: size the deck by viewport HEIGHT so the whole view
    // fits one screen with no scroll. Default (stacking scroll) keeps the
    // width-driven deck — each card there is its own full-height pane.
    fill?: boolean;
}) {
    const meta = SPOTLIGHT[project.id];

    return (
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-10 lg:gap-16">
            {/* ── Copy column ─────────────────────────────────────── */}
            <div ref={copyRef} className="order-2 flex flex-col gap-7 md:order-1">
                <div className="flex items-center gap-4">
                    <div
                        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[14px] bg-[#1f1f1f]"
                        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
                    >
                        <Image src={project.logo} alt={`${project.title} logo`} fill className="object-contain p-1.5" sizes="48px" />
                    </div>
                    <span className="text-sm font-black tabular-nums tracking-tight text-white/25">
                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                </div>

                <div>
                    <h2 className="text-4xl font-black leading-[0.95] tracking-tighter text-white md:text-5xl lg:text-6xl">
                        {project.title}
                    </h2>
                    {meta && (
                        <p className="mt-5 max-w-md text-lg font-medium leading-snug text-[#e2e2e2] md:text-xl">
                            {meta.tagline}
                        </p>
                    )}
                </div>

                {meta && (
                    <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-black tracking-tight text-white md:text-3xl">{meta.stat.value}</span>
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">{meta.stat.label}</span>
                    </div>
                )}

                <p className="max-w-xl text-base leading-relaxed text-white/55">{project.description}</p>

                {meta && (
                    <ul className="flex flex-col gap-2.5">
                        {meta.proof.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-sm leading-snug text-white/55">
                                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-white/40" />
                                {point}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/[0.04] px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.15em] text-white/40"
                            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on Google Play`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition-opacity duration-300 hover:opacity-90"
                        >
                            <PlayStoreIcon />
                            Play Store
                        </a>
                    )}
                    {project.iosLink && (
                        <a
                            href={project.iosLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on the App Store`}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition-opacity duration-300 hover:opacity-90"
                        >
                            <AppStoreIcon />
                            App Store
                        </a>
                    )}
                    {project.webLink && (
                        <a
                            href={project.webLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} website`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-white/80 transition-colors duration-300 hover:bg-white/[0.09] hover:text-white"
                            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
                        >
                            Website
                            <ArrowUpRight className="h-3 w-3" />
                        </a>
                    )}
                </div>
            </div>

            {/* ── Project visual — fanned screenshot deck ─────────── */}
            <div ref={phonesRef} className="order-1 md:order-2">
                <FannedDeck screenshots={project.screenshotPaths} active={active} fill={fill} />
            </div>
        </div>
    );
}
