'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';

/* ─────────────────────────────────────────────────────────────────────────
   projectVisuals — the RIGHT-side visual for a /portfolio project card.

   FannedDeck: the project's screenshots fanned like a spread hand of cards —
   one sharp, upright front card with the rest rotated, dimmed and shrunk
   behind it. Each tick the front card peels to the back and the next promotes
   to front. Transform/opacity/filter only, dark-theme, ghost-border only
   (No-Line rule).

   Interactive Controls:
   - Tap / Click: Advances to the next card.
   - Swipe Left (Mobile & Desktop drag): Advances to the next card.
   - Swipe Right (Mobile & Desktop drag): Returns to the previous card.
   - Keyboard: ArrowRight / ArrowLeft / Enter / Space.
   - Hover / Active drag: Pauses auto-cycle.
   ───────────────────────────────────────────────────────────────────────── */

export type VizProps = { screenshots: StaticImageData[]; active: boolean; fill?: boolean };

const EASE = 'cubic-bezier(0.22,1,0.36,1)';
const DECK_TICK_MS = 3600;
const SWIPE_THRESHOLD_PX = 40;

type Slot = { transform: string; filter: string; opacity: number; z: number };

// Fan slots, front → deepest. transform-origin is bottom-center, so cards
// pivot from the base like a held hand. Rotations stay subtle and mobile-safe
// so cards never overflow horizontal screen bounds.
const DECK_SLOTS: Slot[] = [
    { transform: 'rotate(-1.5deg) translate(0%,-2%) scale(1)', filter: 'brightness(1)', opacity: 1, z: 40 },
    { transform: 'rotate(3.5deg) translate(5%,0%) scale(0.96)', filter: 'brightness(0.75)', opacity: 1, z: 30 },
    { transform: 'rotate(7deg) translate(9%,1%) scale(0.92)', filter: 'brightness(0.55)', opacity: 1, z: 20 },
    { transform: 'rotate(-4.5deg) translate(-6%,0%) scale(0.94)', filter: 'brightness(0.65)', opacity: 1, z: 10 },
];
// Parked behind the deck, invisible — the card mid-cycle between front and back.
const DECK_HIDDEN: Slot = { transform: 'rotate(0deg) translate(0%,0%) scale(0.9)', filter: 'brightness(0.4)', opacity: 0, z: 0 };

export function FannedDeck({ screenshots, fill = false }: VizProps) {
    const shots = screenshots.slice(0, 5);
    const n = shots.length;
    const [i, setI] = useState(0);
    const paused = useRef(false);

    // Touch & Pointer gesture tracking
    const startX = useRef<number | null>(null);
    const startY = useRef<number | null>(null);
    const hasSwiped = useRef(false);

    const advance = useCallback(() => {
        setI((p) => (p + 1) % n);
    }, [n]);

    const retreat = useCallback(() => {
        setI((p) => (p - 1 + n) % n);
    }, [n]);

    // Always shuffling (paused only on hover or active touch gesture)
    useEffect(() => {
        if (n < 2) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = window.setInterval(() => {
            if (!paused.current) advance();
        }, DECK_TICK_MS);
        return () => window.clearInterval(id);
    }, [n, advance]);

    // Touch handlers for mobile swipe left / right
    const handleTouchStart = (e: React.TouchEvent) => {
        paused.current = true;
        hasSwiped.current = false;
        if (e.touches.length > 0) {
            startX.current = e.touches[0].clientX;
            startY.current = e.touches[0].clientY;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (startX.current === null || startY.current === null) return;
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = currentX - startX.current;
        const diffY = currentY - startY.current;

        // If horizontal movement is prominent, detect swipe
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > SWIPE_THRESHOLD_PX && !hasSwiped.current) {
            hasSwiped.current = true;
            if (diffX < 0) {
                // Swipe Left -> next
                advance();
            } else {
                // Swipe Right -> previous
                retreat();
            }
        }
    };

    const handleTouchEnd = () => {
        paused.current = false;
        startX.current = null;
        startY.current = null;
    };

    // Pointer handlers for desktop mouse click/drag & tap support
    const handlePointerDown = (e: React.PointerEvent) => {
        paused.current = true;
        startX.current = e.clientX;
        startY.current = e.clientY;
        hasSwiped.current = false;
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        paused.current = false;
        if (startX.current !== null && startY.current !== null) {
            const diffX = e.clientX - startX.current;
            const diffY = e.clientY - startY.current;

            // If dragged horizontally past threshold
            if (Math.abs(diffX) > SWIPE_THRESHOLD_PX && Math.abs(diffX) > Math.abs(diffY)) {
                hasSwiped.current = true;
                if (diffX < 0) {
                    advance();
                } else {
                    retreat();
                }
            } else if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
                // Clean tap / click
                advance();
            }
        }
        startX.current = null;
        startY.current = null;
    };

    return (
        <div
            // `fill` (single-project view): size proportionally on mobile without
            // blowing past viewport bounds; height-driven on md+.
            className={`relative mx-auto select-none touch-pan-y cursor-grab active:cursor-grabbing aspect-[9/19.5] ${
                fill
                    ? 'w-[230px] max-w-[70vw] sm:w-[280px] md:h-[68svh] md:w-auto md:max-w-full'
                    : 'h-[300px] max-h-[38svh] sm:h-[380px] sm:max-h-[50svh] md:h-auto md:max-h-[86svh] w-auto max-w-[62vw] sm:max-w-[300px] md:max-w-[400px]'
            }`}
            style={{ perspective: '1000px' }}
            role="button"
            tabIndex={0}
            aria-label="Swipe left/right or tap to change screenshot"
            title="Swipe left/right or tap to change screenshot"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    advance();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    retreat();
                }
            }}
            onMouseEnter={() => {
                paused.current = true;
            }}
            onMouseLeave={() => {
                paused.current = false;
            }}
        >
            {shots.map((s, k) => {
                const slot = ((k - i) % n + n) % n;
                const st = slot < DECK_SLOTS.length ? DECK_SLOTS[slot] : DECK_HIDDEN;
                return (
                    <div
                        key={k}
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px] sm:rounded-[26px]"
                        style={{
                            transform: st.transform,
                            filter: st.filter,
                            opacity: st.opacity,
                            zIndex: st.z,
                            transformOrigin: 'bottom center',
                            transition: `transform 0.9s ${EASE}, filter 0.9s ${EASE}, opacity 0.6s ${EASE}`,
                            boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)',
                        }}
                    >
                        <Image
                            src={s}
                            alt=""
                            fill
                            priority={k === 0}
                            sizes="(max-width: 768px) 260px, 400px"
                            draggable={false}
                            className="pointer-events-none select-none object-cover"
                        />
                    </div>
                );
            })}
        </div>
    );
}
