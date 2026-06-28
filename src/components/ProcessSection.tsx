import React from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import SplitText from './SplitText';

const STEPS = [
    {
        title: 'Architectural Discovery',
        desc: 'Deep-dive into your technical constraints and business logic to map out the digital monolith.',
        icon: Search,
    },
    {
        title: 'High-Fidelity Design',
        desc: 'Editorial-grade UI/UX that prioritizes authority, motion, and conversion systems.',
        icon: PenTool,
    },
    {
        title: 'Elite Engineering',
        desc: 'Surgical implementation using Next.js, custom RAF animations, and scalable infrastructure.',
        icon: Code2,
    },
    {
        title: 'Orchestrated Launch',
        desc: 'Performance optimization, SEO hardening, and continuous delivery pipelines.',
        icon: Rocket,
    },
];

export default function ProcessSection() {
    return (
        <section id="process" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="w-full px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:sticky lg:top-32 lg:w-1/3">
                        <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                            How we build
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8 perspective-1000">
                            <SplitText
                                text="A ruthlessly efficient path to production."
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 60, rotateX: -25 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                tag="span"
                            />
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed mb-10">
                            We operate at the intersection of surgical engineering and premium design, stripping away the bloat to deliver pure technological value.
                        </p>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 gap-4">
                        {STEPS.map((step, index) => (
                            <div
                                key={step.title}
                                className="monolith-card group p-10 flex flex-col md:flex-row gap-8 items-start"
                            >
                                <div className="flex-shrink-0 flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                        <step.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <span className="text-2xl font-black text-white/10 italic">0{index + 1}</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-white/40 text-lg leading-relaxed max-w-xl">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
