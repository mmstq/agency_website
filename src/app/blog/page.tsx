import React from 'react';
import { Metadata } from 'next';
import GlassSurface from '@/components/GlassSurface';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Insights from the digital monolith. Engineering, design, and technical authority.',
};

export default function BlogPage() {
    return (
        <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center">
            <div className="w-full px-6 md:px-12 text-center max-w-4xl">
                <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30 mb-6">
                    Insights
                </p>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-12">
                    Coming Soon to the Monolith.
                </h1>
                <p className="text-white/50 text-xl md:text-3xl font-medium leading-tight max-w-2xl mx-auto mb-16">
                    Our team is currently documenting the architecture of human progress. Check back soon for deep-dives into engineering and design.
                </p>
                
                <div className="flex justify-center">
                    <GlassSurface width={280} height={64} borderRadius={16} backgroundOpacity={0.1} distortionScale={-80}>
                        <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                            Transmission Pending...
                        </div>
                    </GlassSurface>
                </div>
            </div>
        </div>
    );
}
