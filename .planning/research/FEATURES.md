# Features Research

**Project:** Modall — B2B Tech Agency Website
**Domain:** Premium B2B Technology Agency (custom web/mobile/AI/SaaS builds)
**Researched:** 2026-04-30
**Overall confidence:** HIGH (multiple verified sources, corroborated patterns)

---

## Home Page — Missing Sections

The existing scaffold has: Navbar, Hero (email capture), Bento grid (VideoCard, FeatureCardsStack, AnalyticsCard), CanvasGrid background.

Missing sections listed in build order (top-to-bottom page flow):

---

### Section: Logo Marquee (Client Strip)

**Purpose:** Establish social proof immediately after the hero. Enterprise buyers scan for recognizable names before reading anything else. A logo strip signals "companies like mine trust them."

**Table stakes content:**
- 8–12 client/partner logos in a horizontal auto-scrolling strip
- Continuous looping animation (no pause at ends)
- Monochrome or low-opacity treatment so logos don't compete with the dark background
- Optional label: "Trusted by" or "Powering teams at"

**Differentiator opportunities:**
- On hover: reveal company name or project type as a tooltip
- Mix client logos with technology partner logos (AWS, Vercel, Stripe) to reinforce technical credibility without needing named clients
- Small stat line below: "40+ projects shipped across 12 industries"

**Complexity:** Low
**Dependencies:** None — pure CSS marquee animation (no Framer Motion; use CSS `@keyframes` scroll). Tailwind v4 supports `animate-*` utilities for this pattern.
**B2B note:** Never fake logos. If real client logos aren't available for v1.0, use technology/partner logos only. Fake client names destroy trust with enterprise buyers who do due diligence.

---

### Section: Industries

**Purpose:** Qualify visitors by vertical. Enterprise buyers want to see evidence you understand their domain, not just generic "we build apps." This section reduces the "do they understand my world?" objection before it surfaces.

**Table stakes content:**
- 4–8 industry cards or a grid: FinTech, HealthTech, SaaS/Startups, E-commerce, Enterprise Software, Logistics/Supply Chain
- Each card: icon + industry name + one-line hook ("Regulated environments, built right")
- No walls of text — scannable at a glance

**Differentiator opportunities:**
- Link each industry card to a filtered portfolio view or dedicated landing page (defer to v2, but wire the structure now)
- Show a relevant metric per industry: "3 fintech clients, avg. 8-month build"
- Subtle hover state revealing a case study preview

**Complexity:** Low
**Dependencies:** None. Static grid. Icon set needed (Lucide icons are already available via shadcn/ui).
**B2B note:** Listing specific industries is a stronger trust signal than "we work with all industries." Enterprise buyers expect specialization. Pick the 6 most credible verticals for Modall and commit to them.

---

### Section: Process / How We Work

**Purpose:** Reduce the "what happens after I contact you?" fear that blocks enterprise buyers from submitting a form. Decision-makers manage risk. A transparent process demonstrates structure, reduces uncertainty, and positions Modall as mature and organized.

**Table stakes content:**
- 4–6 numbered steps with icon, title, and 1–2 sentence description
- Recommended steps for a tech build agency:
  1. Discovery — "We map your goals, constraints, and existing systems in a 60-minute session"
  2. Strategy & Scoping — "Detailed technical spec, timeline, and fixed-price proposal within 5 business days"
  3. Design — "High-fidelity prototypes, reviewed and approved before a line of code is written"
  4. Build — "Iterative sprints with weekly check-ins and a shared staging environment"
  5. QA & Launch — "Comprehensive testing, performance audit, and zero-downtime deployment"
  6. Support — "Handoff documentation, team training, and ongoing retainer options"
- Clean visual: horizontal timeline or vertical numbered list with connector lines

**Differentiator opportunities:**
- Highlight a specific commitment: "Proposal within 5 days" or "First prototype in 2 weeks" — concrete timelines build trust
- Add a "typical engagement looks like" timeline bar (8–16 weeks for a custom build)
- Micro-copy callout: "No retainer required to start. Fixed-price scoping only."

