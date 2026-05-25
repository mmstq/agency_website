# Modall Agency Website

## What This Is

A high-end B2B agency website for "Modall," a tech infrastructure agency that builds custom web applications, mobile solutions, AI integrations, and SaaS products. The site uses a "Digital Monolith" aesthetic — near-black palette, glassmorphism, premium editorial typography — to convey technological authority to enterprise buyers.

## Core Value

A production-ready agency website that converts high-value B2B leads through premium design and complete content across all key pages.

## Current Milestone: v1.0 Agency Website — Fully Functional

**Goal:** Transform the existing single-page scaffold into a complete, production-ready agency website with all pages, sections, working interactions, SEO metadata, and mobile polish.

**Target features:**
- Complete Home page (logo marquee, industries, case study previews, process, testimonials, final CTA, footer)
- All missing pages: About, Services, Portfolio, Case Studies, Blog, Contact, 404
- Working interactions: "Get started" CTA, contact form, nav anchor links, newsletter wired to a real provider
- SEO & performance: OG tags, sitemap, robots.txt, fix touch cursor issue
- Mobile polish: fix cursor-none on touch devices, review VideoCard height on small screens

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Home page completed with all sections (marquee, industries, process, testimonials, CTA, footer)
- [ ] About, Services, Portfolio, Case Studies, Blog, Contact pages created
- [ ] 404 page created
- [ ] Working contact form (with API route)
- [ ] Newsletter wired to a real email provider
- [ ] Nav links resolve to real sections/pages
- [ ] "Get started" CTA wired to contact/calendar flow
- [ ] OG tags, sitemap, robots.txt
- [ ] Cursor animation safe on touch/mobile devices

### Out of Scope

- Real CMS / headless CMS integration — static content is sufficient for v1.0
- Authentication or user accounts — marketing site only
- E-commerce / payment flows — not an agency website concern
- Real-time chat widget — defer to v2
- Multi-language / i18n — English only for v1.0

## Context

**Stack:** Next.js 16.2.2 (App Router, static export), React 19, Tailwind v4, shadcn/ui, TypeScript. No Framer Motion — all animations use RAF + CSS only.

**Design system:** DESIGN.md defines the "Digital Monolith" system: `#131313` background, Manrope/Inter dual typeface, xl (24px) radius on all major containers, no 1px solid borders (ghost borders only at 10% opacity), glassmorphism for navbar/overlays.

**What's already built:**
- Floating pill navbar with desktop dropdown + mobile drawer
- Hero section with working email capture form and API stub
- Bento grid: VideoCard (demo video), FeatureCardsStack (spinning ecosystem rings), AnalyticsCard (spinning donut rings)
- CanvasGrid: interactive cursor-following dot grid with repulsion physics
- MasterLayout composing CanvasGrid behind all pages

**Known issues:**
- Newsletter API logs to console only — no provider wired
- All nav links point to anchor IDs that don't exist yet
- "Get started" button has no action
- `cursor: none` on `<html>` affects touch devices
- `recharts` installed but unused (dead dep)

## Constraints

- **Tech stack**: Next.js App Router + Tailwind v4 + shadcn/ui — no breaking changes, no new heavy deps
- **Performance**: No Framer Motion or Three.js — animations must stay RAF/CSS
- **Design**: All new pages/sections must follow DESIGN.md "Digital Monolith" spec exactly
- **Export**: Must remain compatible with Netlify static export (`output: 'export'`)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| RAF for all interactive animations | Bypasses React re-renders; guarantees 60fps for spinning rings and dot grid | ✓ Good |
| HTML5 Canvas for dot grid | 3000+ DOM nodes would tank framerate; canvas gives precise mathematical control | ✓ Good |
| `cursor: none` on `<html>` + canvas cursor | Unified custom cursor experience matching "Digital Monolith" premium feel | ⚠️ Revisit — breaks touch devices |
| Tailwind v4 + shadcn | Modern DX, utility-first, component library for forms and UI primitives | — Pending |
| Static export for Netlify | No server needed for marketing site; cheaper, faster, simpler | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-30 after Milestone v1.0 start*
