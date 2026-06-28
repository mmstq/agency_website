'use client';

import { useEffect, useRef } from 'react';

/**
 * BubbleField — the footer's "dot foundry": the site's background lattice is
 * visibly FORMED here, from bubbles rising off the bottom of the page.
 *
 * The story, bottom → top:
 *  1. RISE — bubbles seep up from the bottom edge, wobbling side to side like
 *     the dive-shot reference (free, chaotic).
 *  2. MORPH — as a bubble climbs into the upper half it organizes: the wobble
 *     damps to zero (sliding it exactly onto its 32px lattice column), the ring
 *     + glint deflate, radius shrinks to the grid's dot radius and alpha eases
 *     to the grid's local dot alpha. Chaos → order, continuously.
 *  3. DOCK — it then glides onto a REAL lattice row of the global CanvasGrid,
 *     chosen randomly across the formed band so arrivals land everywhere in
 *     the half-crystallized lattice, not on one stripe (viewport-fixed rows
 *     are re-projected into footer space every frame, so a docking dot stays
 *     glued to its grid dot even mid-scroll), decelerating as it arrives.
 *  4. MERGE — sitting exactly on a lattice point, it fades out over ~0.8s on
 *     top of the grid's own dot there (a brief brighten-then-settle pulse), so
 *     the dot appears to STAY — the bubble has become a background dot. The
 *     bubble respawns below and the cycle continues.
 *
 * CanvasGrid mirrors this from its side: its lattice fades from full strength
 * at the footer's top edge to zero at the footer's bottom (GRID_FADE_FRAC must
 * match), so the band reads as a half-crystallized lattice being fed from
 * below — not two unrelated layers stacked.
 *
 * The GRID_* constants must stay in sync with CanvasGrid's tunables
 * (gridSize / baseRadius / baseOpacity and its footer-fade length).
 *
 * Monochrome white to match the design tokens. Pure canvas 2D + rAF + refs, no
 * libraries (per project rules). Respects prefers-reduced-motion: one static
 * frame (bubbles at the bottom, dots toward the top — the gradient still
 * tells the story), no rise; live toggle support. An IntersectionObserver
 * pauses the whole simulation while the footer is offscreen. Sits inside the
 * `relative`, `overflow-hidden` footer and fills it.
 */

interface Bubble {
  /** lattice-column x the wobble oscillates around (px, footer-local) */
  baseX: number;
  /** current y, measured from the footer top (px); decreases as it rises */
  y: number;
  /** free-bubble radius (px) — morphs down to GRID_DOT_R near the top */
  r: number;
  /** rise speed (px/sec) — upward */
  vy: number;
  /** horizontal wobble amplitude (px) */
  wobbleAmp: number;
  /** wobble angular frequency (rad/sec) */
  wobbleFreq: number;
  /** wobble phase offset (rad) */
  wobblePhase: number;
  /** free-bubble brightness ceiling (0..1) — morphs to the grid's alpha */
  baseAlpha: number;
  /** height fraction this bubble climbs to before it morphs + docks (size-set:
   *  big bubbles → near DOCK_TOP_FRAC/high, small → near DOCK_LOW_FRAC/low) */
  dockFrac: number;
  /** docking state: locked onto a lattice row, gliding in / merging */
  docking: boolean;
  /** viewport lattice row index n (row y = GRID_SIZE/2 + n·GRID_SIZE) */
  dockRow: number;
  /** seconds spent merged on the lattice point (drives the fade-out) */
  dockT: number;
}