**Complexity:** Low–Medium (depends on visual treatment)
**Dependencies:** None. Static content. If a timeline connector is desired, use SVG/CSS — no new libraries.
**B2B note:** Enterprise buyers read this section carefully. Vague steps ("We listen, we create, we deliver") are worse than no process section. Be specific about what happens at each step.

---

### Section: Testimonials

**Purpose:** Third-party validation. Social proof from named executives at recognizable companies is the single highest-leverage trust signal for an agency. Enterprise buyers are risk-averse; a strong testimonial from a peer removes doubt.

**Table stakes content:**
- 3–6 testimonial cards in a horizontal scroll or card stack
- Each card: quote (2–4 sentences), person's full name, job title, company name, and photo
- Company logo on the card (if permitted)
- Quote must reference a specific outcome, not generic praise: "They delivered the MVP in 11 weeks, and it scaled to 30K users on launch day" beats "Great team to work with"

**Differentiator opportunities:**
- One featured/hero testimonial displayed large above the card row — pull the best quote out for emphasis
- Video testimonial embed (60–90 seconds) for one key client — looping muted preview with play button
- Star rating (5/5) from Clutch or G2 with a link to the profile

**Complexity:** Low (static cards) to Medium (if video testimonial is included)
**Dependencies:** None for static cards. Video testimonial would need a lightweight embed or native HTML5 `<video>`. No new deps required.
**B2B note:** Placeholder/fictional testimonials are detectable and immediately destroy credibility. For v1.0, use real testimonials only (even 2–3 real ones outperform 6 fabricated ones). If unavailable, omit the section rather than fake it.

---

### Section: Final CTA (Pre-Footer)

**Purpose:** The last conversion opportunity before a visitor leaves. Enterprise buyers who scroll to the bottom are high-intent. This section should present a clear next step with reduced friction.

**Table stakes content:**
- Strong headline: "Ready to build?" or "Let's scope your project"
- Sub-copy (1–2 lines): "Tell us what you're building. We'll respond with a plan within 2 business days."
- Primary CTA button: "Book a discovery call" or "Start a project" → links to Contact page or a calendar embed
- Secondary CTA (optional): "View our work" → links to Portfolio

**Differentiator opportunities:**
- Show a small set of trust signals inline: "No commitment required · Fixed-price scoping · NDA available"
- Use a two-column layout: CTA copy on left, a minimal inline form (name + email) on right so the visitor can act without navigating away
- Subtle animated background element (e.g., the CanvasGrid already present globally provides this)

**Complexity:** Low
**Dependencies:** The existing email capture pattern from HeroSection can be reused. If calendar embed is desired, Calendly embed is a `<script>` tag — acceptable for static export.
**B2B note:** Do not use generic copy like "Contact us today." Name the action and set expectations ("We'll respond within 2 business days" removes ambiguity about what happens next).

---

### Section: Footer

**Purpose:** Navigation fallback, legal trust signals, secondary contact access, SEO anchor text. Enterprise buyers who do due diligence check footers for legitimacy markers.

**Table stakes content:**
- Logo + one-line tagline
- Navigation columns: Company (About, Careers, Blog), Services (Web Development, Mobile, AI Integration, SaaS), Work (Portfolio, Case Studies)
- Contact column: email address (clickable `mailto:`), LinkedIn, GitHub (if public)
- Legal row: Copyright year, Privacy Policy link, Terms of Service link
- Optional: physical location or "Remote-first, globally distributed"

**Differentiator opportunities:**
- Small newsletter signup inline ("Get our monthly build notes") wired to email provider
- Clutch/G2 badge widget in footer corner
- Subtle "Currently accepting projects for Q3 2026" availability signal — creates urgency without being pushy

**Complexity:** Low
**Dependencies:** Newsletter subscribe requires the existing API route to be wired to a real provider (Resend or Mailchimp). Privacy Policy and Terms pages are referenced but can be placeholder text for v1.0.
**B2B note:** Missing Privacy Policy and Terms links fail legal compliance checks and are a hard no for enterprise procurement teams who vet vendors.

