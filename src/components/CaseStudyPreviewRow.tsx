'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '@/lib/data/case-studies';
import GlassSurface from './GlassSurface';

export default function CaseStudyPreviewRow() {
    return (
        <section id="case-studies" className="py-24 relative scroll-mt-24">
            <div className="w-full px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="max-w-2xl">
                        <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                            Selected Work
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                            Digital monoliths that drive measurable outcomes.
                        </h2>
                    </div>
                    <Link href="/portfolio">
                        <GlassSurface width="auto" height={48} borderRadius={999} backgroundOpacity={0.15} distortionScale={-90} className="glass-surface--soft-hover">
                            <div className="flex h-full items-center gap-2 px-6 text-sm font-bold text-white whitespace-nowrap">
                                View all projects
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </GlassSurface>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
                    {caseStudies.slice(0, 3).map((study) => (
                        <div 
                            key={study.id} 
                            className="group relative h-[520px] overflow-hidden rounded-[32px] border border-white/5 bg-[#1a1c1c] transition-all duration-500 hover:border-white/20 card-interactive cursor-none"
                        >
                            <Link href={study.href} className="block h-full w-full">
                                <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                                    
                                    {/* Auto-scrolling Screenshot Marquee */}
                                    <div className="absolute inset-0 flex items-center overflow-hidden opacity-40 group-hover:opacity-100 group-hover:grayscale-0 grayscale transition-all duration-1000">
                                        <div className="flex animate-project-marquee whitespace-nowrap py-12">
                                            {[...Array(2)].map((_, i) => (
                                                <div key={i} className="flex gap-6 px-3">
                                                    {study.screenshots.map((shot, sIdx) => (
                                                        <div key={sIdx} className="relative h-[380px] aspect-[9/19] shrink-0 rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
                                                            <Image
                                                                src={shot}
                                                                alt={`${study.title} ${sIdx}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Deep Content Shadow for Maximum Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20 flex flex-col justify-end p-8 md:p-10">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center gap-4">
                                                <h3 className="text-white text-2xl md:text-4xl font-black tracking-tighter leading-tight [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
                                                    {study.title}
                                                </h3>
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-black transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-400 shadow-xl">
                                                    <ArrowUpRight className="size-5" />
                                                </div>
                                            </div>

                                            <p className="text-white/90 text-sm md:text-lg font-medium leading-relaxed line-clamp-2 [text-shadow:_0_1px_8px_rgb(0_0_0_/_90%)] max-w-[90%]">
                                                {study.description}
                                            </p>

                                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div>
                                                        <p className="text-[0.6rem] uppercase tracking-widest font-black text-white/30 mb-0.5">
                                                            {study.metricLabel}
                                                        </p>
                                                        <p className="text-xl font-black text-white leading-none">
                                                            {study.metric}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                                    <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white/60">
                                                        {study.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes project-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-project-marquee {
                    animation: project-marquee 30s linear infinite;
                }
            `}</style>
        </section>
    );
}
