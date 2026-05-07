import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data/projects';
import { caseStudies } from '@/lib/data/case-studies';
import ScrollReveal from '@/components/ScrollReveal';
import ProjectScreenshotMarquee from '@/components/ProjectScreenshotMarquee';

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

                {/* ── Editorial Rows ────────────────────────────────────── */}
                <div className="flex flex-col">
                    {projects.map((project, idx) => {
                        const isEven = idx % 2 === 0;
                        const meta = getStudyMeta(project.id);

                        return (
                            <div
                                key={project.id}
                                id={project.id}
                                className="group relative flex flex-col md:flex-row overflow-hidden border-t border-white/[0.06] last:border-b scroll-mt-32 hover:bg-[#191919] transition-colors duration-500"
                                style={{ minHeight: '340px' }}
                            >
                                {/* ── Info column ───────────────────────────── */}
                                <div
                                    className={`relative flex flex-col justify-center gap-6 py-12 z-10 w-full md:w-[45%] ${
                                        isEven ? 'md:order-1 md:pr-14' : 'md:order-2 md:pl-14'
                                    }`}
                                >
                                    {/* Project number + title */}
                                    <div className="flex items-baseline gap-5">
                                        <span className="font-black text-white/[0.04] leading-none select-none shrink-0" style={{ fontSize: '5rem' }}>
                                            {String(idx + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-white/10 bg-[#1a1a1a]">
                                                <Image
                                                    src={project.logo}
                                                    alt={project.title}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-tight">
                                                {project.title}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-white/45 text-sm leading-relaxed line-clamp-3">
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
                                                <p className="text-3xl font-black text-white leading-none">{meta.metric}</p>
                                                <p className="text-[0.6rem] uppercase tracking-widest text-white/30 mt-1">{meta.metricLabel}</p>
                                            </div>
                                        )}

                                        {/* Store buttons */}
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-white font-bold text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                                >
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=sDtU582wAEWd&format=png&color=FFFFFF"
                                                        alt="Play Store"
                                                        className="w-4 h-4 object-contain opacity-80"
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
                                                    className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-white font-bold text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                                >
                                                    <img
                                                        src="https://img.icons8.com/?size=100&id=2u9oG2V1ZieN&format=png&color=FFFFFF"
                                                        alt="App Store"
                                                        className="w-4 h-4 object-contain opacity-80"
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
                                                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 text-white font-bold text-xs hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                                >
                                                    Website
                                                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ── Screenshot panel — parallelogram clip ─── */}
                                <div
                                    className={`relative flex-1 overflow-hidden md:order-${isEven ? '2' : '1'} min-h-[280px] md:min-h-0`}
                                    style={{
                                        clipPath: isEven
                                            ? 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                            : 'polygon(0% 0%, 95% 0%, 100% 100%, 0% 100%)',
                                    }}
                                >
                                    {/* Screenshot marquee */}
                                    <div className="absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity duration-700 grayscale group-hover:grayscale-0">
                                        <ProjectScreenshotMarquee
                                            screenshots={project.screenshotPaths}
                                            title={project.title}
                                            height={260}
                                            speed={isEven ? 38 : 46}
                                            reverse={!isEven}
                                        />
                                    </div>

                                    {/* Edge fade toward info side */}
                                    <div
                                        className="absolute inset-0 pointer-events-none z-10"
                                        style={{
                                            background: isEven
                                                ? 'linear-gradient(to right, #131313 0%, transparent 35%)'
                                                : 'linear-gradient(to left, #131313 0%, transparent 35%)',
                                        }}
                                    />

                                    {/* Arrow button — appears on hover */}
                                    <div className={`absolute bottom-8 z-20 flex size-11 items-center justify-center rounded-full bg-white text-black opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 ${isEven ? 'right-8' : 'left-8'}`}>
                                        <ArrowUpRight className="size-5" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