---

## About Page

**Purpose:** Convert skeptics who are evaluating whether Modall is a serious partner or a freelancer with a fancy site. Enterprise buyers use the About page to validate: Is this company real? Who am I actually working with? Do they have staying power?

**Expected sections:**

### Hero / Mission Statement
- Bold headline: "We build the infrastructure companies grow on" (mission, not history)
- 2–3 sentence summary of what Modall is, who it serves, and what makes it different
- Complexity: Low

### Story / Origin
- Founders' background and why they started the agency
- Specific: what problem they saw in the market, what year, what first project proved the model
- 150–250 words max. Enterprise buyers don't want a novel; they want authenticity
- Complexity: Low

### Team Section
- Real photos (professional headshots, not stock), names, titles, short bios (2–3 sentences)
- LinkedIn links for verification — this is standard due-diligence behavior
- For a small agency: showing the full team signals transparency. For larger teams: show leadership only
- Complexity: Low

### Values / Operating Principles
- 3–5 principles with icon and 1–2 sentence explanation
- Must be specific and defensible: "We over-document because handoffs are where projects die" is better than "We value communication"
- Complexity: Low

### By the Numbers
- Concrete stats: years in operation, projects shipped, client retention rate, countries worked in
- Presented as large typographic callouts (3–4 numbers across a row)
- Complexity: Low

### Logos / Partners (if not on homepage)
- Repeat trust signals for visitors who land directly on About
- Complexity: Low

**CTA at bottom:** "Work with us" → Contact page

**Overall page complexity:** Low
**B2B note:** Real photos are non-negotiable. Stock photos of "diverse teams in an office" are immediately recognizable and damage credibility. An agency with 3 real photos of real people outperforms one with 12 stock photos.

---

## Services Page

**Purpose:** The primary evaluation page for enterprise buyers. This is where procurement teams and technical leads decide if Modall's capabilities match the project scope. It must be specific (not "we do everything digital") and must connect capabilities to buyer outcomes, not internal process.

**Expected sections:**

### Services Overview Hero
- Headline focused on what the buyer gets, not the service list: "From idea to production infrastructure — we own the entire build"
- Brief positioning paragraph (3–4 sentences)
- Complexity: Low

### Service Cards / Individual Services
One card per service. Modall's services per PROJECT.md: Custom Web Applications, Mobile Solutions, AI Integrations, SaaS Products.

**Each service card must include:**
- Service name (e.g., "Custom Web Applications")
- 1–2 sentence description of what it covers
- Who it is for: "For scale-ups that have outgrown no-code tools"
- What they get: 3–5 bullet points of deliverables/outcomes
- Optional: tech stack used (Next.js, React, Node.js, PostgreSQL)
- CTA: "Discuss your project" → Contact

**Complexity:** Low per card; Medium if individual service sub-pages are desired (defer sub-pages to v2)

### Technology Stack Display
- Logos of technologies used, grouped by category: Frontend, Backend, Mobile, AI/ML, Infrastructure
- Signals technical credibility and lets buyers self-qualify ("they use the stack we're familiar with")
- Complexity: Low

### Process Teaser
- Brief reference to the process (links to home page anchor or About section) — reduces page length while re-exposing the process for visitors who landed directly on Services
- Complexity: Low

### Engagement Models
- How clients can work with Modall: Fixed-scope project, Retainer / ongoing, Staff augmentation
- One paragraph each or a comparison table
- Enterprise buyers need to know the commercial model before they'll submit a form
- Complexity: Low

**CTA at bottom:** "Ready to scope your project?" → Contact
**Overall page complexity:** Low–Medium
**B2B note:** Never list every technology ever used. Pick the 10–15 most relevant and well-known. A technology list that includes everything signals a generalist who will say yes to anything — the opposite of expert positioning.

---

## Portfolio / Work Page

