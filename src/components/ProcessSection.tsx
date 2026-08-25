'use client';

import { useCallback, useEffect, useRef } from 'react';
import SplitText from './SplitText';
import ProcessGlyph from './ProcessGlyph';
import styles from './ProcessSection.module.css';

const STEPS = [
    {
        title: 'Architectural Discovery',
        desc: 'Deep-dive into your technical constraints and business logic to map out the digital monolith.',
    },
    {
        title: 'High-Fidelity Design',
        desc: 'Editorial-grade UI/UX that prioritizes authority, motion, and conversion systems.',
    },
    {
        title: 'Elite Engineering',
        desc: 'Surgical implementation using Next.js, custom RAF animations, and scalable infrastructure.',
    },
    {
        title: 'Orchestrated Launch',
        desc: 'Performance optimization, SEO hardening, and continuous delivery pipelines.',
    },
];

const LAYER_CLASSES = [styles.layerOne, styles.layerTwo, styles.layerThree, styles.layerFour];

function ProcessCardVisual({ index }: { index: number }) {
    if (index === 0) {
        return (
            <div className={`${styles.cardVisual} ${styles.discoveryVisual}`} aria-hidden="true">
                <div className={`${styles.orbitRig} ${styles.visualMotion}`}>
                    <span className={`${styles.orbit} ${styles.orbitOuter}`} />
                    <span className={`${styles.orbit} ${styles.orbitMiddle}`} />
                    <span className={`${styles.orbit} ${styles.orbitInner}`} />
                    <span className={styles.orbitAxis} />
                    <span className={styles.orbitCore} />
                    <span className={styles.orbitSatellite} />
                </div>
            </div>
        );
    }

    if (index === 1) {
        return (
            <div className={`${styles.cardVisual} ${styles.designVisual}`} aria-hidden="true">
                <div className={`${styles.designStack} ${styles.visualMotion}`}>
                    <span className={`${styles.uiPlane} ${styles.uiPlaneBack}`}>
                        <i className={styles.uiNode} />
                    </span>
                    <span className={`${styles.uiPlane} ${styles.uiPlaneMiddle}`}>
                        <i className={styles.uiBar} />
                        <i className={styles.uiNode} />
                    </span>
                    <span className={`${styles.uiPlane} ${styles.uiPlaneFront}`}>
                        <i className={styles.uiBar} />
                        <i className={styles.uiNode} />
                    </span>
                </div>
            </div>
        );
    }

    if (index === 2) {
        return (
            <div className={`${styles.cardVisual} ${styles.engineeringVisual}`} aria-hidden="true">
                <div className={styles.engineeringGrid} />
                <div className={`${styles.cube} ${styles.visualMotion}`}>
                    <span className={`${styles.cubeFace} ${styles.cubeFront}`} />
                    <span className={`${styles.cubeFace} ${styles.cubeBack}`} />
                    <span className={`${styles.cubeFace} ${styles.cubeLeft}`} />
                    <span className={`${styles.cubeFace} ${styles.cubeRight}`} />
                    <span className={`${styles.cubeFace} ${styles.cubeTop}`} />
                    <span className={`${styles.cubeFace} ${styles.cubeBottom}`} />
                </div>
                <span className={styles.engineeringRailOne} />
                <span className={styles.engineeringRailTwo} />
            </div>
        );
    }

    return (
        <div className={`${styles.cardVisual} ${styles.launchVisual}`} aria-hidden="true">
            <div className={`${styles.launchRig} ${styles.visualMotion}`}>
                <span className={`${styles.launchOrbit} ${styles.launchOrbitOuter}`} />
                <span className={`${styles.launchOrbit} ${styles.launchOrbitInner}`} />
                <span className={styles.launchTrail} />
                <span className={styles.launchCore}>
                    <i className={styles.launchWindow} />
                </span>
                <span className={styles.launchMarker} />
            </div>
        </div>
    );
}

