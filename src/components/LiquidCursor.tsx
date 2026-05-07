'use client';

import React, { useEffect, useState, useRef } from 'react';
import GlassSurface from './GlassSurface';

export default function LiquidCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const handleMouseMove = (e: MouseEvent) => {
            if (cursor) {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            }
            
            const target = e.target as HTMLElement;
            const isOverInteractive = !!target.closest('.card-interactive');
            if (isOverInteractive !== isVisible) {
                setIsVisible(isOverInteractive);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isVisible]);

    return (
        <div 
            ref={cursorRef}
            className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{ 
                left: '-100px',
                top: '-100px',
                opacity: isVisible ? 1 : 0,
                display: isVisible ? 'block' : 'none'
            }}
        >
            <GlassSurface
                width={120}
                height={120}
                borderRadius={999}
                backgroundOpacity={0.05}
                saturation={2}
                distortionScale={-150}
                className="glass-surface--flush border border-white/20 shadow-2xl"
            />
        </div>
    );
}