**Purpose:** Demonstrate capability through concrete examples. Enterprise buyers compare portfolios to validate capability match. This page answers: "Have they built something like what I need?"

**Expected sections:**

### Page Hero
- Simple: "Our Work" or "Selected Projects"
- Sub-copy: "X projects shipped across Y industries" — numbers lend weight
- Complexity: Low

### Filter Bar
- Filter by: Industry vertical (FinTech, HealthTech, etc.), Service type (Web, Mobile, AI, SaaS), or both
- Client-side filtering using React state — no server required for static export
- Complexity: Medium

### Project Grid
- 6–12 cards (avoid showing fewer than 6; it signals inexperience)
- Each card: project thumbnail/screenshot, project name, client name (or "[Confidential] — FinTech startup"), industry tag, service tag, 1-line outcome
- On hover: slight scale + overlay with "View case study" CTA
- Complexity: Low per card; Medium for the filter interaction

### Individual Project Detail
- Two options: (a) Expand to full Case Study page (preferred), or (b) Modal/drawer with more detail
- For v1.0 recommendation: Link cards to individual Case Study pages for SEO and shareability
- Complexity: Medium for routing; individual page complexity is covered under Case Studies

**Overall page complexity:** Medium (filter interaction is the only non-trivial piece)
**Dependencies:** Shares the same project data structure as Case Studies. Define a single TypeScript interface for a `Project` and use it across both pages.
**B2B note:** "Confidential" projects are normal and expected in enterprise B2B. Describe them by vertical, scale, and outcome without naming the client. Never fabricate a project or claim work you didn't do.

---

## Case Studies Page

**Purpose:** The highest-intent pages on an agency site. A buyer reading a case study is actively evaluating whether to hire you. These pages must be structured for both quick scanning (executives) and deep reading (technical leads).

**Page structure: Listing view + individual detail pages**

### Listing Page
- Grid or list of case study cards
- Each card: client name/industry, headline (outcome-focused), thumbnail, 2–3 key metrics as visual callouts, "Read the full story" CTA
- Optional filters by industry or service type
- Complexity: Low (listing); Medium (if filters added)

### Individual Case Study Page Structure

**Must-have sections in order:**

1. **Header**
   - Outcome-led headline with specific metric: "Rebuilt a fintech onboarding flow that cut drop-off by 41%"
   - Client logo (if permitted) + industry + company size + region
   - 3 key metric callouts above the fold (large typography): e.g., "41% drop-off reduction · 8 weeks to launch · 30K MAU at launch"

2. **The Challenge**
   - 60–90 words. Business problem in plain language. Name the constraints.
   - What was the cost of the problem? (lost revenue, user churn, manual process overhead)

3. **Why Modall**
   - 40–60 words. What the client evaluated, and why Modall won
   - This is a subtle but high-impact section — it surfaces the buying criteria enterprise prospects use

4. **The Solution**
   - 120–160 words. Technical approach explained in accessible language
   - Workflow or architecture diagram (static SVG or image — no interactive component required)
   - Tech stack used, with logos

5. **Results**
   - Before/after table: 3–5 KPIs with baseline, post-implementation value, and timeframe
   - One approved quote with full attribution (name, title, company)
   - Optional: forward-looking sentence about ongoing relationship or next phase

6. **Footer CTA**
   - "Want results like these? Start a conversation" → Contact page

**Complexity:** Medium (routing, data structure, consistent template)
**Dependencies:** TypeScript `CaseStudy` type must be defined and reused. For v1.0 with static export, data lives in a `/data/case-studies.ts` file (array of objects). No CMS needed.
**B2B note:** Every case study that lacks a specific metric loses 60–70% of its persuasive power. "We redesigned their platform and they loved it" is worthless. "We redesigned their onboarding and 90-day retention improved from 34% to 61%" is what closes deals.

---

## Blog Page

**Purpose:** SEO + thought leadership. In B2B agency sales, buyers research for weeks or months before contacting anyone. Blog content captures that research traffic and introduces Modall during the consideration phase.

