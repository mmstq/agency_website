'use client';

import { useEffect, useRef } from 'react';

/**
 * WaveGrid — calm ambient OCEAN-SWELL dot field for the footer.
 *
 * Reads like a real sea surface receding toward the horizon, NOT a wind-blown
 * curtain. The curtain failure comes from purely-vertical, equal-amplitude,
 * in-lockstep motion (symmetric sine humps). This kills that on every axis:
 *
 *  1. TRUE GERSTNER / TROCHOIDAL ORBIT — each grid point is a fixed REST
 *     position; per wave it receives a vertical height term `A*sin(phase)` AND
 *     a horizontal term `Q*A*dir*cos(phase)` pushed along the wave's OWN travel
 *     direction (both dispX and dispY from the cos term). Points physically
 *     bunch toward crests and spread in troughs — elliptical orbits. This is
 *     the single strongest anti-curtain cue: a pure height-field cannot do it.
 *
 *  2. SHARP CRESTS + BROAD FLAT TROUGHS — the horizontal crowding plus an
 *     enforced steepness budget (Sum Q*k*A = STEEP_BUDGET < 1, so the trochoid
 *     never self-intersects/pinches) yields peaked crests and flat troughs, not
 *     rounded sine humps.
 *
 *  3. DOMINANT SWELL + CROSS-SWELLS — one long, slow roller carries most of the
 *     energy, with several shorter cross-swells coming from multiple quadrants
 *     (genuinely different angles AND mutually non-commensurate wavelengths) so
 *     the field interferes and never visibly resyncs. Short chop rides faster
 *     than the long swell (deep-water sqrt(k)-style dispersion).
 *
 *  4. PERSPECTIVE LATTICE — screen-y is distance. A variable-step walk makes
 *     the grid dense / small / fast / faint near a virtual horizon (top) and
 *     sparse / large / slow / bright near the viewer (bottom), with a
 *     deterministic per-row x-offset so the rest grid never reads as a rigid
 *     lattice in deep troughs. The sea visibly recedes.
 *
 *  5. CONCENTRATED CREST GLINT — only the very crest tips brighten/enlarge, via
 *     a high-power easing curve pow(crestNorm, GLINT_POWER), tied to the actual
 *     trochoid height at the drawn point (sun-glint / foam), not a uniform glow.
 *
 *  6. HEAVY, SLOW MOTION — small angular frequencies give a long swell period.
 *
 * A single very-low-frequency sine modulates each wave's amplitude only (one
 * cheap lookup, not the geometry) so crests aren't perfectly parallel rulers.
 *
 * Monochrome white only. No cursor interaction (calm ambient variant). Pure
 * canvas 2D + requestAnimationFrame + refs, no external libraries. Respects
 * prefers-reduced-motion (single static frame, live toggle support). Sits
 * inside a `relative` container (the footer) and fills it.
 */

