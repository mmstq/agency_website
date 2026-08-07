'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { FannedDeck } from './projectVisuals';

/* ─────────────────────────────────────────────────────────────────────────
   Shared building blocks for the /portfolio scroll variants.

   - SPOTLIGHT: per-project editorial copy (tagline, hero stat, proof points).
   - DetailLayout: the full detailed composition for one project + its visual
     (a fanned screenshot deck at the top on mobile, right column on desktop).
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
            'Exam prep powered by an AI tutor that builds personalized mock tests on the fly.',
        stat: { value: 'SSC CGL & GD', label: 'AI exam prep' },
        proof: [
            'AI-generated tests tailored to weak spots',
            'Sectional analytics + peer benchmarks',
            'Dark mode + offline test caching',
        ],
    },
};

const STORE_CTA =
    'inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-black tracking-tight text-[#1a1c1c] shadow-[0_2px_12px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-[#e2e2e2] active:scale-95';

function PlayStoreIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M3.609 1.814L13.793 12 3.61 22.186a2.37 2.37 0 0 1-.61-.735V2.55c.16-.3.38-.56.61-.735zm11.242 11.243l2.482-2.482-11.89-6.73 9.408 9.212zm0 1.886L5.443 24.155l11.89-6.73-2.482-2.482zm1.472-1.472l3.418-1.936c.934-.53.934-1.404 0-1.934l-3.418-1.936-2.07 2.07 2.07 2.07z" />
        </svg>
    );
}

function AppStoreIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.81 1.11-1.94.99-3.07-.96.04-2.12.64-2.8 1.44-.6.7-1.13 1.83-.99 2.93 1.07.08 2.14-.54 2.8-1.3" />
        </svg>
    );
}

export function DetailLayout({
    project,
    active,
    copyRef,
    phonesRef,
    fill = false,
}: {
    project: (typeof projects)[number];
    index?: number;
    active: boolean;
    copyRef?: (el: HTMLDivElement | null) => void;
    phonesRef?: (el: HTMLDivElement | null) => void;
    fill?: boolean;
}) {
    const meta = SPOTLIGHT[project.id];

    return (
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12 lg:gap-20 xl:gap-28 w-full">
            {/* ── Project visual — fanned screenshot deck (order-1 on mobile at top; order-2 on desktop on right) ── */}
            <div ref={phonesRef} className="order-1 md:order-2 flex justify-center md:justify-end w-full">
                <FannedDeck screenshots={project.screenshotPaths} active={active} fill={fill} />
            </div>

            {/* ── Copy column (order-2 on mobile underneath visual; order-1 on desktop on left) ── */}
            <div ref={copyRef} className="order-2 md:order-1 flex flex-col gap-3.5 sm:gap-6 md:gap-7 w-full max-w-2xl">
                <div className="flex items-center gap-4 sm:gap-7 md:gap-8">
                    <div
                        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-[12px] sm:h-14 sm:w-14 sm:rounded-[14px]"
                        style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)' }}
                    >
                        <Image src={project.logo} alt={`${project.title} logo`} fill className="object-cover" sizes="56px" />
                    </div>
                    <h2 className="text-2xl font-black leading-tight tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
                        {project.title}
                    </h2>
                </div>

                {meta && (
                    <p className="max-w-2xl text-sm font-medium leading-snug text-[#e2e2e2] sm:text-lg md:text-xl lg:text-2xl">
                        {meta.tagline}
                    </p>
                )}

                {meta && (
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3">
                        <span className="text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">{meta.stat.value}</span>
                        <span className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.12em] text-white/40">{meta.stat.label}</span>
                    </div>
                )}

                <p className="max-w-2xl text-xs leading-relaxed text-white/55 sm:text-base md:text-lg">{project.description}</p>

                {meta && (
                    <ul className="flex flex-col gap-2">
                        {meta.proof.map((point) => (
                            <li key={point} className="flex items-start gap-2.5 text-xs leading-snug text-white/55 sm:text-sm md:text-base">
                                <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                                {point}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tech.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-white/[0.04] px-3 py-1 text-[0.6rem] sm:px-3.5 sm:py-1.5 sm:text-[0.65rem] font-black uppercase tracking-[0.15em] text-white/40"
                            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1 pb-2 sm:pb-6">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on Google Play`}
                            className={STORE_CTA}
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
                            className={STORE_CTA}
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
        </div>
    );
}
