# Design System Specification: High-End B2B Infrastructure

## 1. Overview & Creative North Star

### Creative North Star: "The Digital Monolith"
This design system is built to convey weight, permanence, and technological authority. It moves away from the "airy" and "playful" tropes of consumer SaaS, leaning instead into a sophisticated, moody, and editorial aesthetic. We achieve this through a "Digital Monolith" philosophy: elements should feel like they are carved from obsidian or rendered in high-fidelity glass.

### Beyond the Template
To ensure this system feels custom and premium, we utilize:
*   **Intentional Asymmetry:** Breaking standard 12-column grids with offset content blocks and overlapping "glass" layers.
*   **Tonal Depth:** Replacing harsh shadows with light-based depth (surfaces that appear to emit or catch ambient light).
*   **High-Contrast Scale:** Using massive `display-lg` typography contrasted against minute, high-spaced `label-sm` metadata.

---

## 2. Colors

The palette is rooted in deep blacks and charcoal, punctuated by high-fidelity white and subtle neutral greys.

### Core Tokens
*   **Background:** `#131313` (The base canvas)
*   **Primary:** `#ffffff` (Used for high-impact text and primary actions)
*   **Surface Tiers:**
    *   `surface_container_lowest`: `#0e0e0e` (For recessed areas/inputs)
    *   `surface_container`: `#1f1f1f` (Standard card background)
    *   `surface_container_highest`: `#353535` (For elevated, hoverable elements)

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Sectioning must be achieved through:
1.  **Background Shifts:** Transitioning from `surface` to `surface_container_low`.
2.  **Vertical Breathing Room:** Using large increments from our Spacing Scale (e.g., `16` or `24`) to separate concepts.

### Glass & Gradient Strategy
Main CTAs and hero containers should utilize a linear gradient transition from `primary` (#FFFFFF) to `primary_container` (#D4D4D4) at a 45-degree angle. This prevents a "flat" look and adds a metallic, premium sheen. Floating elements must utilize `backdrop-blur: 12px` and a semi-transparent `surface_variant` fill.

---

## 3. Typography

The system uses a dual-typeface approach to balance technical precision with editorial flair.

*   **Headlines (Manrope):** Chosen for its geometric stability and modern "tech" feel. 
    *   *Usage:* All `display`, `headline`, and `title` levels. Bold weights are preferred for headlines to anchor the page.
*   **Body (Inter):** The industry standard for legibility.
    *   *Usage:* `body` and `label` levels. Used for high-density information and UI controls.

### Hierarchy Role
*   **Display-LG (3.5rem):** Reserved for Hero Value Propositions.
*   **Headline-MD (1.75rem):** Section titles.
*   **Label-SM (0.6875rem):** Metadata, uppercase with `0.05em` letter spacing for an "architectural" feel.

---

## 4. Elevation & Depth

In this design system, depth is a function of light and layering, not artificial drop shadows.

### The Layering Principle
Hierarchy is expressed through "Surface Stacking":
*   **Base:** `surface` (#131313)
*   **Card:** `surface_container` (#1f1f1f)
*   **Active/Hover Item:** `surface_container_highest` (#353535)

### Ambient Shadows
If an element must "float" (e.g., a modal or dropdown), use the following shadow spec:
*   `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);`
*   The goal is a soft, ambient occlusion rather than a visible "drop shadow."

### The "Ghost Border"
For card containment on dark backgrounds, use a "Ghost Border":
*   `border: 1px solid rgba(145, 145, 145, 0.1);` (using `outline` token at 10% opacity).
*   **Prohibited:** 100% opaque borders of any color.

---

## 5. Components

### Buttons
*   **Primary:** Background `primary` (#FFFFFF), Text `on_primary` (#1A1C1C). Corner radius: `full` (pill-shaped).
*   **Secondary:** Ghost Border style. Background `transparent`, Text `primary`.
*   **Interaction:** On hover, primary buttons should have a subtle outer glow using `surface_tint`.

### Cards (The Core Container)
*   **Radius:** `xl` (1.5rem / 24px) to ensure a friendly but professional "high-tech" look.
*   **Padding:** Scale `8` (2.75rem) for hero cards; Scale `5` (1.7rem) for standard cards.
*   **Content Separation:** Never use `<hr>` or divider lines. Use `surface_container_low` backgrounds for nested items to create natural separation.

### Input Fields
*   **Style:** Recessed appearance using `surface_container_lowest`.
*   **Border:** `outline_variant` at 20% opacity.
*   **Typography:** `body-md`.

### Specialized Component: The Glass Marquee
For B2B trust signals (logo clouds), use a container with `backdrop-blur: 20px` and a subtle `linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)`.

---

## 6. Do's and Don'ts

### Do
*   **DO** use extreme vertical white space. If a section feels "comfortable," add 20% more space.
*   **DO** use `manrope` in bold weights for all primary headings to maintain a "futuristic" tone.
*   **DO** apply `xl` (24px) corner radius to all major containers to match the landing page's signature look.
*   **DO** use glassmorphism effects for navigation bars and floating action menus.

### Don't
*   **DON'T** use pure blue or standard "link color" (#0000FF). Stick to the monochrome palette.
*   **DON'T** use sharp corners (0px) or small radii (4px). It breaks the premium B2B SaaS aesthetic.
*   **DON'T** use 1px solid dividers. If you need to separate content, use a background color shift or a `1.4rem` gap.
*   **DON'T** use standard "Dark Mode" greys. Ensure backgrounds remain near-black (#131313) to maintain high contrast with white text.
