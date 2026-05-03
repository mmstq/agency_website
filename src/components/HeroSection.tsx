'use client';

import React, { useState } from 'react';
import {
    ArrowRight,
    Check,
    Code2,
    Mail,
    MousePointer2,
    ShieldCheck,
    Sparkles,
    Star,
    Zap,
} from 'lucide-react';
import GlassSurface from './GlassSurface';
import ScrollReveal from './ScrollReveal';
import WordReveal from './WordReveal';


const craftSignals = [
    { icon: Code2, label: 'Next.js systems' },
    { icon: Zap, label: 'Motion-first UI' },
    { icon: ShieldCheck, label: 'SEO + accessibility' },
];

export default function HeroSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong.');
                return;
            }

            setSubmitted(true);
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative isolate overflow-visible px-2 pt-20 pb-12 md:px-4 md:pt-24 lg:pb-16">
            <div className="pointer-events-none absolute left-1/2 -top-28 -z-10 h-[100vh] w-[120vw] -translate-x-1/2 [overflow:clip]">
                <div className="absolute left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-emerald-300/18 blur-[140px]" />
                <div className="absolute left-[60%] top-8 h-[35vh] w-[30vw] rounded-full bg-amber-300/12 blur-[120px]" />
                <div className="absolute left-[25%] top-[25%] h-[28vh] w-[22vw] rounded-full bg-sky-400/10 blur-[110px]" />
            </div>

            <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center">
                <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center">
                    <ScrollReveal>
                        <GlassSurface
                            width="auto"
                            height={42}
                            borderRadius={999}
                            backgroundOpacity={0.16}
                            saturation={1.55}
                            distortionScale={-95}
                            className="mb-6 glass-surface--flush"
                        >
                            <div className="inline-flex h-full items-center gap-2 px-4 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/70">
                                <Sparkles className="size-3.5 text-amber-200" aria-hidden="true" />
                                Premium web experiences for serious brands
                            </div>
                        </GlassSurface>
                    </ScrollReveal>

                    <ScrollReveal variant="zoom-in" delay="delay-100">
                        <h1 className="w-full text-center text-5xl font-black leading-[0.95] tracking-normal text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]">
                            <WordReveal 
                                text="Build a website that feels like your best sales call." 
                                delay={600}
                                wordDelay={80}
                                staticWordsCount={2}
                            />
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay="delay-200">
                        <p className="mt-7 max-w-3xl text-center text-base leading-8 text-white/62 md:text-xl">
                            Modall designs and ships high-performance React websites with sharp storytelling, elegant motion, and conversion systems clients can feel immediately.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay="delay-300">
                        <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                            <GlassSurface
                                width="100%"
                                height={54}
                                borderRadius={999}
                                backgroundOpacity={0.22}
                                saturation={1.75}
                                distortionScale={-105}
                                className="glass-surface--flush glass-surface--soft-hover sm:w-[152px]"
                            >
                                <a
                                    href="#case-studies"
                                    className="group inline-flex h-full w-full items-center justify-center gap-2 rounded-full bg-white/90 px-6 text-sm font-extrabold text-[#151515] transition duration-300 hover:bg-emerald-100 active:scale-[0.98]"
                                >
                                    See the work
                                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                                </a>
                            </GlassSurface>
                            <GlassSurface
                                width="100%"
                                height={54}
                                borderRadius={999}
                                backgroundOpacity={0.16}
                                saturation={1.6}
                                distortionScale={-115}
                                className="glass-surface--flush glass-surface--soft-hover sm:w-[176px]"
                            >
                                <a
                                    href="#services"
                                    className="inline-flex h-full w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold text-white transition duration-300 active:scale-[0.98]"
                                >
                                    <MousePointer2 className="size-4 text-sky-200" aria-hidden="true" />
                                    Explore services
                                </a>
                            </GlassSurface>
                        </div>
                    </ScrollReveal>

                    <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <GlassSurface width="auto" height={38} borderRadius={999} backgroundOpacity={0.15} distortionScale={-90} className="glass-surface--flush">
                            <div className="flex h-full items-center gap-1.5 px-3">
                                <div className="flex gap-0.5 text-amber-300" aria-label="Five star rating">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star key={index} className="size-3.5 fill-current" aria-hidden="true" />
                                    ))}
                                </div>
                                <span className="text-xs font-semibold text-white/70">5.0 from launch partners</span>
                            </div>
                        </GlassSurface>

                        {craftSignals.map(({ icon: Icon, label }) => (
                            <GlassSurface key={label} width="auto" height={38} borderRadius={999} backgroundOpacity={0.15} distortionScale={-90} className="glass-surface--flush">
                                <div className="inline-flex h-full items-center gap-2 px-3 text-xs font-semibold text-white/64">
                                    <Icon className="size-3.5 text-emerald-200" aria-hidden="true" />
                                    {label}
                                </div>
                            </GlassSurface>
                        ))}
                    </div>

                    <div className="mt-8 w-full max-w-xl">
                        {submitted ? (
                            <GlassSurface width="100%" height={56} borderRadius={999} backgroundOpacity={0.16} saturation={1.5} distortionScale={-100} className="glass-surface--flush" simplified>
                                <div className="flex h-full items-center justify-center gap-3 px-6 text-sm font-semibold text-emerald-100">
                                    <Check className="size-5" aria-hidden="true" />
                                    You&apos;re on the list. We&apos;ll be in touch.
                                </div>
                            </GlassSurface>
                        ) : (
                            <GlassSurface width="100%" height={64} borderRadius={999} backgroundOpacity={0.16} saturation={1.6} distortionScale={-115} className="glass-surface--flush" simplified>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex h-full w-full items-center gap-2 rounded-full p-1.5"
                                    noValidate
                                >
                                    <label htmlFor="hero-email" className="sr-only">Email address</label>
                                    <div className="flex h-12 min-w-0 flex-1 items-center gap-3 px-4 text-white/54">
                                        <Mail className="size-4 shrink-0" aria-hidden="true" />
                                        <input
                                            id="hero-email"
                                            value={email}
                                            onChange={e => { setEmail(e.target.value); setError(''); }}
                                            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                                            placeholder="john@company.com"
                                            type="email"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#151515] transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                                        aria-label="Join newsletter"
                                    >
                                        {loading ? (
                                            <span className="size-4 animate-spin rounded-full border-2 border-[#151515]/25 border-t-[#151515]" />
                                        ) : (
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                        )}
                                    </button>
                                </form>
                            </GlassSurface>
                        )}
                        <div className="min-h-5 pt-2">
                            {error && <p className="text-center text-xs text-red-300">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
