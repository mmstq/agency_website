'use client';
import { useEffect, useRef } from 'react';

export default function CanvasGrid() {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const lastMoveRef = useRef<number>(0);
  const snakeTrailRef = useRef<{ x: number; y: number }[]>([]);
  const wasMovingRef = useRef<boolean>(false);
  const exitProgressRef = useRef<number>(1); // 0 = just stopped, 1 = fully gone

  useEffect(() => {
    // Disable on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      document.documentElement.style.cursor = 'auto';
      return;
    }

    const gridCanvas = gridCanvasRef.current;
    const cursorCanvas = cursorCanvasRef.current;
    if (!gridCanvas || !cursorCanvas) return;
    
    const gridCtx = gridCanvas.getContext('2d');
    const cursorCtx = cursorCanvas.getContext('2d');
    if (!gridCtx || !cursorCtx) return;

    const resize = () => {
      gridCanvas.width = window.innerWidth;
      gridCanvas.height = window.innerHeight;
      cursorCanvas.width = window.innerWidth;
      cursorCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      lastMoveRef.current = performance.now();

      const target = e.target as HTMLElement;
      const isOverInteractive = !!target.closest('.card-interactive, .monolith-card, a, button');
      if (isOverInteractive) {
        snakeTrailRef.current = [];
      }
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

    // Cursor snake: keep last N sampled points for the worm visual
    const snakeMaxLen = 8;
    const snakeMinDist = 5;   
    const maxSnakePixels = 130; 
    const idleThreshold = 120;

    const render = () => {
      gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
      cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

      // Age & prune repulsion trail
      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        trailRef.current[i].age++;
        if (trailRef.current[i].age >= maxTrailAge) trailRef.current.splice(i, 1);
      }

      const { x: mx, y: my } = mouseRef.current;
      const isMoving = performance.now() - lastMoveRef.current < idleThreshold;

      // Check if mouse is over interactive element or Selected Work section to hide snake trail
      const target = document.elementFromPoint(mx, my) as HTMLElement;
      const isOverInteractive = !!target?.closest('.card-interactive, .monolith-card, a, button, #case-studies');

      if (isMoving && !wasMovingRef.current) {
        snakeTrailRef.current = [];
        exitProgressRef.current = 0;
      }

      if (!isMoving || isOverInteractive) {
        exitProgressRef.current = Math.min(1, exitProgressRef.current + 1 / 45);
      } else {
        exitProgressRef.current = 0;
      }

      wasMovingRef.current = isMoving;

      if (mx > -999 && isMoving && !isOverInteractive) {
        const trail = snakeTrailRef.current;
        const last = trail[trail.length - 1];
        if (!last || Math.hypot(mx - last.x, my - last.y) >= snakeMinDist) {
          trail.push({ x: mx, y: my });
          if (trail.length > snakeMaxLen) trail.shift();
          let totalDist = 0;
          for (let i = 0; i < trail.length - 1; i++) {
            totalDist += Math.hypot(trail[i+1].x - trail[i].x, trail[i+1].y - trail[i].y);
          }
          while (totalDist > maxSnakePixels && trail.length > 2) {
            const p1 = trail.shift()!;
            const p2 = trail[0];
            totalDist -= Math.hypot(p2.x - p1.x, p2.y - p1.y);
          }
        }
      }

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
            radius  = baseRadius  + (activeRadius  - baseRadius)  * t;
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

      // ── Custom cursor ─────────────────────────────────────────
      if (mx > -999) {
        const fullTrail = snakeTrailRef.current;
        const ep = exitProgressRef.current;

        // Slice from the tail end as exitProgress advances (linear shrink tail→head)
        const startIdx = isMoving ? 0 : Math.floor(ep * fullTrail.length);
        const trail = fullTrail.slice(startIdx);
        const tailOpacity = isMoving ? 1 : 1 - ep;

        if (trail.length > 2 && tailOpacity > 0) {
          // Worm: single continuous smooth spline drawn as ONE path.
          const n = trail.length;
          const mids: { x: number; y: number }[] = [];
          for (let i = 0; i < n - 1; i++) {
            mids.push({
              x: (trail[i].x + trail[i + 1].x) / 2,
              y: (trail[i].y + trail[i + 1].y) / 2,
            });
          }

          cursorCtx.save();
          cursorCtx.lineCap  = 'round';
          cursorCtx.lineJoin = 'round';
          cursorCtx.shadowColor = `rgba(255,255,255,${0.35 * tailOpacity})`;
          cursorCtx.shadowBlur  = 12;

          // Single continuous quadratic-bezier path
          cursorCtx.beginPath();
          cursorCtx.moveTo(trail[0].x, trail[0].y);
          for (let i = 1; i < n - 1; i++) {
            const endX = i === n - 2 ? trail[n - 1].x : mids[i].x;
            const endY = i === n - 2 ? trail[n - 1].y : mids[i].y;
            cursorCtx.quadraticCurveTo(trail[i].x, trail[i].y, endX, endY);
          }

          // Gradient: transparent at tail → opaque at head, modulated by tailOpacity
          const tail = trail[0];
          const head = trail[n - 1];
          const grad = cursorCtx.createLinearGradient(tail.x, tail.y, head.x, head.y);
          grad.addColorStop(0,   `rgba(255,255,255,0)`);
          grad.addColorStop(0.4, `rgba(255,255,255,${0.35 * tailOpacity})`);
          grad.addColorStop(1,   `rgba(255,255,255,${0.95 * tailOpacity})`);

          cursorCtx.lineWidth   = 14.0;
          cursorCtx.strokeStyle = grad;
          cursorCtx.stroke();
          cursorCtx.restore();
        }

        // Idle dot — only when fully faded out or just stopped
        if (!isMoving && ep >= 1) {
          cursorCtx.beginPath();
          cursorCtx.arc(mx, my, 12, 0, Math.PI * 2);
          cursorCtx.fillStyle = 'rgba(255,255,255,0.95)';
          cursorCtx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    document.documentElement.style.cursor = 'none';

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <canvas ref={gridCanvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <canvas ref={cursorCanvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />
    </>
  );
}
