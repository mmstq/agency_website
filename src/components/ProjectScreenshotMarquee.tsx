'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ProjectScreenshotMarqueeProps {
    screenshots: (StaticImageData | string)[];
    title: string;
    height?: number | string;
    speed?: number;
    reverse?: boolean;
    className?: string;
    pauseOnHover?: boolean;
}

export default function ProjectScreenshotMarquee({
    screenshots,
    title,
    height = 500,
    speed = 40,
    reverse = false,
    className = "",
    pauseOnHover = true,
}: ProjectScreenshotMarqueeProps) {
    // Duplicate screenshots to ensure the marquee is always full and seamless
    // Reduced from 4 sets to 2 sets for performance
    const items = [...screenshots, ...screenshots];

    return (
        <div 
            className={`group relative w-full overflow-hidden py-8 ${className}`}
            style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            }}
        >
            <div 
                className={`flex w-fit whitespace-nowrap relative z-20 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
                style={{ 
                    animationDuration: `${speed}s`,
                } as React.CSSProperties}
            >
                {/* We render the set twice for the seamless loop trick */}
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-6 px-3">
                        {items.map((shot, sIdx) => (
                            <div 
                                key={`${i}-${sIdx}`} 
                                className="relative aspect-[9/19] shrink-0 rounded-[1.25rem] overflow-hidden border border-white/5 bg-[#121212] transition-all duration-700 hover:border-white/20 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                style={{ height: typeof height === 'number' ? `${height}px` : height }}
                            >
                                <Image 
                                    src={shot} 
                                    alt={`${title} screenshot ${sIdx}`}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Premium Glass Reflection Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-in-out" />
                                </div>
                                
                                {/* Subtle inner glow and border */}
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.25rem] pointer-events-none" />
                                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse linear infinite;
                }
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
                
                /* Optimize for performance */
                .animate-marquee, .animate-marquee-reverse {
                    will-change: transform;
                    backface-visibility: hidden;
                }
            `}</style>
        </div>
    );
}
