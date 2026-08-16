'use client';

import React from 'react';
import {
    ArrowRight,
    MousePointer2,
    Sparkles,
} from 'lucide-react';
import GlassSurface from './GlassSurface';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';

export default function HeroSection() {
    return (
        <section className="relative isolate overflow-visible px-4 pb-0 pt-16 md:px-8">
            <div className="pointer-events-none absolute left-1/2 -top-28 -z-10 h-[100vh] w-[120vw] -translate-x-1/2 [overflow:clip]">
                <div className="absolute left-1/2 top-0 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-emerald-300/18 blur-[140px]" />
                <div className="absolute left-[60%] top-8 h-[35vh] w-[30vw] rounded-full bg-amber-300/12 blur-[120px]" />
                <div className="absolute left-[25%] top-[25%] h-[28vh] w-[22vw] rounded-full bg-sky-400/10 blur-[110px]" />
            </div>

            <div className="flex items-center justify-center">
                <div className="relative z-10 w-full px-6 md:px-24 lg:px-48 flex flex-col items-center text-center">
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
                            <div className="inline-flex h-full items-center gap-2 whitespace-nowrap px-4 text-[0.56rem] font-bold uppercase tracking-[0.1em] text-white/70 sm:text-[0.68rem] sm:tracking-[0.18em]">
                                <Sparkles className="size-3.5 shrink-0 text-amber-200" aria-hidden="true" />
                                Premium web experiences for serious brands
                            </div>
                        </GlassSurface>
                    </ScrollReveal>

                    <h1 className="w-full text-center text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] perspective-1000">
                        <SplitText
                            text="Build a website that feels like your best sales call."
                            className="inline-block"
                            delay={35}
                            duration={0.8}
                            splitType="words"
                            from={{ opacity: 0, y: 100, rotateX: -30 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            tag="span"
                            threshold={0.1}
                            rootMargin="-50px"
                        />
                    </h1>

                    <ScrollReveal delay="delay-200">
                        <p className="mt-7 max-w-3xl text-center text-base leading-8 text-white/62 md:text-xl">
                            Falcons designs and ships high-performance React websites with sharp storytelling, elegant motion, and conversion systems clients can feel immediately.
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
                                    href="/services"
                                    className="inline-flex h-full w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-bold text-white transition duration-300 active:scale-[0.98]"
                                >
                                    <MousePointer2 className="size-4 text-sky-200" aria-hidden="true" />
                                    Explore services
                                </a>
                            </GlassSurface>
                        </div>
                    </ScrollReveal>

                </div>
            </div>
        </section>
    );
}