**Page structure: Listing page + individual article pages**

### Listing Page
- Grid of article cards: thumbnail image, category tag, headline, publication date, 1–2 sentence excerpt, author avatar + name
- Pagination or "Load more" (load more preferred for static export — simpler than server-side pagination)
- Optional: category filter bar (Tech, Process, Case Studies, AI)
- Complexity: Low

### Individual Article Page
- Article header: title, author, date, read time estimate, category tag
- Featured image
- Body content (markdown rendered as HTML — use `next-mdx-remote` or local MDX for static export)
- Author bio card at bottom
- Related articles (3 cards)
- Newsletter signup CTA embedded mid-article or at end
- Complexity: Medium (MDX pipeline if used; otherwise Low for hardcoded HTML articles)

### Content approach for v1.0
- Static approach: hardcode 3–5 articles as MDX or TypeScript-exported content objects
- No CMS needed for v1.0 (explicitly out of scope per PROJECT.md)
- Structure data so CMS can be swapped in later without refactoring UI components
- Complexity: Low (3–5 hardcoded articles + listing page)

**Dependencies:** If using MDX: `@next/mdx` or `next-mdx-remote` + `gray-matter`. Both compatible with Next.js App Router static export. Keep it as a dev dependency, not runtime.
**B2B note:** An empty blog ("Coming soon") is worse than no blog section. For v1.0, either ship 3–5 real articles or remove the Blog link from the navbar until content is ready. An empty blog actively signals neglect.

---

## Contact Page

**Purpose:** The terminal conversion point. Every other page on the site should funnel high-intent visitors here. The contact page must minimize friction, maximize trust, and set clear expectations about what happens after submission.

**Expected sections:**

### Page Hero
- Headline: "Let's build something together" or "Start a conversation"
- Sub-copy: Expectation-setting: "We review every inquiry and respond within 2 business days. No sales calls before we've read your brief."
- Complexity: Low

### Contact Form
**Fields (minimum viable for qualification — do not add more for v1.0):**
- Full name (required)
- Work email (required — not personal Gmail; this filters casual inquirers)
- Company name (required)
- Project type (dropdown: Web App, Mobile App, AI Integration, SaaS, Not sure yet)
- Brief (textarea): "Tell us what you're building" (required, 3–5 sentences prompt)
- Timeline (dropdown: ASAP, 1–3 months, 3–6 months, Exploring options)
- Budget range (optional dropdown: Under $25K, $25K–$75K, $75K–$150K, $150K+, Prefer to discuss)

**Why this field set:** Name + email + company = routing. Project type + brief = qualification. Timeline + budget = sales prioritization. All together = 7 fields which is within the "5 fields or fewer for max conversion" guideline only if budget is marked optional. This is an acceptable tradeoff for lead quality over raw volume in a B2B context.

**Form behavior:**
- Real-time validation with inline error messages (no alert dialogs)
- Submit button disabled until required fields complete
- On success: show inline confirmation ("We've received your brief. Expect a reply within 2 business days.") — do not redirect
- On error: show inline error with retry instruction

**Complexity:** Medium (API route already stubbed at `/api/`; needs wiring to an email provider like Resend)

### Alternative Contact Methods
- Direct email address (clickable) for those who prefer not to use forms
- LinkedIn profile link
- Calendar link (Calendly or Cal.com) for visitors who want to book directly without a form
- Complexity: Low

### Trust Signals Adjacent to Form
- 3 short trust lines below the form: "No commitment required" / "NDA available on request" / "Fixed-price scoping, not hourly"
- 2–3 client logo references or a brief testimonial quote
- Placement: right column on desktop (two-column layout), below form on mobile
- Complexity: Low

**Overall page complexity:** Medium (form + API wiring)
**Dependencies:** Resend (recommended for static-export-compatible email delivery — Next.js App Router API routes work with Resend on Netlify via serverless functions). shadcn/ui `<Form>` component wraps react-hook-form and handles validation well without new dependencies.
**B2B note:** Budget fields that are required kill conversion with enterprise buyers who have not yet decided on budget. Make it optional and place it last. Forcing budget before establishing value is a guaranteed form abandonment trigger.