export default function ProcessSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const monolithRef = useRef<HTMLDivElement>(null);
    const objectRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
    const revealRefs = useRef<Array<HTMLDivElement | null>>([]);
    const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

    const activateStep = useCallback((activeIndex: number) => {
        cardRefs.current.forEach((card, index) => {
            card?.classList.toggle(styles.activeCard, index === activeIndex);
        });
        layerRefs.current.forEach((layer, index) => {
            layer?.classList.toggle(styles.activeLayer, index === activeIndex);
        });
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                section.classList.toggle(styles.motionActive, entry.isIntersecting);
            },
            {
                // Warm the small compositor layers shortly before they enter the
                // viewport, then pause them again once the section is well away.
                rootMargin: '240px 0px',
                threshold: 0,
            },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const visibility = new Map<Element, number>();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
                });

                let nextIndex = 0;
                let highestRatio = -1;
                cardRefs.current.forEach((card, index) => {
                    const ratio = card ? visibility.get(card) ?? 0 : 0;
                    if (ratio > highestRatio) {
                        highestRatio = ratio;
                        nextIndex = index;
                    }
                });
                activateStep(nextIndex);
            },
            {
                rootMargin: '-24% 0px -36% 0px',
                threshold: [0, 0.2, 0.4, 0.6, 0.8],
            },
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, [activateStep]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const targets = revealRefs.current.filter(
            (target): target is HTMLDivElement => target !== null,
        );
        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                let batchIndex = 0;

                entries.forEach((entry) => {
                    const target = entry.target as HTMLDivElement;

                    if (entry.isIntersecting) {
                        target.style.transitionDelay = `${batchIndex * 90}ms`;
                        target.classList.add(styles.processRevealVisible);
                        batchIndex += 1;
                    } else {
                        target.style.transitionDelay = '0ms';
                        target.classList.remove(styles.processRevealVisible);
                    }
                });
            },
            {
                threshold: 0.14,
                rootMargin: '0px 0px -10% 0px',
            },
        );

        targets.forEach((target) => observer.observe(target));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const monolith = monolithRef.current;
        const object = objectRef.current;
        if (!monolith || !object) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches) return;

        let frameId: number | null = null;
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        const animateTilt = () => {
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;
            object.style.setProperty('--tilt-x', `${currentX.toFixed(2)}deg`);
            object.style.setProperty('--tilt-y', `${currentY.toFixed(2)}deg`);

            if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
                frameId = requestAnimationFrame(animateTilt);
            } else {
                frameId = null;
            }
        };

        const requestTiltFrame = () => {
            if (frameId === null) frameId = requestAnimationFrame(animateTilt);
        };

        const handlePointerMove = (event: PointerEvent) => {
            const bounds = monolith.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            targetX = Math.max(-1, Math.min(1, -y * 2)) * 4;
            targetY = Math.max(-1, Math.min(1, x * 2)) * 5;
            requestTiltFrame();
        };

        const handlePointerLeave = () => {
            targetX = 0;
            targetY = 0;
            requestTiltFrame();
        };

        monolith.addEventListener('pointermove', handlePointerMove, { passive: true });
        monolith.addEventListener('pointerleave', handlePointerLeave);

        return () => {
            monolith.removeEventListener('pointermove', handlePointerMove);
            monolith.removeEventListener('pointerleave', handlePointerLeave);
            if (frameId !== null) cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <section ref={sectionRef} id="process" className="py-24 relative overflow-hidden scroll-mt-24">
            <div className="w-full px-6 md:px-12">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:sticky lg:top-28 lg:w-1/3">
                        <p className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-white/30 mb-4">
                            How we build
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8 perspective-1000">
                            <SplitText
                                text="A ruthlessly efficient path to production."
                                delay={35}
                                duration={0.8}
                                splitType="words"
                                from={{ opacity: 0, y: 60, rotateX: -25 }}
                                to={{ opacity: 1, y: 0, rotateX: 0 }}
                                tag="span"
                            />
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed">
                            We operate at the intersection of surgical engineering and premium design, stripping away the bloat to deliver pure technological value.
                        </p>

                        <div ref={monolithRef} className={styles.monolith} aria-hidden="true">
                            <div className={styles.ambientGlow} />
                            <div className={styles.floorShadow} />
                            <div className={styles.floatWrap}>
                                <div ref={objectRef} className={styles.monolithObject}>
                                    {STEPS.map((step, index) => (
                                        <div
                                            key={step.title}
                                            ref={(element) => {
                                                layerRefs.current[index] = element;
                                            }}
                                            className={`${styles.slab} ${LAYER_CLASSES[index]} ${index === 0 ? styles.activeLayer : ''}`}
                                        >
                                            <div className={styles.slabSurface}>
                                                <span className={styles.slabFrame} />
                                                <span className={styles.slabGrid} />
                                                <span className={styles.slabCore} />
                                                <span className={styles.slabSignal} />
                                            </div>
                                            <span className={styles.frontEdge} />
                                            <span className={styles.sideEdge} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 gap-4">
                        {STEPS.map((step, index) => (
                            <div
                                key={step.title}
                                ref={(element) => {
                                    revealRefs.current[index] = element;
                                }}
                                className={styles.processReveal}
                            >
                                <div
                                    ref={(element) => {
                                        cardRefs.current[index] = element;
                                    }}
                                    onPointerEnter={() => activateStep(index)}
                                    className={`monolith-card group p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-5 md:gap-8 items-start ${styles.processCard} ${index === 0 ? styles.activeCard : ''}`}
                                >
                                    <div className={`w-full md:w-auto flex-shrink-0 flex flex-row md:flex-col items-center gap-4 md:gap-0 ${styles.cardContent} ${styles.processIdentity}`}>
                                        <div className={styles.processIconTile}>
                                            <span className={styles.iconGrid} />
                                            <ProcessGlyph index={index} className={styles.processGlyph} />
                                        </div>
                                        <h3 className="min-w-0 flex-1 text-xl sm:text-2xl font-bold text-white tracking-tight md:hidden">
                                            {step.title}
                                        </h3>
                                        <span className={`${styles.stepNumber} ml-auto md:ml-0 text-base md:text-2xl font-black italic`}>0{index + 1}</span>
                                    </div>
                                    <div className={`w-full md:w-auto ${styles.cardContent}`}>
                                        <h3 className="hidden md:block text-2xl font-bold text-white mb-4 tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
                                            {step.desc}
                                        </p>
                                    </div>
                                    <ProcessCardVisual index={index} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
