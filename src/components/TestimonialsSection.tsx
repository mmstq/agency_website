'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Quote, MapPin } from 'lucide-react';
import { testimonials } from '@/lib/data/testimonials';
import ScrollReveal from './ScrollReveal';
import SplitText from './SplitText';

const VISIBLE_CHARS = 130;
const CHARS_PER_TICK = 3;
const TICK_MS = 18;

function getVisibleText(text: string): string {
    if (text.length <= VISIBLE_CHARS) return text;
    const sliced = text.slice(0, VISIBLE_CHARS);
    const lastSpace = sliced.lastIndexOf(' ');
    return lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;
}

interface TestimonialCardProps {
    testimonial: typeof testimonials[0];
    isHovered: boolean;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}

function TestimonialCard({ testimonial, isHovered, onHoverStart, onHoverEnd }: TestimonialCardProps) {
    const [revealedChars, setRevealedChars] = useState(0);

    const visibleText = getVisibleText(testimonial.text);
    const hasMore = testimonial.text.length > visibleText.length;
    const remainingText = testimonial.text.slice(visibleText.length);
    const isTypingComplete = revealedChars >= remainingText.length;

    useEffect(() => {
        if (!isHovered || !hasMore) return;

        // revealedChars is 0 on entry (this effect's cleanup resets it on the
        // previous hover-end), so the type-on animation always starts empty. The
        // counter lives in a local, so the only state writes are async (the
        // interval tick) or in cleanup — never synchronously in the effect body.
        let count = 0;
        const id = setInterval(() => {
            count = Math.min(count + CHARS_PER_TICK, remainingText.length);
            setRevealedChars(count);
            if (count >= remainingText.length) clearInterval(id);
        }, TICK_MS);

        return () => {
            clearInterval(id);
            setRevealedChars(0);
        };
    }, [isHovered, hasMore, remainingText.length]);

    const typedRemaining = isHovered ? remainingText.slice(0, revealedChars) : '';
    const isTyping = isHovered && !isTypingComplete;

    return (
        <div
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            style={{
                zIndex: isHovered ? 20 : 0,
                transition: [
                    'background-color 0.3s ease',
                    'border-color 0.3s ease',
                    'box-shadow 0.4s ease',
                ].join(', '),
            }}
            className={`monolith-card group/card p-6 w-[85vw] md:w-[calc(45vw-2rem)] flex flex-col md:flex-row items-start gap-4 md:gap-6 whitespace-normal shrink-0 relative
                ${isHovered ? 'bg-white/[0.08] border-white/20 shadow-2xl shadow-emerald-500/5' : ''}`}
        >
            <Quote className={`absolute top-6 right-6 w-8 h-8 transition-all duration-500 ${isHovered ? 'text-emerald-400/20 rotate-12' : 'text-white/[0.03]'}`} />

            {/* Left: identity */}
            <div className={`flex w-full items-start gap-4 shrink-0 border-b md:w-auto md:border-b-0 md:border-r transition-colors duration-300 pb-4 md:pb-0 md:pr-6 ${isHovered ? 'border-white/10' : 'border-white/5'}`}>
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image
                        src={testimonial.image_url}
                        alt={testimonial.employer_name}
                        fill
                        className={`object-cover transition-all duration-500 ${isHovered ? 'grayscale-0' : 'grayscale'}`}
                    />
                </div>
                <div className="min-w-0">
                    <p className={`font-bold tracking-tight text-lg leading-tight transition-colors duration-300 ${isHovered ? 'text-emerald-400' : 'text-white'}`}>
                        {testimonial.company}
                    </p>
                    <div className="flex flex-col mt-1.5 gap-1">
                        <div className="flex items-center gap-1.5 text-emerald-500/80">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <p className="text-white/80 text-[0.75rem] font-medium tracking-tight">
                                {testimonial.location}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: text */}
            <div className="flex-1 min-w-0">
                <p className={`text-lg md:text-xl leading-relaxed font-sans font-medium tracking-tight transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/90'}`}>
                    {visibleText}
                    {!isHovered && hasMore && (
                        <span className="text-white/40"> ...</span>
                    )}
                    {isHovered && (
                        <span>
                            {typedRemaining}
                            {isTyping && <span className="typing-cursor">|</span>}
                        </span>
                    )}
                </p>
            </div>

            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .typing-cursor {
                    animation: blink 0.6s step-end infinite;
                    color: #34d399;
                    font-weight: 300;
                    margin-left: 1px;
                }
            `}</style>
        </div>
    );
}

export default function TestimonialsSection() {
    const [hoveredKey, setHoveredKey] = useState<string | null>(null);

    const handleHoverStart = useCallback((key: string) => setHoveredKey(key), []);
    const handleHoverEnd = useCallback(() => setHoveredKey(null), []);

    return (
        <section id="testimonials" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="w-full px-6 md:px-12 mb-16">
                <div className="text-center">
                    <ScrollReveal>
                        <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                            Success Stories
                        </p>
                    </ScrollReveal>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white perspective-1000">
                        <SplitText
                            text="Trusted by industry-defining leaders."
                            delay={35}
                            duration={0.8}
                            splitType="words"
                            from={{ opacity: 0, y: 60, rotateX: -25 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            tag="span"
                        />
                    </h2>
                </div>
            </div>

            {/* Right-to-Left Marquee */}
            <div className="relative flex overflow-x-hidden marquee-container" style={{ overflowY: 'visible' }}>
                <div className="flex animate-testimonial-marquee whitespace-nowrap py-12">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-6 px-3">
                            {testimonials.map((testimonial, tIdx) => {
                                const key = `${i}-${tIdx}`;
                                return (
                                    <TestimonialCard
                                        key={key}
                                        testimonial={testimonial}
                                        isHovered={hoveredKey === key}
                                        onHoverStart={() => handleHoverStart(key)}
                                        onHoverEnd={handleHoverEnd}
                                    />
                                );
                            })}
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