---

## 404 Page

**Purpose:** Prevent dead-end exits. A well-designed 404 converts what would be a bounced session into a navigation opportunity. Secondary purpose: reinforce brand personality — a premium agency that can't design its own error page undermines its credentials.

**Content:**
- Large typographic "404" in brand style (this is a design showcase moment — bold, on-brand)
- Clear message: "This page doesn't exist" (not "Oops! Something went wrong" — that conflates user error with system error)
- 1-line sub-copy: "You may have followed a broken link, or the page may have moved."
- Navigation options: 3–4 quick links — Home, Services, Portfolio, Contact
- Optional: search input (low priority for v1.0)
- Optional: subtle easter egg animation (on-brand interactive element) — differentiator

**Complexity:** Low
**Dependencies:** Next.js App Router uses `not-found.tsx` in the `app/` directory for custom 404 handling. Static export compatible.
**B2B note:** Do not put sales copy on the 404 page. It reads as desperate and breaks the tone. Navigation recovery is the only goal here.

---

## Anti-Features

Features that are commonly seen on agency websites but actively hurt B2B enterprise conversion. Avoid these.

### Talking About Yourself Instead of the Buyer's Problems
**What it is:** Homepage hero copy that leads with "We are a full-service digital agency founded in [year]" or "We're passionate about design."
**Why it hurts:** Enterprise buyers do not care about your passion. They care about their problem. Leading with self-description fails the "what's in it for me" test in the first 3 seconds.
**Instead:** Lead with the buyer's desired outcome: "We build the custom infrastructure scale-ups need when off-the-shelf software stops working."

### Generic Services Descriptions
**What it is:** Service pages that list "Web Design, Development, SEO, Social Media, Branding" with one vague paragraph each.
**Why it hurts:** Signals a generalist chasing every dollar. Enterprise buyers want specialists, not generalists.
**Instead:** Define specific service lines with specific deliverables, tech stacks, and buyer qualifications.

### Fake or Unattributed Testimonials
**What it is:** Quotes attributed to "John D., CEO" or "— Marketing Director, Fortune 500 company."
**Why it hurts:** Enterprise procurement teams Google names. Unverifiable testimonials fail due diligence checks and damage trust worse than no testimonials.
**Instead:** Zero testimonials with a "More client stories coming soon" is better than fake ones.

### Excessive Animation / Performance Theater
**What it is:** Heavy parallax, scroll-jacking, loading screens, animations that delay content visibility.
**Why it hurts:** Enterprise buyers are often on managed corporate hardware with limited GPU resources. A site that stutters on their machine makes them question your technical judgment. Load time above 3 seconds loses 40%+ of B2B visitors.
**Instead:** Animations must be opt-in to rendering (intersection observer), GPU-accelerated (`transform`/`opacity` only), and never block content visibility. The existing CanvasGrid already follows this pattern.

### Pop-ups and Interruption Marketing
**What it is:** Exit-intent popups, newsletter modals triggered on scroll, chat bubbles that auto-open with "Hi! Can I help you?" after 5 seconds.
**Why it hurts:** Enterprise buyers browsing during a workday are interrupted constantly. Aggressive pop-ups associate your brand with the same low-quality vendor experience they try to avoid.
**Instead:** Use embedded CTAs, inline newsletter forms, and a persistent but non-intrusive contact button.

### Hiding Pricing Entirely With No Explanation
**What it is:** No pricing information, no engagement model descriptions, no ranges — just "Contact us for a quote" on every service.
**Why it hurts:** Gartner (2025) reports 61% of B2B buyers prefer a rep-free buying experience. Buyers who can't self-qualify on budget drop off. You are gatekeeping people who want to give you money.
**Instead:** Show engagement models and budget ranges. "Projects typically start at $30K. Fixed-price scoping engagements are $2,500." gives buyers enough to self-qualify without undercutting your negotiating position.

