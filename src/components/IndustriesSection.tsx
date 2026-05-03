import React from 'react';
import { ShieldCheck, BarChart3, Globe2, Cpu, Database, Landmark } from 'lucide-react';
import GlassSurface from './GlassSurface';

const INDUSTRIES = [
    {
        title: 'FinTech',
        desc: 'High-frequency payment processing and secure digital ledger systems.',
        icon: Landmark,
        color: 'text-emerald-400',
    },
    {
        title: 'Enterprise AI',
        desc: 'Custom LLM orchestration and vector database infrastructure.',
        icon: Cpu,
        color: 'text-amber-400',
    },
    {
        title: 'Digital Health',
        desc: 'HIPAA-compliant platforms with real-time biometric synchronization.',
        icon: ShieldCheck,
        color: 'text-sky-400',
    },
    {
        title: 'Logistics',
        desc: 'Global supply chain optimization with multi-modal routing engines.',
        icon: Globe2,
        color: 'text-purple-400',
    },
    {
        title: 'SaaS Platforms',
        desc: 'End-to-end product builds for scale-ups and enterprise ventures.',
        icon: Database,
        color: 'text-pink-400',
    },
    {
        title: 'GovTech',
        desc: 'Modernizing citizen services with secure, cloud-native architectures.',
        icon: BarChart3,
        color: 'text-blue-400',
    },
];

export default function IndustriesSection() {
    return (
        <section id="industries" className="py-24 relative scroll-mt-24">
            <div className="w-full px-6 md:px-12">
                <div className="mb-16">
                    <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                        Market Expertise
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white max-w-2xl">
                        Deep technical authority across high-stakes industries.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INDUSTRIES.map((industry) => (
                        <div
                            key={industry.title}
                            className="monolith-card group p-8 h-full flex flex-col"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:bg-white/10 ${industry.color}`}>
                                <industry.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                {industry.title}
                            </h3>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {industry.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
