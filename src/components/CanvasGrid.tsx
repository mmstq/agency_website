'use client';
import { useEffect, useRef } from 'react';

export default function CanvasGrid() {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    // Touch devices keep the lattice (BubbleField's dock-and-merge needs real
    // dots to land on) but skip the cursor physics: they're folded into the
    // still-lattice path below — static dots, redrawn on scroll.
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas) return;

    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) return;

    const reduceMQ =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;
    let reduce = isTouch || !!(reduceMQ && reduceMQ.matches);

    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      // dpr-scaled backing store + CSS-px transform, matching BubbleField —
      // both fields must rasterize at the same resolution or the "bubbles
      // become lattice dots" footer handoff visibly breaks on hi-dpi screens.
      // dpr is re-read per resize (browser zoom / monitor moves change it).
      // documentElement.clientWidth is the scrollbar-EXCLUDED viewport — the
      // box a `fixed inset-0` element actually spans. window.innerWidth
      // includes a classic scrollbar, which would squash the raster ~16px
      // horizontally and desync these columns from BubbleField's true 32px
      // lattice columns on Windows/Linux.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssW = document.documentElement.clientWidth;
      cssH = document.documentElement.clientHeight;
      gridCanvas.width = Math.floor(cssW * dpr);
      gridCanvas.height = Math.floor(cssH * dpr);
      gridCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (reduce) return; // still lattice — don't accumulate a trail
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    if (!isTouch) window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId = 0;

    const gridSize = 32;
    const glowRadius = 160;
    const repulsionRadius = 100;
    const repulsionRadiusSq = repulsionRadius * repulsionRadius;
    const maxDisplacement = 30;
    const baseRadius = 0.8;
    const activeRadius = 2.8;
    const baseOpacity = 0.22;
    const activeOpacity = 0.75;
    const maxTrailAge = 35;

    const drawFrame = () => {
      gridCtx.clearRect(0, 0, cssW, cssH);

      // Reduced motion: a still lattice — no repulsion, no glow, no trail.
      // The cursor is parked far offscreen so every distance check misses.
      if (reduce && trailRef.current.length) trailRef.current.length = 0;

      // Age & prune repulsion trail
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].age++;
        if (trailRef.current[i].age >= maxTrailAge) trailRef.current.splice(i, 1);
      }

      const mx = reduce ? -1e5 : mouseRef.current.x;
      const my = reduce ? -1e5 : mouseRef.current.y;

      // ── Footer handoff ───────────────────────────────────────
      // The footer hosts BubbleField — bubbles rise off the page bottom,
      // organize onto these lattice columns/rows and MERGE into the dots
      // drawn here, reading as the background grid being formed from below.
      // To support that, the lattice fades from full strength at the footer's
      // top edge to ZERO at its bottom (a half-crystallized band — must match
      // BubbleField's GRID_FADE_FRAC), leaving the lower footer to the free
      // bubbles. The canvas is fixed (viewport coords), so the footer rect's
      // top maps straight onto grid-y. One rect read per frame; no footer on
      // a page (e.g. /portfolio) ⇒ no fade.
      const footerEl = document.querySelector('footer');
      let fadeStartY = Number.POSITIVE_INFINITY;
      let fadeInvLen = 0;
      if (footerEl) {
        const fr = footerEl.getBoundingClientRect();
        if (fr.height > 0 && fr.top < cssH) {
          fadeStartY = fr.top;
          fadeInvLen = 1 / Math.max(1, fr.height);
        }
      }

      // ── Grid dots ────────────────────────────────────────────
      const trail = trailRef.current;
      const trailLen = trail.length;
      const repulsionRadiusInv = 1 / repulsionRadius;
      const glowRadiusInv = 1 / glowRadius;

      for (let gx = gridSize / 2; gx < cssW; gx += gridSize) {
        for (let gy = gridSize / 2; gy < cssH; gy += gridSize) {

          // Inside the footer band the lattice fades to nothing (handoff to
          // BubbleField). Fully faded rows skip all the repulsion math too.
          let bandFade = 1;
          if (gy >= fadeStartY) {
            bandFade = 1 - (gy - fadeStartY) * fadeInvLen;
            if (bandFade <= 0) continue;
          }

          const dxc = gx - mx;
          const dyc = gy - my;
          const distFromCursorSq = dxc * dxc + dyc * dyc;

          let totalDx = 0, totalDy = 0;
          let distFromCursor = -1;

          if (distFromCursorSq < repulsionRadiusSq && distFromCursorSq > 0) {
            distFromCursor = Math.sqrt(distFromCursorSq);
            const s = ((1 - distFromCursor * repulsionRadiusInv) ** 2) * maxDisplacement;
            totalDx += (dxc / distFromCursor) * s;
            totalDy += (dyc / distFromCursor) * s;
          }

          for (let i = 0; i < trailLen; i++) {
            const p = trail[i];
            const dx = gx - p.x, dy = gy - p.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < repulsionRadiusSq && dSq > 0) {
              const d = Math.sqrt(dSq);
              const fadeStr = (1 - p.age / maxTrailAge) * 0.45;
              const s = ((1 - d * repulsionRadiusInv) ** 2) * maxDisplacement * fadeStr;
              totalDx += (dx / d) * s;
              totalDy += (dy / d) * s;
            }
          }

          // Cursor physics attenuate together with the lattice as it fades
          // into the footer band — a merging BubbleField dot sits at the
          // UNDISPLACED lattice point, so the real dot must not be shoved
          // aside (or glow-brightened) right where the merge happens.
          const drawX = gx + totalDx * bandFade;
          const drawY = gy + totalDy * bandFade;

          let minGlowDist = distFromCursor >= 0 ? distFromCursor : Math.sqrt(distFromCursorSq);
          for (let i = 0; i < trailLen; i++) {
            const p = trail[i];
            const d = Math.sqrt((gx - p.x) ** 2 + (gy - p.y) ** 2) + p.age * 3.5;
            if (d < minGlowDist) minGlowDist = d;
          }

          let opacity = baseOpacity;
          let radius = baseRadius;
          if (minGlowDist < glowRadius) {
            const t = ((1 - minGlowDist * glowRadiusInv) ** 2) * bandFade;
            opacity = baseOpacity + (activeOpacity - baseOpacity) * t;
            radius = baseRadius + (activeRadius - baseRadius) * t;
          }

          if (distFromCursor < 0 && distFromCursorSq < repulsionRadiusSq) {
            distFromCursor = Math.sqrt(distFromCursorSq);
          }

          if (distFromCursor >= 0 && distFromCursor < repulsionRadius) {
            const dim = Math.min(1, Math.max(0, (distFromCursor * repulsionRadiusInv) * 1.5 - 0.2));
            opacity *= 1 - bandFade * (1 - dim); // dim attenuates in the band too
          }

          opacity *= bandFade;

          if (opacity > 0.04) {
            gridCtx.beginPath();
            gridCtx.arc(drawX, drawY, radius, 0, Math.PI * 2);
            gridCtx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
            gridCtx.fill();
          }
        }
      }

    };

    let staticFrameId = 0;
    // Coalesce scroll/resize redraws (reduced-motion mode) into one frame.
    const scheduleStaticFrame = () => {
      if (staticFrameId) return;
      staticFrameId = requestAnimationFrame(() => {
        staticFrameId = 0;
        drawFrame();
      });
    };

    const loop = () => {
      drawFrame();
      animationFrameId = requestAnimationFrame(loop);
    };

    // Reduced motion swaps the rAF loop for static frames redrawn on scroll
    // and resize — the dots hold still, but the footer-fade band keeps
    // tracking the footer's viewport position (scroll is user-initiated, not
    // autonomous motion).
    const applyMode = () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', scheduleStaticFrame);
      if (reduce) {
        window.addEventListener('scroll', scheduleStaticFrame, { passive: true });
        scheduleStaticFrame();
      } else {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const onResize = () => {
      resize();
      if (reduce) scheduleStaticFrame();
    };
    window.addEventListener('resize', onResize);

    const onPrefChange = (e: MediaQueryListEvent) => {
      reduce = isTouch || e.matches; // touch stays still regardless of pref
      applyMode();
    };
    if (reduceMQ) {
      if (reduceMQ.addEventListener) {
        reduceMQ.addEventListener('change', onPrefChange);
      } else if (reduceMQ.addListener) {
        reduceMQ.addListener(onPrefChange); // Safari < 14 fallback
      }
    }

    applyMode();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', scheduleStaticFrame);
      cancelAnimationFrame(animationFrameId);
      if (staticFrameId) cancelAnimationFrame(staticFrameId);
      if (reduceMQ) {
        if (reduceMQ.removeEventListener) {
          reduceMQ.removeEventListener('change', onPrefChange);
        } else if (reduceMQ.removeListener) {
          reduceMQ.removeListener(onPrefChange);
        }
      }
    };
  }, []);

  return (
    // h-full w-full pins the CSS size to the viewport — the backing store is
    // dpr-scaled, so without an explicit CSS size the canvas would render 2×.
    <canvas ref={gridCanvasRef} className="fixed inset-0 z-0 h-full w-full pointer-events-none" />
  );
}
