'use client';
import { useEffect, useRef } from 'react';

export default function CanvasGrid() {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const lastMoveRef = useRef<number>(0);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      return;
    }

    const gridCanvas = gridCanvasRef.current;
    if (!gridCanvas) return;

    const gridCtx = gridCanvas.getContext('2d');
    if (!gridCtx) return;

    const resize = () => {
      gridCanvas.width = window.innerWidth;
      gridCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      lastMoveRef.current = performance.now();
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

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

    const idleThreshold = 120;

    const render = () => {
      gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

      // Age & prune repulsion trail
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].age++;
        if (trailRef.current[i].age >= maxTrailAge) trailRef.current.splice(i, 1);
      }

      const { x: mx, y: my } = mouseRef.current;

      // ── Grid dots ────────────────────────────────────────────
      const trail = trailRef.current;
      const trailLen = trail.length;
      const repulsionRadiusInv = 1 / repulsionRadius;
      const glowRadiusInv = 1 / glowRadius;

      for (let gx = gridSize / 2; gx < gridCanvas.width; gx += gridSize) {
        for (let gy = gridSize / 2; gy < gridCanvas.height; gy += gridSize) {

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

          const drawX = gx + totalDx;
          const drawY = gy + totalDy;

          let minGlowDist = distFromCursor >= 0 ? distFromCursor : Math.sqrt(distFromCursorSq);
          for (let i = 0; i < trailLen; i++) {
            const p = trail[i];
            const d = Math.sqrt((gx - p.x) ** 2 + (gy - p.y) ** 2) + p.age * 3.5;
            if (d < minGlowDist) minGlowDist = d;
          }

          let opacity = baseOpacity;
          let radius = baseRadius;
          if (minGlowDist < glowRadius) {
            const t = (1 - minGlowDist * glowRadiusInv) ** 2;
            opacity = baseOpacity + (activeOpacity - baseOpacity) * t;
            radius = baseRadius + (activeRadius - baseRadius) * t;
          }

          if (distFromCursor < 0 && distFromCursorSq < repulsionRadiusSq) {
            distFromCursor = Math.sqrt(distFromCursorSq);
          }

          if (distFromCursor >= 0 && distFromCursor < repulsionRadius) {
            opacity *= Math.max(0, (distFromCursor * repulsionRadiusInv) * 1.5 - 0.2);
          }

          if (opacity > 0.04) {
            gridCtx.beginPath();
            gridCtx.arc(drawX, drawY, radius, 0, Math.PI * 2);
            gridCtx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
            gridCtx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={gridCanvasRef} className="fixed inset-0 z-0 pointer-events-none" />
  );
}
