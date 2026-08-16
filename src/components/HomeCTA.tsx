import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GlassSurface from './GlassSurface';
import SplitText from './SplitText';

export default function HomeCTA() {
    return (
        <section className="pt-20 pb-4 relative">
            <div className="w-full px-6 md:px-12">
                <GlassSurface
                    width="100%"
                    height="auto"
                    borderRadius={48}
                    backgroundOpacity={0.15}
                    saturation={1.6}
                    distortionScale={-110}
                    className="overflow-hidden cta-card"
                    simplified
                >
                    <div className="relative p-12 md:p-24 flex flex-col items-center text-center">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-emerald-500/10 blur-[120px] -z-10" />

                        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/40 mb-8">
                            Ready to scale?
                        </p>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-10 max-w-4xl leading-[0.95] perspective-1000">
                            <SplitText
                                text="Let's build your digital monolith."
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 80, rotateX: -30 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                tag="span"
                            />
                        </h2>
                        <p className="text-white/50 text-xl md:text-2xl max-w-2xl mb-12 font-medium">
                            Join the ranks of high-performance technical teams who trust Falcons for their critical infrastructure.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto items-center justify-center">
                            <Link href="/contact" className="w-full sm:w-auto flex justify-center">
                                <GlassSurface width="100%" height={56} borderRadius={999} backgroundOpacity={0.9} distortionScale={-100} className="glass-surface--flush w-full max-w-[280px] sm:w-[220px] sm:h-[64px]">
                                    <div className="flex h-full w-full bg-white text-[#1a1c1c] rounded-full font-black text-base sm:text-lg items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95 px-6 py-3">
                                        Start a Project
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </GlassSurface>
                            </Link>
                            
                            <Link href="/portfolio" className="w-full sm:w-auto flex justify-center">
                                <GlassSurface width="100%" height={56} borderRadius={999} backgroundOpacity={0.15} distortionScale={-100} className="glass-surface--flush w-full max-w-[280px] sm:w-[220px] sm:h-[64px]">
                                    <div className="flex h-full w-full text-white border border-white/10 rounded-full font-bold text-base sm:text-lg items-center justify-center gap-3 hover:bg-white/5 transition-all px-6 py-3">
                                        View Portfolio
                                    </div>
                                </GlassSurface>
                            </Link>
                        </div>
                    </div>
                </GlassSurface>
            </div>
        </section>
    );
}
