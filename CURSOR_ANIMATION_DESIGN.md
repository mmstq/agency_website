# Cursor Glow Interactive Background Design

> Historical implementation record. `src/components/CanvasGrid.tsx`, `DESIGN.md`, and `AGENTS.md` are the current authority; details below may not reflect later touch, footer-sync, or performance refinements.

## Understanding Summary
- **What is being built:** A dynamic, interactive dot-grid background component.
- **Why it exists:** To give the website a premium "wow" factor by making the grid dots individually glow, scale, and trail the user's cursor.
- **Who it is for:** Visitors to the landing page.
- **Key Constraints:** It must sit perfectly behind the UI without blocking clicks (`pointer-events: none`).
- **Explicit Non-Goals:** No heavy WebGL/Three.js 3D logic.

## Assumptions
- **Performance:** We require absolute hardware smoothness (60fps), meaning we must bypass the standard React/DOM render cycle for the animation.
- **Responsiveness:** It must handle browser resizing implicitly.
- **Maintenance:** Extracted cleanly as an isolated `CanvasGrid.tsx` component. 

## Decision Log

### 1. Rendering Engine
- **Decided:** Pure HTML5 Canvas with `requestAnimationFrame`.
- **Alternatives Considered:** Framer Motion animating SVG/DOM nodes; third-party particle libraries (like `react-tsparticles`).
- **Why Chosen:** Rendering over 3,000 active objects in the DOM drops frame rates significantly. Pure Canvas allows deep mathematical control over scaling and trails without any external libraries.

### 2. State Management for Animation
- **Decided:** React `useRef` for tracking mouse position and trails.
- **Alternatives Considered:** Standard React `useState`.
- **Why Chosen:** Binding mouse move events to `useState` triggers full component re-renders, causing stuttering. Using `useRef` allows us to invisibly update coordinates that the `requestAnimationFrame` loop reads continuously.

## Final Design Specification

**1. Structure (`CanvasGrid.tsx`)**
A React component returning a completely unstyled `<canvas>` element setup with `fixed inset-0 z-0 pointer-events-none`.

**2. Data Tracking**
An event listener on the window capturing the mouse coordinates and writing them to `mouseRef`. A secondary array, `trailRef`, storing the last 20 coordinates to calculate the trailing path.

**3. Physics & Render Loop**
- Runs via `requestAnimationFrame`.
- **Grid Generation:** Loops by pixel intervals (e.g., 24px) to simulate a grid.
- **Proximity Math:** Calculates the Pythagorean distance between each grid unit and the `mouseRef` + `trailRef` history.
- **Rendering:** Uses `ctx.arc()` to draw dots. Proximity dictates the `opacity` (base of 0.1 rising up to 0.8) and `radius` (base of 1px scaling to 2.5px).