### Cluttered Navigation
**What it is:** Top-level nav with 8+ items, dropdown menus 3 levels deep, nav organized by internal team structure rather than buyer questions.
**Why it hurts:** Creates decision paralysis and signals poor product thinking — if you can't organize your own site, how will you organize a complex software project?
**Instead:** Maximum 6 top-level nav items. Group by buyer need, not company department. The existing Navbar already follows this pattern.

### Blog with Fewer Than 3 Articles Live
**What it is:** A Blog link in the nav pointing to an empty page or a page with 1–2 stub posts from months ago.
**Why it hurts:** An empty blog is worse than no blog. It signals that Modall started something, lost interest, and abandoned it — exactly the behavior enterprise clients fear in a long-term build partner.
**Instead:** Either ship 3–5 substantive articles at launch, or remove the Blog nav item entirely for v1.0 and add it when content is ready.

---

## Feature Dependencies

```
Logo Marquee → (none — standalone)
Industries Section → (none — standalone)
Process Section → (none — standalone)
Testimonials → (none — standalone)
Final CTA → HeroSection (reuse email capture pattern)
Footer → Blog page (newsletter wiring), Privacy Policy page, Terms page

About Page → (none)
Services Page → (none; links to Contact)
Portfolio Page → Case Studies (shared Project data type)
Case Studies Page → Portfolio (shared data type); Blog (cross-links)
Blog Page → Newsletter API route (wiring to email provider)
Contact Page → existing /api/ stub (needs Resend wiring)
404 Page → (none — Next.js not-found.tsx)
```

---

## MVP Priority Order

**Ship first (highest conversion impact, lowest complexity):**
1. Contact Page (conversion terminal — all other pages are worthless without it)
2. Footer (legitimacy signal, navigation fallback)
3. Final CTA section (home page conversion before users leave)
4. Logo Marquee + Industries (quick credibility, low effort)
5. Process section (reduces objections, low effort)
6. Testimonials (highest trust ROI if real testimonials exist)

**Ship second (credibility + SEO):**
7. About page
8. Services page
9. Portfolio page + 6 project cards
10. 3–5 Case Study detail pages

**Ship third (longer-form content, lower urgency):**
11. Blog listing + 3 articles
12. 404 page

**Defer without blocking launch:**
- Individual service sub-pages (Services page is sufficient for v1.0)
- Blog CMS integration (static content for v1.0)
- Careers page
- Privacy Policy / Terms (placeholder text is acceptable for v1.0 launch)

---

## Sources

- [15 B2B Website Best Practices for 2026 — Directive Consulting](https://directiveconsulting.com/blog/15-b2b-website-best-practices-for-2026-built-for-buyers-not-just-browsers/)
- [B2B Website Trust Signals — Trajectory Web Design](https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals)
- [B2B Case Study Template & Best Practices 2025 — The Logonaut](https://www.thelogonaut.com/post/b2b-case-study-template-10-examples-2025-best-practices)
- [B2B Website Design Best Practices 2025 — Trajectory Web Design](https://www.trajectorywebdesign.com/blog/b2b-website-design-best-practices)
- [Lead Forms in B2B: Data Depth vs Conversion Rate — Brixon Group](https://brixongroup.com/en/lead-forms-in-b2b-the-perfect-balancing-act-between-data-depth-and-conversion-rate)
- [B2B Website Design Guide: Structure, Content, Best Practices — BeetleBeetle](https://beetlebeetle.com/post/b2b-website-design-guide-structure-content-best-practices)
- [11 Best Marketing Agency Websites 2026 — Framer Blog](https://www.framer.com/blog/marketing-agency-websites/)
- [B2B Website Trends 2026 — Brightscout](https://www.brightscout.com/insight/b2b-website-trends)
- [B2B Conversion Rate Optimization Guide 2026 — Directive Consulting](https://directiveconsulting.com/blog/blog-b2b-conversion-rate-optimization-guide/)