interface GerstnerWave {
  /** unit direction of travel (dx, dy), measured from +x */
  dx: number;
  dy: number;
  /** spatial wavenumber k = 2π / wavelength (radians per px) */
  k: number;
  /** vertical amplitude in px (the height term reaches ±amp) */
  amp: number;
  /** angular frequency ω in radians/second — small ⇒ long, heavy period */
  omega: number;
  /** raw steepness weight 0..1 (normalised later against the budget) */
  steepWeight: number;
  /** static phase offset so the waves don't all start aligned */
  phase: number;
  /** low-frequency amplitude-modulation rate (rad/s) for organic non-repeat */
  modRate: number;
  /** phase offset of that modulation */
  modPhase: number;
}

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TWO_PI = Math.PI * 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const reduceMQ =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    // ---- TUNABLES -----------------------------------------------------------
    const BASE_SPACING = 26; // nominal rest spacing of the dot lattice (px).
    const NEAR_SPACING_MUL = 1.5; // bottom rows this much sparser (close up).
    const FAR_SPACING_MUL = 0.62; // horizon rows this much denser (far away).
    const PAD = 80; // overscan so dots pushed in/out at edges never pop.

    const BASE_RADIUS = 0.7; // dot radius deep in a trough (px).
    const CREST_RADIUS = 2.8; // dot radius at the very tip of a crest (px).
    const BASE_OPACITY = 0.08; // trough alpha — barely there, keeps text legible.
    const CREST_OPACITY = 0.66; // crest alpha — bright but never blown out.

    const GLINT_POWER = 3.8; // higher ⇒ highlight squeezed onto the very tips.
    const STEEP_BUDGET = 0.9; // Σ Qᵢ·kᵢ·Aᵢ target (<1 avoids pinching/looping).

    // Depth / foreshortening (depth d: 0 at horizon=top → 1 near viewer=bottom).
    const NEAR_AMP_SCALE = 1.0; // amplitude & size multiplier at the bottom edge.
    const FAR_AMP_SCALE = 0.42; // amplitude & size multiplier at the horizon.
    const NEAR_LEN_MUL = 1.0; // near waves appear at full wavelength.
    const FAR_LEN_MUL = 0.6; // horizon waves appear shorter.
    const NEAR_SPEED_MUL = 0.8; // near waves churn slower.
    const FAR_SPEED_MUL = 1.35; // horizon waves churn faster (recede quickly).
    const FAR_FADE = 0.45; // alpha multiplier at the horizon (atmospheric haze).
    const FAR_SIZE = 0.6; // dot-size multiplier at the horizon.

    // Virtual horizon sits a little above the top edge so even the densest top
    // rows are still in motion rather than frozen at d=0.
    const HORIZON_OVERSHOOT = 0.25; // fraction of height "above" the top edge.

    const AMP_MOD_DEPTH = 0.22; // how much the low-freq mod swings amplitude.
    // ------------------------------------------------------------------------

    const deg = (d: number) => (d * Math.PI) / 180;
    const makeWave = (
      angleDeg: number,
      wavelength: number,
      amp: number,
      omega: number,
      steepWeight: number,
      phase: number,
      modRate: number,
      modPhase: number,
    ): GerstnerWave => ({
      dx: Math.cos(deg(angleDeg)),
      dy: Math.sin(deg(angleDeg)),
      k: TWO_PI / wavelength,
      amp,
      omega,
      steepWeight,
      phase,
      modRate,
      modPhase,
    });

    // Wave set. Index 0 is the dominant long swell (most energy, slowest); the
    // rest are shorter cross-swells from BOTH sides (multi-quadrant headings are
    // essential for the interfering, non-curtain read). angleDeg ≈ 90 means the
    // swell rolls roughly "up the band" toward the horizon. Wavelengths are
    // mutually non-commensurate so the summed field does not visibly loop, and
    // shorter waves carry higher ω (deep-water sqrt(k)-style dispersion) so chop
    // rides faster than the long swell while every ω stays slow/heavy overall.
    const waves: GerstnerWave[] = [
      // Dominant swell — long, tall, slow, sets the overall roll.
      makeWave(78, 580, 15.0, 0.30, 1.0, 0.0, 0.061, 0.0),
      // Secondary swell — shorter, slightly off-angle, a touch quicker.
      makeWave(60, 320, 7.0, 0.46, 0.8, 1.7, 0.083, 1.2),
      // Cross-swell from the other side — breaks the directional grain.
      makeWave(108, 214, 4.0, 0.62, 0.6, 3.9, 0.097, 2.6),
      // Cross-swell, other quadrant again, finer.
      makeWave(132, 150, 2.6, 0.80, 0.5, 2.4, 0.113, 4.1),
      // Fine chop — small, animates crest detail without fast flutter.
      makeWave(48, 104, 1.7, 1.02, 0.4, 5.2, 0.127, 5.5),
    ];

    // Solve per-wave steepness Qᵢ so that Σ Qᵢ·kᵢ·Aᵢ = STEEP_BUDGET, splitting
    // the budget across waves in proportion to their steepWeight. Each wave's
    // own pinch contribution is then Qᵢ·kᵢ·Aᵢ = share, guaranteeing the total
    // trochoid steepness stays under 1 (no self-intersecting loops/pinching).
    const weightSum = waves.reduce((s, w) => s + w.steepWeight, 0);
    const qFactor = waves.map((w) => {
      const denom = w.k * w.amp;
      if (denom <= 0 || weightSum <= 0) return 0;
      const share = (w.steepWeight / weightSum) * STEEP_BUDGET;
      return share / denom; // ⇒ qFactor * k * amp === share
    });

    const wlen = waves.length;
    // Sum of base amplitudes — used to normalise the crest detector to [0,1].
    let ampSum = 0;
    for (let i = 0; i < wlen; i++) ampSum += waves[i].amp;
    const invAmpSum = ampSum > 0 ? 1 / ampSum : 0;

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // High-power smooth ease concentrating brightness onto crest tips.
    const glint = (c: number) => {
      const x = c < 0 ? 0 : c > 1 ? 1 : c;
      return Math.pow(x, GLINT_POWER);
    };

    let cssW = 0;
    let cssH = 0;

    /**
     * Draw a single frame at swell-time `t` (seconds; ω carries the speed).
     *
     * Walks the perspective lattice top→bottom with a VARIABLE step: rows are
     * dense near the virtual horizon (top) and grow sparser toward the viewer
     * (bottom). Each row carries depth-scaled amplitude / wavelength / speed /
     * size / fade. Within a row, every dot is a REST position displaced by the
     * full 2D Gerstner sum (horizontal crowding kept un-normalised so the
     * sideways bunching stays strong). A guard bounds the walk so a degenerate
     * tiny canvas can never infinite-loop.
     */
    const drawFrame = (t: number) => {
      ctx.clearRect(0, 0, cssW, cssH);

      const horizonY = -cssH * HORIZON_OVERSHOOT; // virtual horizon above top
      const span = cssH - horizonY; // total virtual depth span
      const invSpan = span > 0 ? 1 / span : 0;

      // Precompute each wave's current modulated amplitude (cheap: one sin per
      // wave per frame, NOT per dot — keeps crests from being parallel rulers).
      const modAmp = new Array<number>(wlen);
      for (let i = 0; i < wlen; i++) {
        const w = waves[i];
        const m = 1 + AMP_MOD_DEPTH * Math.sin(w.modRate * t + w.modPhase);
        modAmp[i] = w.amp * m;
      }

      // Start a couple of rows above the visible top so partial crests roll in.
      let y0 = -PAD;
      let guard = 0;

      while (y0 <= cssH + PAD && guard < 6000) {
        guard++;

        // Depth for this row: 0 at horizon, 1 at the bottom edge (near viewer).
        const depth = clamp01((y0 - horizonY) * invSpan);

        // Depth-driven field parameters.
        const ampScale = lerp(FAR_AMP_SCALE, NEAR_AMP_SCALE, depth);
        const lenMul = lerp(FAR_LEN_MUL, NEAR_LEN_MUL, depth); // near = longer
        const speedMul = lerp(FAR_SPEED_MUL, NEAR_SPEED_MUL, depth);
        const invLenMul = lenMul > 0 ? 1 / lenMul : 1;
        const depthSize = lerp(FAR_SIZE, 1.0, depth);
        const depthFade = lerp(FAR_FADE, 1.0, depth);

        // Variable row/column spacing: dense (far) at top, sparse (near) at the
        // bottom — the perspective lattice. Guard against a non-positive step.
        const rowSpacing = Math.max(
          4,
          BASE_SPACING * lerp(FAR_SPACING_MUL, NEAR_SPACING_MUL, depth),
        );
        const colSpacing = rowSpacing;

        // Deterministic per-row horizontal offset breaks the rigid grid so deep
        // troughs don't reveal a lattice, without shimmering frame-to-frame.
        const rowOffset = (Math.sin(y0 * 0.013) * 0.5 + 0.5) * colSpacing;

        for (
          let x0 = -PAD + rowOffset;
          x0 <= cssW + PAD;
          x0 += colSpacing
        ) {
          let dispX = 0; // horizontal Gerstner crowding (px)
          let dispY = 0; // vertical height + orbit (px); +ve = downward
          let crestSum = 0; // weighted Σ sin(phase) → crest detection

          for (let i = 0; i < wlen; i++) {
            const w = waves[i];
            // phase = k·(dir·rest)·(1/lenMul) − ω·speedMul·t + offset.
            // Larger lenMul (near) ⇒ longer apparent wave; speedMul scales pace.
            const proj = (w.dx * x0 + w.dy * y0) * w.k * invLenMul;
            const ph = proj - w.omega * speedMul * t + w.phase;
            const s = Math.sin(ph);
            const c = Math.cos(ph);

            const a = modAmp[i] * ampScale;
            // Horizontal term Q·A·dir·cos crowds points toward crests — pushed
            // along the FULL wave direction (dispX AND dispY), not x-only, so
            // the dominant near-vertical swell still gets horizontal crowding.
            const horiz = qFactor[i] * a * c;
            dispX += horiz * w.dx;
            dispY += horiz * w.dy;
            // Vertical height term A·sin.
            dispY += a * s;

            crestSum += s * waves[i].amp;
          }

          // Screen position. Subtract dispY so a positive height lifts the dot
          // UP the screen (toward the horizon), matching a real crest.
          const px = x0 + dispX;
          const py = y0 - dispY;

          // Cull dots that ended up outside the visible canvas.
          if (px < -4 || px > cssW + 4 || py < -4 || py > cssH + 4) continue;

          // Normalised crest height [0,1]; ~1 = a wave tip. Tied to the true
          // weighted surface sum so the glint sits on the geometric tip.
          const crestNorm = clamp01(crestSum * invAmpSum * 0.5 + 0.5);
          const lit = glint(crestNorm);

          // Size & brightness follow the glint curve; depth hazes the horizon.
          const radius =
            (BASE_RADIUS + (CREST_RADIUS - BASE_RADIUS) * lit) * depthSize;
          let alpha =
            (BASE_OPACITY + (CREST_OPACITY - BASE_OPACITY) * lit) * depthFade;
          if (alpha > CREST_OPACITY) alpha = CREST_OPACITY;

          if (radius <= 0.05 || alpha <= 0.012) continue;

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, TWO_PI);
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.fill();
        }

        y0 += rowSpacing;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Re-render the static frame immediately when motion is reduced.
      if (reduceMQ && reduceMQ.matches) drawFrame(2.0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let rafId = 0;
    let running = false;

    const loop = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const t = (now - startRef.current) / 1000; // seconds; ω carries the speed
      drawFrame(t);
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const start = () => {
      if (reduceMQ && reduceMQ.matches) {
        stop();
        drawFrame(2.0); // single representative static frame; no loop.
        return;
      }
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };

    // Re-evaluate live if the user toggles the reduced-motion preference.
    const onPrefChange = () => {
      stop();
      startRef.current = 0;
      start();
    };
    if (reduceMQ) {
      if (reduceMQ.addEventListener) {
        reduceMQ.addEventListener('change', onPrefChange);
      } else if (reduceMQ.addListener) {
        reduceMQ.addListener(onPrefChange); // Safari < 14 fallback
      }
    }

    start();

    return () => {
      stop();
      ro.disconnect();
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
