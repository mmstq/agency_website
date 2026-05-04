import React from 'react';
import Image from 'next/image';
import { projects } from '@/lib/data/projects';
import ScrollReveal from '@/components/ScrollReveal';
import { ExternalLink, Smartphone } from 'lucide-react';

export default function PortfolioPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">
                {/* Hero */}
                <ScrollReveal>
                    <div className="mb-24 space-y-6 max-w-4xl">
                        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                            Our Work
                        </p>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95]">
                            Technical artifacts of human progress.
                        </h1>
                        <p className="text-white/50 text-xl md:text-3xl font-medium leading-tight">
                            A collection of high-performance mobile and web platforms built with surgical precision.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Projects Grid */}
                <div className="space-y-32">
                    {projects.map((project, idx) => (
                        <div key={project.id} id={project.id} className="scroll-mt-32">
                            <ScrollReveal variant={idx % 2 === 0 ? 'from-left' : 'from-right'}>
                                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`}>
                                    {/* Project Info */}
                                    <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-last' : ''} space-y-8`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 relative rounded-2xl overflow-hidden monolith-card border-white/10 p-2">
                                                <Image 
                                                    src={project.logo} 
                                                    alt={project.title} 
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <h2 className="text-4xl font-bold text-white tracking-tight">{project.title}</h2>
                                        </div>
                                        
                                        <p className="text-white/60 text-lg leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map(t => (
                                                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/40 font-bold">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-4">
                                            {project.link && (
                                                <a 
                                                    href={project.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
                                                >
                                                    Play Store <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                            {project.iosLink && (
                                                <a 
                                                    href={project.iosLink} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full font-bold text-sm hover:bg-white/20 transition-colors"
                                                >
                                                    App Store <Smartphone className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Screenshots Scroll */}
                                    <div className="lg:col-span-7 overflow-hidden">
                                        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                                            {project.screenshotPaths.map((shot, sIdx) => (
                                                <div key={sIdx} className="relative aspect-[9/19] h-[500px] shrink-0 rounded-[32px] overflow-hidden border border-white/10 monolith-card">
                                                    <Image 
                                                        src={shot} 
                                                        alt={`${project.title} screenshot ${sIdx}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
