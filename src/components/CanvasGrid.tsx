'use client';
import { useEffect, useRef } from 'react';

export default function CanvasGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const gridSize = 24; // Spacing between dots
    const glowRadius = 150; // Distance of the spotlight
    const baseRadius = 0.8; // Normal dot size
    const activeRadius = 2.5; // Scaled up dot size
    const baseOpacity = 0.25; // Grid faintness
    const activeOpacity = 0.8; // Glow brightness
    const maxTrailAge = 40; // Trail fade duration

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mutate trails: Age them and drop old ones
      trailRef.current = trailRef.current
        .map(p => ({ ...p, age: p.age + 1 }))
        .filter(p => p.age < maxTrailAge);

      const { x: mx, y: my } = mouseRef.current;

      // Draw the grid
      for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
        for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
          
          // Smallest distance to mouse
          let minDistance = Math.hypot(x - mx, y - my);
          
          // Compare shortest distance involving the trail
          // Older trail points project a weaker 'pull'
          for (let i = 0; i < trailRef.current.length; i++) {
            const p = trailRef.current[i];
            const dist = Math.hypot(x - p.x, y - p.y);
            const adjustedDist = dist + (p.age * 3.5); 
            if (adjustedDist < minDistance) {
              minDistance = adjustedDist;
            }
          }

          let opacity = baseOpacity;
          let radius = baseRadius;

          // Apply Spotlight & Scaling mathematically if within radius
          if (minDistance < glowRadius) {
            const intensity = 1 - (minDistance / glowRadius);
            const easedIntensity = intensity * intensity; // Smooth glow edge
            opacity = baseOpacity + (activeOpacity - baseOpacity) * easedIntensity;
            radius = baseRadius + (activeRadius - baseRadius) * easedIntensity;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
