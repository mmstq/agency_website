'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Images, X } from 'lucide-react';
import type { Project } from '@/lib/types/project';
import { FannedDeck } from './projectVisuals';

type SignalSpec = {
    accent: string;
    label: string;
};

const SIGNALS: Record<string, SignalSpec> = {
    marhaba: { accent: '#ef3340', label: 'Live auction signal' },
    koor: { accent: '#e51c78', label: 'Property discovery signal' },
    movermate: { accent: '#3573ff', label: 'Route and payment signal' },
    counsellor_app: { accent: '#7185ff', label: 'Sales pipeline signal' },
    spotted: { accent: '#7750d8', label: 'Payment reward signal' },
    ssc_ai: { accent: '#7bd99b', label: 'Adaptive learning signal' },
};

function SignalArtwork({ projectId, active }: { projectId: string; active: boolean }) {
    const activeClass = active ? 'portfolio-signal-active' : '';

    const motif = (() => {
        switch (projectId) {
            case 'marhaba':
                return (
                    <>
                        <path d="M10 36h18l6-15 9 28 8-19 7 6h28" />
                        <circle cx="34" cy="21" r="3" />
                        <path d="M67 18v36M76 26v28M85 12v42" opacity=".45" />
                    </>
                );
            case 'koor':
                return (
                    <>
                        <path d="M18 44V28l13-10 13 10v16M25 44V33h12v11" />
                        <path d="M56 41c12-24 29-17 26-2-2 10-13 16-13 16s-10-8-8-16c2-8 13-8 15-2" />
                        <circle cx="70" cy="38" r="3" />
                        <path d="M10 51c22 8 54 9 80-1" opacity=".45" />
                    </>
                );
            case 'movermate':
                return (
                    <>
                        <path d="M12 46c13 0 14-24 29-24 12 0 10 18 23 18 10 0 11-13 25-13" />
                        <circle cx="13" cy="46" r="4" />
                        <circle cx="89" cy="27" r="4" />
                        <path d="M47 49h24M53 55h12" opacity=".45" />
                    </>
                );
            case 'counsellor_app':
                return (
                    <>
                        <circle cx="18" cy="33" r="6" />
                        <circle cx="50" cy="20" r="6" />
                        <circle cx="50" cy="47" r="6" />
                        <circle cx="84" cy="33" r="6" />
                        <path d="M24 31l20-9M24 35l20 10M56 21l22 9M56 46l22-10" />
                        <path d="M81 29l5 4-5 4" />
                    </>
                );
            case 'spotted':
                return (
                    <>
                        <path d="M14 25V14h11M14 43v11h11M46 14h11v11M46 54h11V43" />
                        <rect x="27" y="27" width="17" height="17" rx="3" />
                        <circle cx="76" cy="34" r="6" />
                        <circle cx="76" cy="34" r="14" opacity=".55" />
                        <circle cx="76" cy="34" r="23" opacity=".25" />
                    </>
                );
            default:
                return (
                    <>
                        <circle cx="18" cy="20" r="3" />
                        <circle cx="39" cy="34" r="3" />
                        <circle cx="61" cy="18" r="3" />
                        <circle cx="83" cy="39" r="3" />
                        <circle cx="53" cy="51" r="3" />
                        <path d="M20 22l17 10 21-12 23 17-26 12-14-13" />
                        <path d="M12 52h20M71 12h18" opacity=".45" />
                    </>
                );
        }
    })();

    return (
        <svg
            viewBox="0 0 100 68"
            className={`h-[68px] w-[100px] shrink-0 ${activeClass}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <g opacity=".92">{motif}</g>
            <path className="portfolio-signal-sweep" d="M3 60h94" strokeWidth="2.5" />
        </svg>
    );
}

export default function ProjectSignalCapsule({ project, active }: { project: Project; active: boolean }) {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const spec = SIGNALS[project.id] ?? { accent: '#e2e2e2', label: 'Product interface signal' };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (open && dialog && !dialog.open) dialog.showModal();
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.documentElement.style.overflow = previousOverflow;
        };
    }, [open]);

    const closeGallery = () => {
        const dialog = dialogRef.current;
        if (dialog?.open) dialog.close();
        else setOpen(false);
    };

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Explore ${project.title} app screens`}
                className="group relative flex min-h-[84px] w-full items-center overflow-hidden rounded-[22px] px-3.5 text-left outline-none transition-[background-color,transform] duration-300 active:scale-[0.985] focus-visible:ring-2 focus-visible:ring-white/60 md:hidden"
                style={{
                    background: `radial-gradient(circle at 82% 50%, ${spec.accent}2e, transparent 38%), linear-gradient(110deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))`,
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 16px 36px rgba(0,0,0,0.24)',
                }}
            >
                <span
                    className="absolute inset-y-3 left-0 w-0.5 rounded-full opacity-80"
                    style={{ backgroundColor: spec.accent, boxShadow: `0 0 18px ${spec.accent}` }}
                />

                <span className="relative mr-3 h-10 w-10 shrink-0 overflow-hidden rounded-[12px] bg-black/30 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
                    <Image src={project.logo} alt="" fill className="object-cover" sizes="40px" />
                </span>

                <span className="relative z-10 min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/45">
                        <Images className="h-3 w-3" aria-hidden="true" />
                        {project.screenshotPaths.length} interface views
                    </span>
                    <span className="mt-1 block text-sm font-extrabold tracking-tight text-white">Explore app screens</span>
                    <span className="mt-0.5 block truncate text-[0.65rem] font-medium text-white/45">{spec.label}</span>
                </span>

                <span className="relative -mr-1 ml-1 flex items-center" style={{ color: spec.accent }}>
                    <SignalArtwork projectId={project.id} active={active} />
                </span>

                <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-white text-sm font-black text-black shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                    ↗
                </span>
            </button>

            <dialog
                ref={dialogRef}
                aria-label={`${project.title} screenshot gallery`}
                onClose={() => {
                    setOpen(false);
                    requestAnimationFrame(() => triggerRef.current?.focus());
                }}
                className="m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden border-0 bg-[#080808]/98 p-0 text-white backdrop:bg-black/90 backdrop:backdrop-blur-md"
            >
                <div className="flex h-full min-h-0 flex-col">
                    <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-5">
                        <div className="min-w-0">
                            <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/40">App screens</p>
                            <h3 className="truncate text-lg font-black tracking-tight text-white">{project.title}</h3>
                        </div>
                        <button
                            type="button"
                            onClick={closeGallery}
                            autoFocus
                            aria-label="Close screenshot gallery"
                            className="grid h-11 w-11 place-items-center rounded-full bg-white text-black outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div
                        className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-5 pb-5"
                        onPointerDown={(event) => {
                            if (event.target === event.currentTarget) closeGallery();
                        }}
                    >
                        {open && (
                            <FannedDeck
                                screenshots={project.screenshotPaths}
                                active
                                modal
                                projectTitle={project.title}
                            />
                        )}
                    </div>

                    <p className="shrink-0 pb-5 text-center text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/35">
                        Swipe or tap to explore
                    </p>
                </div>
            </dialog>

            <style jsx global>{`
                .portfolio-signal-sweep {
                    opacity: 0.18;
                    transform: scaleX(0.2);
                    transform-origin: left center;
                }

                .portfolio-signal-active .portfolio-signal-sweep {
                    animation: portfolioSignalSweep 4.2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
                }

                @keyframes portfolioSignalSweep {
                    0%, 58% {
                        opacity: 0.12;
                        transform: scaleX(0.12);
                    }
                    76% {
                        opacity: 0.9;
                        transform: scaleX(1);
                    }
                    100% {
                        opacity: 0.12;
                        transform: scaleX(0.12) translateX(720%);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .portfolio-signal-active .portfolio-signal-sweep {
                        animation: none;
                    }
                }
            `}</style>
        </>
    );
}
