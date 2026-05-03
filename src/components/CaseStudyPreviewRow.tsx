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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study) => (
                        <div key={study.id} className="group relative">
                            <Link href={study.href}>
                                <div className="monolith-card overflow-hidden">
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <Image
                                            src={study.image}
                                            alt={study.title}
                                            fill
                                            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-80" />
                                        
                                        <div className="absolute bottom-0 left-0 w-full p-8">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                                                    {study.category}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                                                {study.title}
                                            </h3>
                                            
                                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[0.6rem] uppercase tracking-widest font-bold text-white/40 mb-1">
                                                        {study.metricLabel}
                                                    </p>
                                                    <p className="text-xl font-black text-white">
                                                        {study.metric}
                                                    </p>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                                    <ArrowUpRight className="w-5 h-5 text-[#1a1c1c]" />
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
        </section>
    );
}
