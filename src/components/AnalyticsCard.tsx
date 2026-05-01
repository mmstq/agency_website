'use client';

import React, { useEffect, useRef } from 'react';
import GlassSurface from './GlassSurface';

export default function AnalyticsCard() {
    const isHovered = useRef(false);
    const speedRef = useRef(0);
    const targetSpeedRef = useRef(0);
    
    // Initial angles based on original CSS classes (rotate-45, -rotate-12)
    const angle1Ref = useRef(45);
    const angle2Ref = useRef(-12);
    
    const ring2Ref = useRef<HTMLDivElement>(null);
    const ring3Ref = useRef<HTMLDivElement>(null);
    
    const requestRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number | null>(null);
    
    // Physics Constants
    const FAST_SPEED = 250;     // Initial burst speed (degrees per sec)
    const SLOW_SPEED = 30;      // Infinite sustainable speed (degrees per sec)
    const DECELERATION = 120;   // Speed decay rate (degrees per sec^2)

    useEffect(() => {
        // We define animate inside useEffect to keep it scoped, but execute it via ref checks.
        // Actually, we can define it outside or inside, let's just make sure cleanup is right.
        return () => {
            if (requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, []);

    const animate = (time: number) => {
        if (lastTimeRef.current !== null) {
            const deltaTime = (time - lastTimeRef.current) / 1000;
            
            // Decelerate down to target speed
            if (speedRef.current > targetSpeedRef.current) {
                speedRef.current -= DECELERATION * deltaTime;
                if (speedRef.current < targetSpeedRef.current) speedRef.current = targetSpeedRef.current;
            } 
            // If we somehow drop below target (e.g. if we add acceleration in future), push it up
            else if (speedRef.current < targetSpeedRef.current) {
                 speedRef.current += DECELERATION * deltaTime;
                 if (speedRef.current > targetSpeedRef.current) speedRef.current = targetSpeedRef.current;
            }

            if (speedRef.current > 0) {
                // Ring 2 spins forward
                angle1Ref.current += speedRef.current * deltaTime;
                // Ring 3 spins backward slightly slower
                angle2Ref.current -= (speedRef.current * 0.8) * deltaTime;
                
                if (ring2Ref.current) ring2Ref.current.style.transform = `rotate(${angle1Ref.current}deg)`;
                if (ring3Ref.current) ring3Ref.current.style.transform = `rotate(${angle2Ref.current}deg)`;
            }
        }
        lastTimeRef.current = time;

        // Either keep spinning if we haven't hit 0, or keep waiting if hovered
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
            // Kickstart loop
            lastTimeRef.current = null;
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    const handleMouseLeave = () => {
        isHovered.current = false;
        targetSpeedRef.current = 0; // Tell loop to decelerate to a stop
    };

    return (
        <GlassSurface
            width="100%"
            height="100%"
            borderRadius={24}
            backgroundOpacity={0.16}
            saturation={1.55}
            distortionScale={-110}
            className="min-h-[500px] glass-surface--flush glass-surface--soft-hover group"
        >
        <div
            className="flex h-full w-full flex-col justify-between rounded-3xl p-6"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Header Section */}
            <header className="flex flex-col gap-1 z-10">
                <h2 className="text-white text-[28px] font-serif font-bold tracking-tight">Analytics</h2>
                <p className="text-[#a1a1a1] text-[15px] leading-relaxed max-w-[200px]">
                    Designed to help you make informed business decisions.
                </p>
            </header>

            {/* Concentric Donut Chart Section */}
            <div className="relative w-full flex-grow flex items-center justify-center my-6 overflow-hidden">
                {/* Radial gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] rounded-full"></div>
                
                {/* Concentric Rings Construction */}
                <div className="relative flex items-center justify-center w-full aspect-square max-w-[220px]">
                    {/* Ring 1 (Outer) - Keeps its pure CSS infinite spin */}
                    <div className="absolute w-full h-full rounded-full border-[1.5px] border-[#333] border-dashed animate-[spin_60s_linear_infinite]"></div>
                    
                    {/* Ring 2 */}
                    <div className="absolute w-[80%] h-[80%] rounded-full border-4 border-white/10 flex items-center justify-center">
                        {/* We removed the CSS transitions to let JS take control */}
                        <div ref={ring2Ref} className="w-full h-full rounded-full border-4 border-white/40 border-t-white" style={{ transform: 'rotate(45deg)' }}></div>
                    </div>
                    
                    {/* Ring 3 */}
                    <div ref={ring3Ref} className="absolute w-[60%] h-[60%] rounded-full border-[6px] border-white/5 border-l-white/60 border-b-white/80" style={{ transform: 'rotate(-12deg)' }}></div>
                    
                    {/* Ring 4 */}
                    <div className="absolute w-[40%] h-[40%] rounded-full border-[8px] border-white text-[#1a1a1a] shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                        {/* Inner core styling */}
                        <div className="w-full h-full bg-white opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                </div>

                {/* Crosshairs overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                    <div className="w-px h-full bg-gradient-to-b from-transparent via-white/40 to-transparent"></div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent absolute"></div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="flex flex-col gap-1 z-10">
                <div className="flex items-center gap-2 group/btn cursor-default">
                    <span className="text-white text-base font-semibold tracking-tight">Not your average bar chart</span>
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                        <svg suppressHydrationWarning className="h-3.5 w-3.5 text-white transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                        </svg>
                    </div>
                </div>
                <p className="text-[#a1a1a1] text-sm">
                    More than just graphs and numbers.
                </p>
            </footer>
        </div>
        </GlassSurface>
    );
}
