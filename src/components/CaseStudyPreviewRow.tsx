'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies, CaseStudy } from '@/lib/data/case-studies';
import ProjectScreenshotMarquee from './ProjectScreenshotMarquee';
import GlassSurface from './GlassSurface';

interface VaultCardProps {
    study: CaseStudy;
    height: number;
    featured?: boolean;
    showStatHero?: boolean;
    staggerDelay: number;
    cardNum: number;
}

function VaultCard({ study, height, featured = false, showStatHero = false, staggerDelay, cardNum }: VaultCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const statRef = useRef<HTMLSpanElement>(null);
    const targetYRef = useRef(0);
    const currentYRef = useRef(0);
    const parallaxRafRef = useRef(0);
    const counterRafRef = useRef(0);

    // Counter animation for numeric metrics (e.g. "10K+")
    const runCounter = useCallback(() => {
        const el = statRef.current;
        if (!el) return;
        const raw = study.metric;
        const match = raw.match(/^(\d+)/);
        if (!match) return;
        const target = parseInt(match[1]);
        const suffix = raw.slice(match[1].length);
        const duration = 1600;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(2, -10 * p); // easeOutExpo
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) counterRafRef.current = requestAnimationFrame(tick);
        };
        counterRafRef.current = requestAnimationFrame(tick);
    }, [study.metric]);

    // Staggered entrance via IntersectionObserver + direct DOM mutation
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0px) scale(var(--vault-scale, 1))';
                }, staggerDelay);
                runCounter();
                obs.disconnect();
            }
        }, { threshold: 0.08 });
        obs.observe(el);
        return () => obs.disconnect();
    }, [staggerDelay, runCounter]);

    // Smooth mouse-parallax on screenshot layer via RAF lerp
    useEffect(() => {
        const card = cardRef.current;
        const wrapper = marqueeRef.current;
        if (!card || !wrapper) return;

        let isVisible = false;
        let isHovered = false;

        const obs = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        }, { threshold: 0.01 });
        obs.observe(card);

        const onMove = (e: MouseEvent) => {
            const r = card.getBoundingClientRect();
            targetYRef.current = ((e.clientY - r.top) / r.height - 0.5) * -20;
        };
        const onEnter = () => { isHovered = true; };
        const onLeave = () => { isHovered = false; targetYRef.current = 0; };

        const loop = () => {
            if (isVisible) {
                const diff = targetYRef.current - currentYRef.current;
                if (Math.abs(diff) > 0.01 || isHovered) {
                    currentYRef.current += diff * 0.07;
                    wrapper.style.transform = `translateY(${currentYRef.current.toFixed(2)}px)`;
                }
            }
            parallaxRafRef.current = requestAnimationFrame(loop);
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
        parallaxRafRef.current = requestAnimationFrame(loop);

        return () => {
            card.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseenter', onEnter);
            card.removeEventListener('mouseleave', onLeave);
            obs.disconnect();
            cancelAnimationFrame(parallaxRafRef.current);
            cancelAnimationFrame(counterRafRef.current);
        };
    }, []);

    return (
        <Link href={study.href} className="block">
            <div
                ref={cardRef}
                className="relative rounded-[16px] overflow-hidden border border-white/[0.07] bg-[#1a1a1a] group hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:[--vault-scale:1.015]"
                style={{
                    height: `${height}px`,
                    opacity: 0,
                    transform: 'translateY(56px) scale(var(--vault-scale, 1))',
                    transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, box-shadow 0.4s ease',
                    willChange: 'opacity, transform, border-color',
                }}
            >
                {/* Ghost project number */}
                <span
                    className="absolute top-5 left-6 font-black text-white/[0.035] leading-none select-none z-0"
                    style={{ fontSize: featured ? '7rem' : '4.5rem' }}
                >
                    {String(cardNum).padStart(2, '0')}
                </span>

                {/* Tech pill — floating glass */}
                <div className="absolute top-5 right-5 z-30 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.08]">
                    <span className="text-[0.6rem] font-black uppercase tracking-[0.18em] text-white/40">{study.category}</span>
                </div>

                {/* Screenshot layer with parallax */}
                <div
                    ref={marqueeRef}
                    className={`absolute inset-0 will-change-transform transition-[filter,opacity] duration-700 ${
                        featured
                            ? 'opacity-65 group-hover:opacity-100'
                            : 'opacity-40 group-hover:opacity-85'
                    }`}
                >
                    {showStatHero ? (
                        // Card uses giant stat as the hero visual — no screenshots
                        <div className="flex items-center justify-center h-full">
                            <span className="font-black text-white/[0.06] leading-none select-none" style={{ fontSize: 'clamp(5rem,15vw,10rem)' }}>
                                {study.metric}
                            </span>
                        </div>
                    ) : (
                        <ProjectScreenshotMarquee
                            screenshots={study.screenshots}
                            title={study.title}
                            height={height - 170}
                            speed={38}
                            reverse={cardNum % 2 === 0}
                            className="py-6"
                        />
                    )}
                </div>

                {/* Scan line — RAF-driven via inline style, only on featured */}
                {featured && (
                    <ScanLine />
                )}

                {/* Gradient + info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent z-20 flex flex-col justify-end p-6 md:p-8">
                    <div className="flex justify-between items-end gap-4">
                        <div className="flex-1 min-w-0">
                            <h3
                                className="font-black tracking-tighter text-white leading-tight"
                                style={{ fontSize: featured ? '2.4rem' : '1.4rem' }}
                            >
                                {study.title}
                            </h3>
                            {featured && (
                                <p className="text-white/50 text-sm leading-relaxed mt-2 line-clamp-2 max-w-xs">{study.description}</p>
                            )}
                            <div className="flex items-baseline gap-2 mt-3">
                                <span
                                    className="font-black text-white leading-none"
                                    style={{ fontSize: featured ? '2rem' : '1.25rem' }}
                                >
                                    <span ref={statRef}>{study.metric}</span>
                                </span>
                                <span className="text-[0.6rem] uppercase tracking-widest text-white/30">{study.metricLabel}</span>
                            </div>
                        </div>
                        <div
                            className={`flex shrink-0 items-center justify-center rounded-full bg-white text-black group-hover:bg-emerald-400 transition-all duration-500 shadow-xl ${
                                featured ? 'size-12' : 'size-9'
                            }`}
                        >
                            <ArrowUpRight className={featured ? 'size-5' : 'size-4'} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// Scan line driven by requestAnimationFrame — no CSS keyframes
function ScanLine() {
    const lineRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(-2);
    const visibleRef = useRef(false);

    useEffect(() => {
        const el = lineRef.current?.parentElement?.parentElement;
        if (!el) return;

        let rafId: number;
        const onEnter = () => { 
            visibleRef.current = true; 
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(loop);
        };
        const onLeave = () => { 
            visibleRef.current = false; 
            posRef.current = -2; 
            if (lineRef.current) lineRef.current.style.opacity = '0';
            cancelAnimationFrame(rafId);
        };
        
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);

        const loop = () => {
            if (visibleRef.current && lineRef.current) {
                posRef.current += 0.35;
                if (posRef.current > 102) posRef.current = -2;
                lineRef.current.style.top = `${posRef.current}%`;
                lineRef.current.style.opacity = '1';
                rafId = requestAnimationFrame(loop);
            }
        };

        return () => {
            el.removeEventListener('mouseenter', onEnter);
            el.removeEventListener('mouseleave', onLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            <div
                ref={lineRef}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{ top: '-2%', opacity: 0, transition: 'opacity 0.3s' }}
            />
        </div>
    );
}

// Column-first layout: [Marhaba, Counsellor] | [Koor, Spotted] | [MoverMate, SSC AI]
const COLUMNS = [
    [
        { idx: 0, height: 660, featured: true,  showStatHero: false, staggerDelay: 0,   cardNum: 1 },
        { idx: 3, height: 430, featured: false, showStatHero: false, staggerDelay: 300, cardNum: 4 },
    ],
    [
        { idx: 1, height: 430, featured: false, showStatHero: true,  staggerDelay: 80,  cardNum: 2 },
        { idx: 4, height: 610, featured: false, showStatHero: false, staggerDelay: 380, cardNum: 5 },
    ],
    [
        { idx: 2, height: 540, featured: false, showStatHero: false, staggerDelay: 160, cardNum: 3 },
        { idx: 5, height: 360, featured: false, showStatHero: false, staggerDelay: 460, cardNum: 6 },
    ],
];

export default function CaseStudyPreviewRow() {
    const cs = caseStudies;

    return (
        <section id="case-studies" className="py-24 relative scroll-mt-24 cursor-auto">
            <div className="w-full px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                            Selected Work
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                            Digital monoliths that drive measurable outcomes.
                        </h2>
                    </div>
                    <Link href="/portfolio" className="group shrink-0">
                        <GlassSurface
                            width="auto"
                            height={48}
                            borderRadius={999}
                            backgroundOpacity={0.20}
                            distortionScale={-95}
                            className="glass-surface--flush glass-surface--soft-hover"
                            simplified={true}
                        >
                            <div className="flex h-full items-center justify-center gap-2.5 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#1a1c1c] shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-[#e2e2e2] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] active:scale-95 whitespace-nowrap">
                                <span>View all projects</span>
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                            </div>
                        </GlassSurface>
                    </Link>
                </div>

                {/* Vault Grid — 3 columns, asymmetric heights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {COLUMNS.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-5">
                            {col.map((cfg) => (
                                <VaultCard
                                    key={cfg.idx}
                                    study={cs[cfg.idx]}
                                    height={cfg.height}
                                    featured={cfg.featured}
                                    showStatHero={cfg.showStatHero}
                                    staggerDelay={cfg.staggerDelay}
                                    cardNum={cfg.cardNum}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
