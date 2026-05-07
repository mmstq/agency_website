'use client';

import React from 'react';
import { Landmark, Cpu, ShieldCheck, Globe2, Database, BarChart3 } from 'lucide-react';
import GlassSurface from './GlassSurface';

const INDUSTRIES = [
    { name: 'FinTech', icon: Landmark },
    { name: 'Enterprise AI', icon: Cpu },
    { name: 'Digital Health', icon: ShieldCheck },
    { name: 'Logistics', icon: Globe2 },
    { name: 'SaaS Platforms', icon: Database },
    { name: 'GovTech', icon: BarChart3 },
];

export default function IndustriesTicker() {
    return (
        <section className="py-12 relative overflow-hidden">
            <div className="w-full px-6 md:px-12">
                <div className="flex flex-wrap justify-center gap-4">
                    {INDUSTRIES.map((industry) => (
                        <GlassSurface
                            key={industry.name}
                            width="auto"
                            height={48}
                            borderRadius={999}
                            backgroundOpacity={0.12}
                            saturation={1.4}
                            distortionScale={-80}
                            className="glass-surface--flush glass-surface--soft-hover"
                        >
                            <div className="flex h-full items-center gap-3 px-6">
                                <industry.icon className="w-4 h-4 text-white/60" />
                                <span className="text-[0.6875rem] uppercase tracking-[0.15em] font-bold text-white/80">
                                    {industry.name}
                                </span>
                            </div>
                        </GlassSurface>
                    ))}
                </div>
            </div>
        </section>
    );
}
