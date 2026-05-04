'use client';

import React, { useEffect, useState } from 'react';
import GlassSurface from './GlassSurface';

export default function LiquidCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            
            // Check if hovering over an interactive card (project or testimonial)
            const target = e.target as HTMLElement;
            const isOverInteractive = target.closest('.card-interactive');
            setIsVisible(!!isOverInteractive);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (!isVisible) return null;

    return (
        <div 
            className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
            style={{ 
                left: `${position.x}px`, 
                top: `${position.y}px`,
                opacity: isVisible ? 1 : 0
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
