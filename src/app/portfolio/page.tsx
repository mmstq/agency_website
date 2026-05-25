import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { caseStudies } from '@/lib/data/case-studies';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectScreenshotMarquee from '@/components/ProjectScreenshotMarquee';
import SplitText from '@/components/SplitText';

// Merge project + case-study data for stats
function getStudyMeta(id: string) {
    return caseStudies.find(c => c.id === id);
}

const PlayStoreArrow = () => (
    <svg fill="currentColor" viewBox="0 0 64 64" className="w-4 h-4 opacity-60 group-hover/btn:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg">
        <path d="M 40 10 C 38.896 10 38 10.896 38 12 C 38 13.104 38.896 14 40 14 L 47.171875 14 L 30.585938 30.585938 C 29.804938 31.366938 29.804938 32.633063 30.585938 33.414062 C 30.976938 33.805063 31.488 34 32 34 C 32.512 34 33.023063 33.805062 33.414062 33.414062 L 50 16.828125 L 50 24 C 50 25.104 50.896 26 52 26 C 53.104 26 54 25.104 54 24 L 54 12 C 54 10.896 53.104 10 52 10 L 40 10 z M 18 12 C 14.691 12 12 14.691 12 18 L 12 46 C 12 49.309 14.691 52 18 52 L 46 52 C 49.309 52 52 49.309 52 46 L 52 34 C 52 32.896 51.104 32 50 32 C 48.896 32 48 32.896 48 34 L 48 46 C 48 47.103 47.103 48 46 48 L 18 48 C 16.897 48 16 47.103 16 46 L 16 18 C 16 16.897 16.897 16 18 16 L 30 16 C 31.104 16 32 15.104 32 14 C 32 12.896 31.104 12 30 12 L 18 12 z" />
    </svg>
);

export default function PortfolioPage() {
    return (
        <div className="pt-32 pb-24">
            <div className="w-full px-6 md:px-12">

                {/* ── Hero ─────────────────────────────────────────────── */}
                <div className="mb-24 space-y-6 max-w-4xl">
                    <ScrollReveal>
                        <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-bold text-white/30">
                            Our Work
                        </p>
                    </ScrollReveal>
                    
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] perspective-1000">
                        <SplitText 
                            text="Technical artifacts of human progress."
                            delay={35}
                            duration={0.8}
                            splitType="words"
                            from={{ opacity: 0, y: 80, rotateX: -30 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            tag="span"
                        />
                    </h1>

                    <ScrollReveal delay="delay-200">
                        <p className="text-white/50 text-xl md:text-3xl font-medium leading-tight">
                            A collection of high-performance mobile and web platforms built with surgical precision.
                        </p>
                    </ScrollReveal>
                </div>

                {/* ── Editorial Rows ────────────────────────────────────── */}
                <div className="flex flex-col">
                    {projects.map((project, idx) => {
                        const isEven = idx % 2 === 0;
                        const meta = getStudyMeta(project.id);

                        return (
                            <ScrollReveal 
                                key={project.id} 
                                variant={isEven ? 'from-left' : 'from-right'}
                                threshold={0.1}
                            >
                                <div
                                    id={project.id}
                                    className="group relative flex flex-col md:flex-row overflow-hidden border-t border-white/[0.06] last:border-b scroll-mt-32 hover:bg-[#191919] transition-colors duration-500"
                                    style={{ minHeight: '520px' }}
                                >
                                    {/* ── Info column ───────────────────────────── */}
                                    <div
                                        className={`relative flex flex-col justify-center gap-8 py-20 z-10 w-full md:w-[45%] ${
                                            isEven ? 'md:order-1 md:pr-14' : 'md:order-2 md:pl-14'
                                        }`}
                                    >
                                        {/* Project number + title */}
                                        <div className="flex items-baseline gap-6">
                                            <span className="font-black text-white/[0.04] leading-none select-none shrink-0" style={{ fontSize: '7rem' }}>
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>
                                            <div className="flex items-center gap-5 min-w-0">
                                                <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                                    <Image
                                                        src={project.logo}
                                                        alt={project.title}
                                                        fill
                                                        className="object-contain p-1"
                                                    />
                                                </div>
                                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight">
                                                    {project.title}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-white/45 text-base md:text-lg leading-relaxed line-clamp-4">
                                            {project.description}
                                        </p>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[0.6rem] font-black uppercase tracking-[0.15em] text-white/40"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stat + store buttons row */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                            {/* Stat */}
                                            {meta && (
                                                <div>
                                                    <p className="text-4xl md:text-5xl font-black text-white leading-none">{meta.metric}</p>
                                                    <p className="text-[0.7rem] uppercase tracking-widest text-white/30 mt-2">{meta.metricLabel}</p>
                                                </div>
                                            )}

                                            {/* Store buttons */}
                                            <div className="flex items-center gap-3 flex-wrap">
                                                {project.link && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                                        className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 hover:opacity-90"
                                                    >
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=sDtU582wAEWd&format=png&color=000000"
                                                            alt="Play Store"
                                                            className="w-4 h-4 object-contain"
                                                        />
                                                        Play Store
                                                        <PlayStoreArrow />
                                                    </a>
                                                )}
                                                {project.iosLink && (
                                                    <a
                                                        href={project.iosLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                                        className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 hover:opacity-90"
                                                    >
                                                        <img
                                                            src="https://img.icons8.com/?size=100&id=2u9oG2V1ZieN&format=png&color=000000"
                                                            alt="App Store"
                                                            className="w-4 h-4 object-contain"
                                                        />
                                                        App Store
                                                        <PlayStoreArrow />
                                                    </a>
                                                )}
                                                {project.webLink && (
                                                    <a
                                                        href={project.webLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ backgroundColor: '#ffffff', color: '#000000' }}
                                                        className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs transition-all duration-300 hover:opacity-90"
                                                    >
                                                        Website
                                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Screenshot panel — parallelogram clip ─── */}
                                    <div
                                        className={`relative flex-1 overflow-hidden md:order-${isEven ? '2' : '1'} min-h-[420px] md:min-h-0`}
                                        style={{
                                            clipPath: isEven
                                                ? 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                                : 'polygon(0% 0%, 95% 0%, 100% 100%, 0% 100%)',
                                        }}
                                    >
                                        {/* Screenshot marquee */}
                                        <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                                            <ProjectScreenshotMarquee
                                                screenshots={project.screenshotPaths}
                                                title={project.title}
                                                height={400}
                                                speed={isEven ? 38 : 46}
                                                reverse={!isEven}
                                            />
                                        </div>

                                        {/* Arrow button — appears on hover */}
                                        <div className={`absolute bottom-8 z-20 flex size-11 items-center justify-center rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 ${isEven ? 'right-8' : 'left-8'}`}>
                                            <ArrowUpRight className="size-5" />
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
