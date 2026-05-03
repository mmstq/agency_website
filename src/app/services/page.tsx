import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '@/lib/data/services';
import GlassSurface from '@/components/GlassSurface';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Elite engineering services including Web Applications, AI Integration, and SaaS Development.',
};

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                {/* Header */}
                <div className="mb-24 space-y-6 max-w-3xl">
                    <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                        Capabilities
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95]">
                        Surgical engineering for a digital world.
                    </h1>
                    <p className="text-white/50 text-xl md:text-2xl font-medium">
                        We don&apos;t just build features; we build scalable digital assets designed to withstand the pressures of enterprise-grade traffic.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {services.map((service) => (
                        <div key={service.id} className="monolith-card group p-10 flex flex-col">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:bg-white/10">
                                <service.icon className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
                                {service.title}
                            </h2>
                            <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">
                                {service.description}
                            </p>
                            <ul className="space-y-3 mb-10">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-widest font-bold text-white/30">
                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact">
                                <GlassSurface width="100%" height={48} borderRadius={12} backgroundOpacity={0.1} distortionScale={-80} className="glass-surface--soft-hover" simplified>
                                    <div className="flex h-full w-full items-center justify-center gap-2 text-xs font-bold text-white uppercase tracking-widest">
                                        Inquire
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </GlassSurface>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Final CTA */}
                <div className="monolith-card p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/5 blur-[100px] -z-10" />
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8">
                        Need a custom technical strategy?
                    </h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto mb-12">
                        Beyond our core services, we provide architectural consulting for complex, high-stakes infrastructure transitions.
                    </p>
                    <Link href="/contact" className="inline-block">
                        <GlassSurface width={240} height={64} borderRadius={999} backgroundOpacity={0.9} distortionScale={-100} className="glass-surface--flush" simplified>
                            <div className="flex h-full w-full bg-white text-[#1a1c1c] rounded-full font-black text-lg items-center justify-center gap-3">
                                Start Discovery
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </GlassSurface>
                    </Link>
                </div>
            </div>
        </div>
    );
}
