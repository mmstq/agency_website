'use client';

import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';
import ScrollReveal from './ScrollReveal';

export default function TestimonialsSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="w-full px-6 md:px-12 mb-16">
                <ScrollReveal>
                    <div className="text-center">
                        <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                            Success Stories
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                            Trusted by industry-defining leaders.
                        </h2>
                    </div>
                </ScrollReveal>
            </div>

            {/* Right-to-Left Marquee */}
            <div className="relative flex overflow-hidden marquee-container">
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#131313] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#131313] to-transparent z-10 pointer-events-none" />

                <div className="flex animate-testimonial-marquee whitespace-nowrap py-4">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-6 px-3">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={`${testimonial.employer_name}-${i}`}
                                    className="monolith-card group/card p-5 w-[85vw] md:w-[calc(40vw-2rem)] flex flex-row items-center gap-5 whitespace-normal shrink-0 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.01] hover:shadow-2xl hover:shadow-emerald-500/5"
                                >
                                    <div className="flex-1 min-w-0">
                                        <Quote className="w-5 h-5 text-white/10 mb-3 transition-colors group-hover/card:text-emerald-400/30" />
                                        <p className="text-white/80 group-hover/card:text-white text-[0.9rem] leading-relaxed mb-0 font-sans transition-colors line-clamp-3">
                                            &ldquo;{testimonial.text}&rdquo;
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0 border-l border-white/5 group-hover/card:border-white/10 transition-colors pl-5">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 transition-transform group-hover/card:scale-110">
                                            <Image
                                                src={testimonial.image_url}
                                                alt={testimonial.employer_name}
                                                fill
                                                className="object-cover grayscale transition-all duration-500 group-hover/card:grayscale-0"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-white font-bold tracking-tight text-base transition-colors group-hover/card:text-emerald-400">
                                                {testimonial.employer_name}
                                            </p>
                                            <p className="text-white/30 text-xs font-semibold uppercase tracking-widest transition-colors group-hover/card:text-white/50">
                                                {testimonial.company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes testimonial-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-testimonial-marquee {
                    animation: testimonial-marquee 40s linear infinite;
                }
                .marquee-container:hover .animate-testimonial-marquee {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
