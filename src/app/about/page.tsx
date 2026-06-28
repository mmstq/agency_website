import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Target, Shield, Zap, Users } from 'lucide-react';
import ScrollReveal, { type ScrollRevealDelay } from '@/components/ScrollReveal';
import SplitText from '@/components/SplitText';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Modall, a high-end B2B infrastructure agency built on technical authority.',
};

const VALUES = [
    {
        title: 'Technical Authority',
        desc: 'We don&apos;t guess. Every line of code is an intentional architectural decision.',
        icon: Target,
    },
    {
        title: 'Design-Obsessed',
        desc: 'Utility without aesthetics is a failure. We build tools that users love to touch.',
        icon: Zap,
    },
    {
        title: 'Security-First',
        desc: 'In a world of leaks, we build digital monoliths that are hardened from day one.',
        icon: Shield,
    },
    {
        title: 'Collaborative Elite',
        desc: 'We operate as an extension of your high-performance engineering team.',
        icon: Users,
    },
];

const TEAM = [
    {
        name: 'Alex Rivier',
        role: 'Chief Architect',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop',
    },
    {
        name: 'Sarah Drasner',
        role: 'Head of Engineering',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop',
    },
    {
        name: 'Marcus Thorne',
        role: 'Director of Product',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop',
    },
];

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                {/* Hero */}
                <div className="mb-32 space-y-6 max-w-4xl">
                    <ScrollReveal>
                        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                            Our Mission
                        </p>
                    </ScrollReveal>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] perspective-1000">
                        <SplitText
                            text="Engineering permanence for the digital age."
                            delay={35}
                            duration={0.8}
                            splitType="words"
                            from={{ opacity: 0, y: 80, rotateX: -30 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            tag="span"
                        />
                    </h1>
                    <ScrollReveal delay="delay-100">
                        <p className="text-white/50 text-xl md:text-3xl font-medium leading-tight">
                            Modall was founded on a simple premise: B2B infrastructure should be as high-fidelity and performant as the world&apos;s best consumer experiences.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
                    <ScrollReveal variant="from-left">
                        <div className="monolith-card p-12 space-y-8">
                            <h2 className="text-3xl font-bold text-white tracking-tight perspective-1000">
                                <SplitText
                                    text="The Digital Monolith"
                                    delay={35}
                                    duration={0.8}
                                    splitType="words"
                                    from={{ opacity: 0, y: 40, rotateX: -20 }}
                                    to={{ opacity: 1, y: 0, rotateX: 0 }}
                                    tag="span"
                                />
                            </h2>
                            <p className="text-white/50 leading-relaxed text-lg">
                                We believe in building systems that stand the test of time. In an industry obsessed with temporary hacks and MVP-bloat, we choose surgical precision. Our &ldquo;Digital Monolith&rdquo; philosophy means building integrated, high-performance systems that consolidate technical debt rather than scattering it.
                            </p>
                            <p className="text-white/50 leading-relaxed text-lg">
                                Whether it&apos;s a global payment engine or an enterprise-grade AI integration, we treat every project as a piece of critical infrastructure.
                            </p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal variant="from-right">
                        <div className="relative aspect-square md:aspect-auto rounded-[32px] overflow-hidden h-full">
                            <Image 
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
                                alt="Modall Headquarters"
                                fill
                                className="object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay" />
                        </div>
                    </ScrollReveal>
                </div>

                {/* Values */}
                <div className="mb-32">
                    <div className="mb-16">
                        <ScrollReveal>
                            <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                                Principles
                            </p>
                        </ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white perspective-1000">
                            <SplitText
                                text="The code we live by."
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 60, rotateX: -25 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                tag="span"
                            />
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map((value, idx) => (
                            <ScrollReveal key={value.title} delay={`delay-${(idx + 1) * 100}` as ScrollRevealDelay}>
                                <div className="monolith-card p-8 space-y-6 h-full">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                                        <value.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">{value.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div>
                    <div className="mb-16">
                        <ScrollReveal>
                            <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                                Elite Engineering
                            </p>
                        </ScrollReveal>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white perspective-1000">
                            <SplitText
                                text="Meet the architects."
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 60, rotateX: -25 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                tag="span"
                            />
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TEAM.map((member, idx) => (
                            <ScrollReveal key={member.name} variant="zoom-in" delay={`delay-${(idx + 1) * 100}` as ScrollRevealDelay}>
                                <div className="group">
                                    <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden mb-6 monolith-card border-0">
                                        <Image 
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-6 left-6">
                                            <p className="text-white font-bold text-xl tracking-tight">{member.name}</p>
                                            <p className="text-white/40 text-sm font-bold uppercase tracking-widest">{member.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
