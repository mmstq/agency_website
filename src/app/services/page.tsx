import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '@/lib/data/services';
import GlassSurface from '@/components/GlassSurface';
import SplitText from '@/components/SplitText';
import WebApplicationsScene from '@/components/services/WebApplicationsScene';
import ServiceSculptureScene, { type ServiceSculptureVariant } from '@/components/services/ServiceSculptureScene';

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
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] perspective-1000">
                        <SplitText
                            text="Surgical engineering for a digital world."
                            delay={35}
                            duration={0.8}
                            splitType="words"
                            from={{ opacity: 0, y: 80, rotateX: -30 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            tag="span"
                        />
                    </h1>
                    <p className="text-white/50 text-xl md:text-2xl font-medium">
                        We don&apos;t just build features; we build scalable digital assets designed to withstand the pressures of enterprise-grade traffic.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-24">
                    {services.map((service) => (
                        <div key={service.id} id={service.slug} className="monolith-card group p-7 md:p-8 flex flex-col h-full scroll-mt-32">
                            {service.id === 'web-apps' ? (
                                <WebApplicationsScene />
                            ) : (
                                <ServiceSculptureScene variant={service.id as ServiceSculptureVariant} />
                            )}
                            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                {service.title}
                            </h2>
                            <p className="text-white/50 text-sm leading-relaxed mb-6">
                                {service.description}
                            </p>
                            <ul className="space-y-2.5 mb-7">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-[0.6875rem] uppercase tracking-widest font-bold text-white/30">
                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact" className="mt-auto">
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
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8 perspective-1000">
                        <SplitText
                            text="Need a custom technical strategy?"
                            delay={35}
                            duration={0.8}
                            splitType="words"
                            from={{ opacity: 0, y: 60, rotateX: -25 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            tag="span"
                        />
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
