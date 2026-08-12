# AnalyticsCard Animation Design & Decision Log

> Historical implementation record. The behavior described here is implemented in `src/components/AnalyticsCard.tsx`; use the component, `DESIGN.md`, and `AGENTS.md` as current authority.

## Understanding Summary
* **What is being built:** A dynamic, continuous physics-like rotation animation for the inner rings in `AnalyticsCard.tsx`.
* **Why it exists:** To give the card an engaging, interactive "living" feel rather than a rigid stop-and-start animation.
* **Key Behavior:** 
  1. **Hover:** Starts spinning fast from current angle.
  2. **While Hovered:** Linearly decelerates to a continuous, slower rotation (never stopping).
  3. **Un-hover:** Smoothly decelerates back to a complete stop, locking at whatever angle it reached.
* **Explicit Non-goals:** We are not building a pre-baked CSS keyframe loop because it cannot smoothly resume or pause velocity on demand without jarring jumps.

## Assumptions
* **Performance / Libraries:** We assume we should implement this using a highly performant native `requestAnimationFrame` React hook to directly update the rotation degree bypass expensive React state renders. No extra node packages (like `framer-motion`) will be installed to keep the UI light.

## Decision Log

**Decision 1: Which animation technology to use?**
* **Decided:** Option 1 - Custom `requestAnimationFrame` Hook.
* **Alternatives considered:** Pure CSS transitions, Framer Motion.
* **Why this option was chosen:** Pure CSS cannot handle dynamic speed interpolation or resume from paused angles without complex logic. Framer Motion would require installing a heavy external dependency for a single component. The native hook provides absolute control and zero bundle size overhead.

**Decision 2: Architecture & DOM Updates**
* **Decided:** Use React `useRef` pointing to the ring DOM nodes, and update their `style.transform` directly inside `requestAnimationFrame`.
* **Alternatives considered:** Updating a React component `useState` numeric variable.
* **Why this option was chosen:** Triggering a `useState` update 60 times a second causes unnecessary Virtual DOM diffing. Bypassing React and mutating the DOM directly inside a frame loop guarantees butter-smooth 60+ FPS performance without locking the main thread.

**Decision 3: Battery Management**
* **Decided:** Stop the `requestAnimationFrame` loop when the rings hit 0 speed.
* **Alternatives considered:** Leaving it running infinitely in the background with a 0 delta.
* **Why this option was chosen:** Leaving invisible frame loops running drains laptop/mobile batteries. The loop will only be active when an animation is visually happening.

## Implemented Design
1. Remove all `transition-transform` and `group-hover:rotate` classes from the inner rings in `AnalyticsCard.tsx`.
2. Attach `useRef<HTMLDivElement>` to the two inner rings that need spinning, and a speed reference `const speed = useRef(0)`.
3. Configure physics constants: `FAST_SPEED`, `SLOW_SPEED`, `DECELERATION_RATE`.
4. Wrap the card in handlers: `onMouseEnter={() => speedTarget=FAST}` and `onMouseLeave={() => speedTarget=0}`.
5. Setup a `requestAnimationFrame` loop in a `useEffect` that updates `currentAngle` and applies it to the ring refs continuously when active.