export default function BubbleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const TWO_PI = Math.PI * 2;

    const reduceMQ =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null;

    // ---- TUNABLES -----------------------------------------------------------
    // Lattice constants — MUST match CanvasGrid (gridSize / baseRadius /
    // baseOpacity / footer-fade length) or the dock-and-merge illusion breaks.
    const GRID_SIZE = 32; // CanvasGrid lattice spacing (columns AND rows).
    const GRID_DOT_R = 0.8; // CanvasGrid baseRadius — the formed-dot radius.
    const GRID_DOT_ALPHA = 0.22; // CanvasGrid baseOpacity — formed-dot alpha.
    const GRID_FADE_FRAC = 1.0; // CanvasGrid's lattice fades to 0 across this
    //                             fraction of the footer height (1.0 = bottom).

    // How high a bubble climbs before it morphs into a dot and merges is set by
    // its SIZE: each bubble gets a personal dock line between these two fractions
    // (see seed). Big, buoyant bubbles reach DOCK_TOP_FRAC (the bright top of the
    // band); small ones only reach DOCK_LOW_FRAC and dissolve down low.
    const DOCK_TOP_FRAC = 0.1; // highest a bubble can reach (the biggest bubbles).
    const DOCK_LOW_FRAC = 0.58; // lowest a bubble reaches (the smallest bubbles).
    const REACH_SIZE_BIAS = 0.8; // how strongly SIZE (vs. random jitter) sets the
    //                             reach between those two: 1 = purely size, 0 =
    //                             all-random (the old size-independent spread).
    const MORPH_SPAN_FRAC = 0.25; // bubble→dot morph happens across this span
    //                               just below each bubble's own dock line.
    const MERGE_S = 0.8; // seconds a docked dot takes to fade into the grid.
    const APPROACH_EASE_PX = 48; // deceleration radius approaching the row.
    const GLIDE_MIN = 36; // px/s floor while gliding to a row (no crawling).

    const AREA_PER_BUBBLE = 7000; // footer px² per bubble (lower ⇒ denser).
    const MIN_BUBBLES = 18;
    const MAX_BUBBLES = 220;
    const PAD = 28; // spawn-below margin beyond the bottom edge.

    const R_MIN = 0.8; // smallest free-bubble radius (px).
    const R_MAX = 3.4; // largest free-bubble radius (px).

    const RISE_MIN = 15; // base rise speed (px/s).
    const RISE_PER_R = 9; // extra px/s per px of radius (bigger ⇒ faster).
    const RISE_JITTER = 11; // random rise spread (px/s).

    const WOBBLE_AMP_MIN = 3; // sideways sway range (px). Max stays well under
    const WOBBLE_AMP_MAX = 12; // half the grid spacing so columns stay legible.
    const WOBBLE_FREQ_MIN = 0.4; // sway rate (rad/s) — slow, lazy drift.
    const WOBBLE_FREQ_MAX = 1.5;

    const ALPHA_MIN = 0.30; // dimmest free bubble — the grid's base opacity.
    const ALPHA_MAX = 0.48; // brightest bubble ceiling — keeps text legible.

    const FADE_BOTTOM = 0.06; // bottom fraction over which bubbles fade in.

    const RING_MIN_R = 1.1; // (effective) radius above which a bubble gets a
    const GLINT_MIN_R = 1.8; // defined outline ring / a highlight glint.
    // ------------------------------------------------------------------------

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let cssW = 0;
    let cssH = 0;
    let bubbles: Bubble[] = [];

    // (Re)seed a bubble. `atBottom` parks it below the bottom edge so it rises
    // into view; otherwise it's scattered across the full height (initial fill,
    // so the field is already populated on the first frame).
    const seed = (b: Bubble, atBottom: boolean): Bubble => {
      // Square the roll so most bubbles are small — a fine mist with a few
      // larger, defined bubbles, like a real bubble column.
      const roll = Math.random() * Math.random();
      const r = R_MIN + roll * (R_MAX - R_MIN);
      b.r = r;
      const rNorm = (r - R_MIN) / (R_MAX - R_MIN);
      // How high THIS bubble climbs before it morphs into a dot and merges —
      // set by SIZE. Big, buoyant bubbles reach DOCK_TOP_FRAC (the bright top);
      // small ones only reach DOCK_LOW_FRAC and dissolve low. Jitter keeps one
      // size off a single shared row.
      const reach = clamp01(
        rNorm * REACH_SIZE_BIAS + Math.random() * (1 - REACH_SIZE_BIAS),
      );
      b.dockFrac = lerp(DOCK_LOW_FRAC, DOCK_TOP_FRAC, reach);
      // Spawn on the SAME lattice columns as CanvasGrid (centers at
      // GRID_SIZE/2 + n·GRID_SIZE; the fixed grid and the full-bleed footer
      // share x = 0), so each stream lines up under a column of grid dots.
      const col = Math.round((rand(-PAD, cssW + PAD) - GRID_SIZE / 2) / GRID_SIZE);
      b.baseX = GRID_SIZE / 2 + col * GRID_SIZE;
      b.y = atBottom
        ? cssH + PAD + Math.random() * cssH * 0.45 // staggered respawn below
        : cssH * b.dockFrac + Math.random() * cssH * (1 - b.dockFrac);
      b.vy = RISE_MIN + r * RISE_PER_R + Math.random() * RISE_JITTER;
      b.wobbleAmp = rand(WOBBLE_AMP_MIN, WOBBLE_AMP_MAX);
      b.wobbleFreq = rand(WOBBLE_FREQ_MIN, WOBBLE_FREQ_MAX);
      b.wobblePhase = Math.random() * TWO_PI;
      b.baseAlpha = ALPHA_MIN + rNorm * (ALPHA_MAX - ALPHA_MIN);
      b.docking = false;
      b.dockRow = 0;
      b.dockT = 0;
      return b;
    };

    const build = () => {
      const count = Math.max(
        MIN_BUBBLES,
        Math.min(MAX_BUBBLES, Math.round((cssW * cssH) / AREA_PER_BUBBLE)),
      );
      bubbles = new Array(count);
      for (let i = 0; i < count; i++) bubbles[i] = seed({} as Bubble, false);
    };

    // The grid's dot alpha at a footer-local y — mirrors CanvasGrid's footer
    // fade exactly, so a merging bubble lands on the alpha the real dot has.
    const gridAlphaAt = (y: number) =>
      GRID_DOT_ALPHA * clamp01(1 - y / (cssH * GRID_FADE_FRAC));

    const drawBubble = (b: Bubble, t: number) => {
      const y = b.y;

      // morph: 1 = free bubble (below its dock line), 0 = lattice dot (its dock
      // line and above). Drives wobble, radius, ring and alpha — the bubble
      // organizes continuously as it climbs, so docking never pops. FROZEN at 0
      // while docking: a scroll that drags a docked dot below the line must not
      // re-inflate it into a wobbling bubble. The line is per-bubble (size-set),
      // so big bubbles stay bubbles higher up and small ones morph low.
      const morph = b.docking
        ? 0
        : clamp01((y - cssH * b.dockFrac) / (cssH * MORPH_SPAN_FRAC));

      const wobble = b.wobbleAmp * morph;
      const x = b.baseX + wobble * Math.sin(b.wobbleFreq * t + b.wobblePhase);
      if (x < -4 || x > cssW + 4) return;

      const fadeBottom = clamp01((cssH - y) / (cssH * FADE_BOTTOM));
      const gridAlpha = gridAlphaAt(y);

      // Free bubbles carry their own brightness; formed dots carry the grid's.
      let alpha = lerp(gridAlpha, b.baseAlpha, morph) * fadeBottom;
      // Merging on a lattice point: fade out ON TOP of the real grid dot — the
      // overlap brightens briefly, then settles to the dot alone (absorbed).
      if (b.docking && b.dockT > 0) {
        alpha = gridAlpha * (1 - b.dockT / MERGE_S);
      }
      if (alpha <= 0.012) return;

      const r = lerp(GRID_DOT_R, b.r, morph);
      const defined = r > RING_MIN_R;

      // Body. Formed dots are full-alpha fills, identical to the grid's dots;
      // defined bubbles take a softer fill since their ring + glint carry the
      // brightness.
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TWO_PI);
      ctx.fillStyle = `rgba(255,255,255,${(defined ? alpha * 0.7 : alpha).toFixed(3)})`;
      ctx.fill();

      // Defined bubbles get a brighter outline ring (+ a glint highlight) —
      // both deflate away as the bubble morphs down toward dot size.
      if (defined) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, TWO_PI);
        ctx.lineWidth = Math.max(0.5, r * 0.26);
        ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.stroke();

        if (r > GLINT_MIN_R) {
          const gr = Math.max(0.4, r * 0.22);
          ctx.beginPath();
          ctx.arc(x - r * 0.32, y - r * 0.32, gr, 0, TWO_PI);
          ctx.fillStyle = `rgba(255,255,255,${(alpha * 0.9).toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    // Advance + draw one frame. `dt` is the real elapsed time (clamped so a
    // backgrounded tab can't teleport every bubble on the catch-up frame).
    const drawFrame = (t: number, dt: number) => {
      ctx.clearRect(0, 0, cssW, cssH);

      // CanvasGrid's lattice is viewport-fixed; bubbles live in footer space.
      // One rect read per frame projects the real lattice rows into local
      // coords, so docked dots stay glued to their grid dots even mid-scroll.
      const rectTop = canvas.getBoundingClientRect().top;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        // This bubble's personal dock line — set by its size in seed().
        const dockLineY = cssH * b.dockFrac;

        if (!b.docking) {
          b.y -= b.vy * dt; // free rise
          if (b.y <= dockLineY) {
            // Reached its size-set ceiling — dock onto the nearest REAL lattice
            // row right here (it has already morphed into a dot by now).
            b.dockRow = Math.floor((b.y + rectTop - GRID_SIZE / 2) / GRID_SIZE);
            b.docking = true;
            b.dockT = 0;
          }
        } else {
          const targetY = GRID_SIZE / 2 + b.dockRow * GRID_SIZE - rectTop;
          if (targetY < -PAD || targetY > cssH + PAD) {
            // Scroll carried the row out of the footer — recycle quietly.
            seed(b, true);
            continue;
          }
          if (b.dockT > 0) {
            // MERGING — pinned to the viewport row in BOTH scroll directions
            // (a per-frame chase could never keep up with real scrolling).
            b.y = targetY;
            b.dockT += dt;
            if (b.dockT >= MERGE_S) {
              seed(b, true); // fully merged — the grid dot carries on
              continue;
            }
          } else {
            const dist = b.y - targetY;
            if (dist < -0.5) {
              // Scroll swept the row below the bubble — re-aim at the nearest
              // row above instead of teleporting down onto the old one.
              b.dockRow = Math.floor((b.y + rectTop - GRID_SIZE / 2) / GRID_SIZE);
            } else if (dist <= 0.5) {
              b.y = targetY;
              b.dockT += dt; // arrived — latch into the merge
            } else {
              // Glide in, decelerating over the last APPROACH_EASE_PX.
              const ease = Math.max(0.3, Math.min(1, dist / APPROACH_EASE_PX));
              b.y -= Math.min(dist, Math.max(b.vy, GLIDE_MIN) * ease * dt);
            }
            // Dragged back under the dock line by a scroll-down — resume the
            // free rise (morph un-freezes smoothly just below the line).
            if (b.y > dockLineY + GRID_SIZE) {
              b.docking = false;
              b.dockT = 0;
            }
          }
        }

        drawBubble(b, t);
      }
    };

    const drawStatic = () => {
      // Single still frame: bubbles at the bottom, formed dots toward the top
      // — the chaos→order gradient still reads without any motion.
      ctx.clearRect(0, 0, cssW, cssH);
      for (let i = 0; i < bubbles.length; i++) drawBubble(bubbles[i], 0);
    };

    const resize = () => {
      // dpr re-read per resize — browser zoom / monitor moves change it.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduceMQ && reduceMQ.matches) drawStatic();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let rafId = 0;
    let running = false;
    let startMs = 0;
    let lastMs = 0;
    let visible = false; // gated by the IntersectionObserver below

    const loop = (now: number) => {
      if (!startMs) {
        startMs = now;
        lastMs = now;
      }
      const t = (now - startMs) / 1000;
      let dt = (now - lastMs) / 1000;
      if (dt > 0.05) dt = 0.05; // cap catch-up jumps (tab refocus)
      lastMs = now;
      drawFrame(t, dt);
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const start = () => {
      if (!visible) return; // footer offscreen — the IO restarts us on entry
      if (reduceMQ && reduceMQ.matches) {
        stop();
        drawStatic(); // single gradient frame; no rise.
        return;
      }
      if (running) return;
      running = true;
      startMs = 0;
      lastMs = 0;
      rafId = requestAnimationFrame(loop);
    };

    // Run the simulation only while the footer is actually on screen — no
    // point simulating + rastering bubbles nobody can see. Fires once on
    // observe, so this also performs the initial start.
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onPrefChange = () => {
      stop();
      start();
    };
    if (reduceMQ) {
      if (reduceMQ.addEventListener) {
        reduceMQ.addEventListener('change', onPrefChange);
      } else if (reduceMQ.addListener) {
        reduceMQ.addListener(onPrefChange); // Safari < 14
      }
    }

    return () => {
      stop();
      io.disconnect();
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
