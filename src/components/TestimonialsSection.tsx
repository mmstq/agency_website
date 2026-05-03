import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';
import GlassSurface from './GlassSurface';

export default function TestimonialsSection() {
    return (
        <section className="py-24 relative">
            <div className="w-full px-6 md:px-12">
                <div className="text-center mb-16">
                    <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                        Success Stories
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                        Trusted by industry-defining technical teams.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="monolith-card p-10 h-full flex flex-col"
                        >
                            <Quote className="w-10 h-10 text-white/10 mb-8" />
                            <p className="text-white/70 text-lg leading-relaxed mb-10 flex-grow italic">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>
                            <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-bold tracking-tight">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">
                                        {testimonial.role}, {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
