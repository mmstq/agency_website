'use client';

import React from 'react';

const LOGOS = [
    { name: 'Vercel', path: 'M24 22.525H0l12-21.05 12 21.05z' }, // Simplified Triangle
    { name: 'Next.js', path: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z' }, // Simplified Circle
    { name: 'Stripe', path: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h4v-2h-4v-2h4v-2h-4v-2h4v-2h-6v12h2v-2z' },
    { name: 'Netlify', path: 'M12 0l-12 12 12 12 12-12-12-12zm0 4.5l7.5 7.5-7.5 7.5-7.5-7.5 7.5-7.5z' },
    { name: 'Supabase', path: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18l-5-5h3v-4l5 5h-3v4z' },
];

export default function LogoMarquee() {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#131313] via-transparent to-[#131313] z-10 pointer-events-none" />
            
            <p className="text-center text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-12">
                Engineering infrastructure for industry leaders
            </p>

            <div className="flex overflow-hidden">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 md:gap-24 px-8 md:px-12 shrink-0">
                            {LOGOS.map((logo) => (
                                <div key={logo.name} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 fill-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d={logo.path} />
                                    </svg>
                                    <span className="text-xl font-bold tracking-tighter text-white">{logo.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    will-change: transform;
                }
            `}</style>
        </section>
    );
}
