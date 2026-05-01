'use client';

import React, { useState, useEffect, useRef } from 'react';
import GlassSurface from './GlassSurface';

export default function FeatureCardsStack() {
    const [isToggled, setIsToggled] = useState(false);

    // --- Animation Physics Logic ---
    const isHovered = useRef(false);
    const speedRef = useRef(0);
    const targetSpeedRef = useRef(0);

    // Angles for the rings
    const angle1Ref = useRef(0);
    const angle2Ref = useRef(0);

    const outerRingRef = useRef<HTMLDivElement>(null);
    const innerRingRef = useRef<HTMLDivElement>(null);
    const appRefs = useRef<(HTMLDivElement | null)[]>([]);

    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);

    // Ecosystem spins a bit slower since it covers a larger visual area
    const FAST_SPEED = 180;
    const SLOW_SPEED = 20;
    const DECELERATION = 90;

    useEffect(() => {
        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    const animate = (time: number) => {
        if (lastTimeRef.current !== null) {
            const deltaTime = (time - lastTimeRef.current) / 1000;

            if (speedRef.current > targetSpeedRef.current) {
                speedRef.current -= DECELERATION * deltaTime;
                if (speedRef.current < targetSpeedRef.current) speedRef.current = targetSpeedRef.current;
            } else if (speedRef.current < targetSpeedRef.current) {
                speedRef.current += DECELERATION * deltaTime;
                if (speedRef.current > targetSpeedRef.current) speedRef.current = targetSpeedRef.current;
            }

            if (speedRef.current > 0) {
                // Outer ring spins forward
                angle1Ref.current += speedRef.current * deltaTime;
                // Inner ring spins backward
                angle2Ref.current -= (speedRef.current * 0.7) * deltaTime;

                if (outerRingRef.current) outerRingRef.current.style.transform = `rotate(${angle1Ref.current}deg)`;
                if (innerRingRef.current) innerRingRef.current.style.transform = `rotate(${angle2Ref.current}deg)`;

                // Counter-rotate the apps so they stay upright while orbiting!
                appRefs.current.forEach(app => {
                    if (app) app.style.transform = `rotate(${-angle2Ref.current}deg)`;
                });
            }
        }
        lastTimeRef.current = time;

        if (speedRef.current > 0 || isHovered.current) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            requestRef.current = null;
            lastTimeRef.current = null;
        }
    };

    const handleMouseEnter = () => {
        isHovered.current = true;
        speedRef.current = FAST_SPEED;
        targetSpeedRef.current = SLOW_SPEED;

        if (!requestRef.current) {
            lastTimeRef.current = null;
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    const handleMouseLeave = () => {
        isHovered.current = false;
        targetSpeedRef.current = 0;
    };

    const setAppRef = (idx: number) => (el: HTMLDivElement | null) => {
        appRefs.current[idx] = el;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full min-h-[500px]">

            {/* LEFT COLUMN: 4 Vertical Stacked Cards */}
            <div className="flex flex-col gap-4 h-full">
                {[
                    { title: "Scalable apps", desc: "Solutions that grow with your business.", icon: <svg suppressHydrationWarning width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg> },
                    { title: "Future-ready tech", desc: "Built for today, ready for tomorrow.", icon: <svg suppressHydrationWarning width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg> },
                    { title: "Custom solutions", desc: "Tailored web apps, dashboards, and more.", icon: <svg suppressHydrationWarning width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg> },
                    { title: "AI-powered solutions", desc: "Integrate AI to supercharge your business.", icon: <svg suppressHydrationWarning width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11-6 6v3h9l3-3" /><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" /></svg> },
                ].map((feature, i) => (
                    <GlassSurface
                        key={i}
                        width="100%"
                        height="100%"
                        borderRadius={24}
                        backgroundOpacity={0.16}
                        saturation={1.55}
                        distortionScale={-105}
                        className="flex-1 glass-surface--flush glass-surface--soft-hover group"
                    >
                        <div className="flex h-full w-full items-center gap-5 p-5">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-white tracking-tight">{feature.title}</h3>
                                <p className="text-[#a1a1a1] text-[13px] mt-0.5 leading-snug">{feature.desc}</p>
                            </div>
                        </div>
                    </GlassSurface>
                ))}
            </div>

            {/* RIGHT COLUMN: Large Square + Thin Horizontal */}
            <div className="flex flex-col gap-4 h-full">

                {/* Top Card: Large Ecosystem Card */}
                <GlassSurface
                    width="100%"
                    height="100%"
                    borderRadius={24}
                    backgroundOpacity={0.16}
                    saturation={1.55}
                    distortionScale={-110}
                    className="flex-[3] min-h-[350px] w-full glass-surface--flush glass-surface--soft-hover group"
                >
                <div
                    className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden rounded-3xl p-8"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >

                    {/* Top Label */}
                    <span className="text-[#a1a1a1] uppercase text-[11px] font-bold tracking-[0.2em] mt-2 relative z-10">
                        Ecosystem
                    </span>

                    {/* Concentric rings background - pointer-events removed so events bubble to parent */}
                    <div className="absolute inset-0 flex items-center justify-center mt-10 overflow-visible">
                        <div ref={outerRingRef} className="w-[18rem] h-[18rem] border border-white/10 rounded-full flex items-center justify-center border-dashed opacity-80">

                            <div ref={innerRingRef} className="w-[12rem] h-[12rem] border border-white/10 rounded-full flex items-center justify-center relative bg-white/[0.01] opacity-80">
                                {/* The center logo */}
                                <div className="w-16 h-16 bg-[#1a1a1b] rounded-full flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-110 transition-transform duration-500 z-20">
                                    <div ref={setAppRef(0)} className="w-full h-full flex items-center justify-center">
                                        <svg suppressHydrationWarning viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Floating App Logos */}
                                <div className="absolute -top-1 left-2 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1b] shadow-lg transition-transform duration-500 group-hover:-translate-y-1">
                                    <div ref={setAppRef(1)} className="w-full h-full flex items-center justify-center">
                                        <svg suppressHydrationWarning viewBox="0 0 24 24" className="w-[18px] h-[18px] text-red-500" fill="currentColor"><path d="M3 6L12 12L21 6V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" opacity="0.8" /><path fill="#fff" d="M12 13.5L3 7v1.5L12 15l9-6.5V7l-9 6.5z" /></svg>
                                    </div>
                                </div>
                                <div className="absolute top-2 -right-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1b] shadow-lg transition-transform duration-500 group-hover:translate-x-1">
                                    <div ref={setAppRef(2)} className="w-full h-full flex items-center justify-center">
                                        <svg suppressHydrationWarning viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 13H7A1.5 1.5 0 0 1 7 10h1.5v3Zm0-4.5V7A1.5 1.5 0 0 1 11.5 7v1.5h-3Zm7 4.5h1.5a1.5 1.5 0 0 0 0-3h-1.5v3Zm0 4.5V19a1.5 1.5 0 0 0-3 0v-1.5h3Z" fill="#36C5F0" /><path d="M10 15v1.5a1.5 1.5 0 0 0 3 0V15h-3Zm-4.5-5H4A1.5 1.5 0 0 0 4 13h1.5v-3Zm4.5-4V4.5a1.5 1.5 0 0 1 3 0V6h-3Zm7 4h-1.5A1.5 1.5 0 0 0 14 13h3a1.5 1.5 0 0 0 0-3Z" fill="#2EB67D" /><path d="M11.5 11.5h-3V10A1.5 1.5 0 0 1 11.5 10v1.5Z" fill="#E01E5A" /><path d="M11.5 11.5V14.5A1.5 1.5 0 0 1 10 14.5v-3h1.5Z" fill="#E01E5A" /><path d="M14 11.5h3A1.5 1.5 0 0 1 17 13h-3v-1.5Z" fill="#ECB22E" /><path d="M14 11.5v-3A1.5 1.5 0 0 1 15.5 10v1.5h-1.5Z" fill="#ECB22E" /></svg>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 -right-12 translate-y-1 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1b] shadow-lg transition-transform duration-500 group-hover:translate-x-1">
                                    <div ref={setAppRef(3)} className="w-full h-full flex items-center justify-center">
                                        <svg suppressHydrationWarning viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#ff4a00]" fill="currentColor"><path d="M16.5 2H5l3.5 9H4l15 11-4-10h4z" /></svg>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1b] shadow-lg transition-transform duration-500 group-hover:translate-y-1">
                                    <div ref={setAppRef(4)} className="w-full h-full flex items-center justify-center">
                                        <svg suppressHydrationWarning viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#241c15]" fill="currentColor"><circle cx="12" cy="12" r="10" fill="#FFE01B" /><path d="M12 7c-2.5 0-4 1.5-4 4s1.5 5 4 5s4-1.5 4-5s-1.5-4-4-4zm-1.5 5.5a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2a1 1 0 0 1 0 2z" fill="#000" /></svg>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 -left-8 translate-y-6 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center bg-[#1a1a1b] shadow-lg transition-transform duration-500 group-hover:-translate-x-1">
                                    <div ref={setAppRef(5)} className="w-full h-full flex items-center justify-center">
                                        <svg suppressHydrationWarning viewBox="0 0 24 24" className="w-[16px] h-[16px] text-[#0f9d58]" fill="currentColor"><rect x="3" y="2" width="18" height="20" rx="3" /><path d="M7 7h10M7 11h10M7 15h6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center px-4 w-full relative z-10">
                        <h2 className="font-bold font-serif text-white text-[28px] tracking-tight leading-tight shrink-0 mt-4 md:mt-24">
                            Any integration you can imagine.
                        </h2>
                    </div>
                </div>
                </GlassSurface>

                {/* Bottom Card: Full stack with Toggle */}
                <GlassSurface
                    width="100%"
                    height="100%"
                    borderRadius={24}
                    backgroundOpacity={0.16}
                    saturation={1.55}
                    distortionScale={-105}
                    className="flex-1 min-h-[100px] glass-surface--flush glass-surface--soft-hover"
                >
                    <div className="flex h-full w-full items-center justify-between px-8 py-5">
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-white tracking-tight text-base">Full stack</h3>
                            <p className="text-[#a1a1a1] text-[13px] mt-0.5">SaaS solutions for the modern world</p>
                        </div>

                        {/* Functional React State Toggle Switch */}
                        <button
                            className={`relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${isToggled ? 'bg-white' : 'bg-white/10'}`}
                            onClick={() => setIsToggled(!isToggled)}
                        >
                            <span
                                className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow ring-0 transition-transform duration-300 ease-in-out ${isToggled ? 'translate-x-[22px] bg-[#1a1a1b]' : 'translate-x-[3px] bg-white'}`}
                            />
                        </button>
                    </div>
                </GlassSurface>

            </div>
        </div>
    );
}
