# Multiversa Design System

> **Laboratorio de Crecimiento & Escalabilidad.**
> Experimenta como Lab. Entrega como Boutique. Piensa como Consultoría.

Multiversa Group is a **Consulting Innovation Lab** at the intersection of Humans + AI. The current stack is SvelteKit-first; older CortexOS/Cockpit/Next references below are preserved only as historical design-source context, not as active product architecture.

This design system captures Multiversa's **"Liquid Glass Pro + Onion UI"** visual language: deep black carbon surfaces, electric chartreuse primary, Playfair Display serif headlines with italic accents, mono tracking labels, and backdrop-blur glassmorphic cards.

---

## Source Materials

All sources imported from the private monorepo `moshequantum/multiversagroup@main`:

| Path | What's there |
| :--- | :--- |
| `@multiversa/core/apps/multiversa-next` | Legacy Next.js landing page snapshot. Historical visual reference only. |
| `@multiversa/core/apps/cortex-frontend` | Legacy Svelte 5 Onion UI dashboard snapshot. Historical visual reference only. |
| `@multiversa/core/apps/cortex-desktop` | Legacy Tauri shell snapshot. |
| `@multiversa/core/apps/cortex-gateway` | Legacy Go gateway snapshot. |
| `README.md` · `CLAUDE.md` · `AGENTS.md` · `LLMs.md` | Legacy brand DNA and agent-orchestration notes. |
| `vault/_protocol.md` | Knowledge classification & agent permissions. |
| `docs/USER_MANUAL.md` · `docs/TECHNICAL_SPECS.md` | Ecosystem navigation + stack specs. |

Landing copy (EN + ES) was read from `messages/en.json` and `messages/es.json`.

---

## Products Represented

1. **Current Lab landing** — SvelteKit public site. This is the active source of truth.
2. **Legacy imported snapshots** — previous Next/Cortex/Cockpit materials kept only to mine visual language and should not be treated as active roadmap or architecture.

---

## Index

```
Multiversa Design System/
├── README.md                    ← this file (overview + content + visual + icon guidance)
├── SKILL.md                     ← Agent Skill entry point
├── colors_and_type.css          ← canonical tokens + semantic classes
├── assets/                      ← logos, favicons, triad symbols
├── fonts/                       ← (empty — loaded from Google Fonts; see note)
├── preview/                     ← registered cards for the Design System tab
├── ui_kits/
│   ├── landing/                 ← Multiversa marketing landing reference
│   └── cockpit/                 ← legacy dashboard reference
└── @multiversa/                 ← imported source files (read-only reference)
```

---

## CONTENT FUNDAMENTALS

Multiversa writes like a **consultancy that treats AI as craft, not spectacle**. Every line is short, confident, and technical — but with humanity underneath.

### Voice

- **Bilingual by default.** The production app ships EN/ES side-by-side. Spanish uses TU (familiar, not usted) and leans poetic; English is tighter and more startup-native. Don't translate word-for-word — re-write for each voice.
- **First-person plural ("we"), client-facing second-person ("you" / "tu").** Never "I". Multiversa is a collective practice (Moshe + collaborators + curated tools), not a solo act.
- **"AI proposes, you decide"** is the core ethical refrain — surfaces across README, AGENTS.md, Triad principle. Always put the human as the final decider.

### Tone

- **Calm authority with warmth.** Calm authority, direct technical reasoning, and warm aesthetic language are the tonal anchors.
- **Anti-jargon, pro-metaphor.** Prefer concrete metaphors over jargon. Instead of "caching" say "$0 tokens" when that clarifies the value. Memory layers are "L1 Local… never leaves device."
- **Short sentences. Em-dashes. Italic suffixes.** Headlines land as statement + poetic echo: *"Your business, orchestrated. — Activate your Cortex."* Always two beats.

### Casing

- **Sentence case** for headlines and body. Never Title Case.
- **ALL-CAPS MONO micro-labels** at 10px with `0.2–0.3em` letter-spacing for tags, metadata, step labels ("STEP 01", "NODE_ID", "FOUNDER CIRCLE", "ORCHESTRATING").
- **Brand wordmark** always uppercase: "MULTIVERSA" (see the chrome footer).
- **Product names** Pascal-cased or italicized: *Cortex*, *CortexOS*, *Spark*, *Pulse*, *Nano*.

### I vs You vs We

- "You" = the client. "We" = Multiversa. "I" is rare; when it appears it's in JTBD quotes from the client's POV: *"I want a landing page that sells…"* — always italic, in quotation marks, left-border divider.
- Agents speak as themselves but in the collective voice ("The Triad works in invisible harmony").

### Emoji

- Emoji are **used structurally in internal docs** (🌌 🏗️ 🧠 🎨 💎 🧬 🤝 🛡️ ⚡ 🚀 ♾️ 💾 🐉) as section markers — never decoratively in body copy. They flag doc sections, tiers, layers.
- **Not used in product UI.** The landing, cockpit, and CTAs use lucide-react / lucide-svelte icons or unicode symbols instead.

### Signature Unicode Symbols

These are part of the brand, not icons to be swapped:

- **◎ Astursadeth** — Orchestrator · Unified Consciousness
- **⬡ Auréon** — System · Backend · Strategy
- **✦ Runa** — Design · Language · Harmony

Rendered large (3xl–5xl) in Playfair italic, colored by agent hue (violet / teal / rose).

### Vibe

Premium consultancy meets indie hacker. Tony Stark & Jarvis. Liquid Glass Pro. Orchestrated intelligence. The client is an architect, not a user.

### Copy examples (lifted verbatim)

- `"Your business, orchestrated. Activate your Cortex."`
- `"Fleet of agents for less than the monthly cost of a senior employee."`
- `"CortexOS is your command Cockpit + agent team — not just another app in your bookmarks."`
- `"You're not just another account. You're a system."`
- `"AI proposes, you decide. We guarantee the system stays coherent, secure, and aligned with your strategy."`
- `"Your first Quick Win in 10-15 days · We don't create logos · We receive your brand and orchestrate it"`
- `"El humano SIEMPRE decide. La IA ejecuta bajo responsabilidad, ética, coherencia y contexto."`

---

## VISUAL FOUNDATIONS

### Palette — Black Carbon & Chartreuse

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--mv-primary` | `#BDEB34` | Chartreuse — THE single brand hero. CTAs, accents, glow, indicators. |
| `--mv-background` | `#0A0A0F` | Black Carbon Deep — page default. |
| `--mv-surface` | `#121217` | Cards, modals, elevated surfaces. |
| `--mv-carbon-light` | `#1A1A20` | Muted areas, alternate rows. |
| `--mv-ivory` | `#FAFCE8` | Body text + headlines (warm off-white). |
| `--mv-footer` | `#050505` | Abyssal — footer + lowest layer. |
| Signal accents: Violet `#a894ff` · Teal `#4ecdc4` · Rose `#ff6b9d` | | Optional brand texture and status colors. |
| Gold `#c9a84c` | | Premium / pricing highlights (secondary). |

**Vibe:** nocturnal, electric, consultant-premium. Never cheerful. Never bright.

### Type

- **Serif / Display — Playfair Display** — 400 (normal) and 500 italic. All H1/H2 hero + section headlines. Characteristic move: bold/normal line 1 + `italic font-light opacity-60 text-primary` line 2.
- **Sans / Body — Sora** — 200/300/400/500/600. Default body weight is **300 (light)**.
- **Mono / Label — JetBrains Mono** — reserved for micro-labels, step badges, metadata, technical metrics. Always 10–12px, UPPERCASE, `letter-spacing: 0.2em–0.3em`.

### Backgrounds

- **Default: solid `#0A0A0F`**, no gradient on page.
- **Hero**: interactive WebGL pixel blast (`PixelBlast` component) overlaid with dual gradient scrims (top `black/75→transparent`, bottom `#0A0A0F→transparent`). Fallback: `bg-gradient-to-br from-[#0A0A0F] via-[#0d0d14] to-[#0A0A0F]`.
- **Grid pattern**: `mv-grid-pattern` — 50px × 50px chartreuse lines at 3% opacity. Used behind sections for "spec sheet" texture.
- **No hand-drawn illustrations.** No textures. No photographic full-bleeds except testimonial portraits.
- **Scan line**: thin chartreuse horizontal line that animates top→bottom across glass cards (`--animate-scan`).

### Gradients

Minimal and functional only:

- Agent glow: radial color at card edges.
- Footer wordmark: "MULTIVERSA Chrome" — animated multi-stop (white + chartreuse 8% + violet 8%) shifting across the background.
- Logotipo badge: `EEF6E8 → 8C9088` subtle grayscale.

### Animation

- **Framer Motion** on landing: `initial={opacity:0, y:20}` → `whileInView` with viewport-once. Durations 0.5–0.8s.
- **GSAP + ScrollTrigger** for staggered card entrances (`power3.out`, stagger 0.1). Tier cards slide in from x:80.
- **GSAP** on Triad Nexus: active agent scales to 1.05 with `back.out(1.7)`; inactive blur 2px + opacity 0.4; breathing glows via `sine.inOut` yoyo stagger 0.5.
- **Keyframes** — `scan` (4s linear), `chrome-shift` (8s ease), `float` (6s ease-in-out), `pulse-slow` (4s cubic-bezier).
- Easing tokens: `power3.out`, `power2.inOut`, `back.out(1.7)`, `sine.inOut`, and CSS `cubic-bezier(0.16, 1, 0.3, 1)` (smooth focus glow).

### Hover States

- **Primary button (chartreuse bg)**: `hover:bg-primary/90` + `hover:scale-105` + shadow stays.
- **Glass button**: `hover:bg-white/5 hover:border-white/10`.
- **Links**: `hover:text-primary` + sliding chartreuse dot reveal (`opacity-0 group-hover:opacity-100`).
- **Cards**: `hover:scale-[1.02]`, 500ms; spotlight follows cursor.
- **Icons**: `group-hover:scale-110` + `group-hover:translate-x-1` (arrows).

### Press / Active

- `active:scale-95` on tier CTAs.
- Focus: chartreuse ring + soft glow via `var(--shadow-ring-primary)`.

### Borders

- Default: `rgba(255,255,255,0.05)` — nearly invisible.
- Hover: `rgba(255,255,255,0.10)`.
- Primary accent: `border-primary/20` or `ring-1 ring-primary/20`.
- Triad accents: matching agent hue at `/20` opacity.

### Shadows

- **Glass**: `0 8px 32px rgba(0,0,0,0.37)`.
- **Glass Pro**: `0 20px 50px rgba(0,0,0,0.5)`.
- **Chartreuse CTA**: `0 0 30px rgba(189,235,52,0.3)`.
- **Chartreuse soft glow (Spark card)**: `0 0 60px rgba(189,235,52,0.08)`.
- **Inner shadow**: only on icon chips (`shadow-inner` + `bg-black/40`).
- **No drop shadow on text** except `text-glow` utility on hero.

### Protection gradients vs capsules

- **Pills ("capsules")** with chartreuse 1.5–2px dot + mono label are the canonical status tag: `px-3 py-1 rounded-full border border-primary/20 bg-primary/5`. Used for "STEP 01", "LIVE", agent status.
- **Top-scrim gradient** (`bg-gradient-to-b from-black/75`) protects hero text from WebGL background — not a decorative motif.

### Layout Rules

- **Single site container**: `max-w-1420px`, responsive padding (24px → 48px → 80px). One source of truth.
- **Grid rhythm**: 1 / 2 / 3 / 4 columns via `md:grid-cols-*`. Gap 8 (32px) default.
- **Section padding**: `py-32` (128px) between sections. Hero `min-h-[90vh]`.
- **Tier cards scroll horizontally** on all viewports (`overflow-x-auto` with hidden scrollbar + `min-w-max` child). Never wrap.

### Transparency & Blur

- `backdrop-blur-xl` (20px) = standard glass card.
- `backdrop-blur-2xl` (25px) = modal overlays, liquid-glass-pro.
- `backdrop-blur-[30px]` = primary-accent glass (conversion modals, CTAs).
- Background opacity `white/[0.02]–[0.08]` almost always. Never >`/10`.

### Corner Radii

- Buttons: `rounded-full` (pill) or `rounded-2xl` (16px).
- Cards: `rounded-3xl` (24px). Triad cards, tier cards.
- Icon chips: `rounded-xl` / `rounded-2xl` (12–16px).
- Inputs: `rounded-xl` (12px).
- Logo circle: full circle, 70px border-radius on 140px.

### Card Anatomy

Standard Multiversa card = `rounded-3xl · border · backdrop-blur-xl · bg-white/[0.02–0.03] · p-8 · shadow-[0_0_40px_agent-color/15]`. Often with an icon chip (rounded-2xl, 48×48), `font-mono` step label, serif title, body muted-foreground, optional JTBD italic quote (left-border-2 white/10), feature list with tiny chartreuse dots, CTA button.

### Imagery Vibe

- **Dark, warm, technical.** Testimonial portraits are real but on black backgrounds (see `/public/testimonials/*.webp`).
- **No stock photos, no icons-as-art**, no gradient meshes, no emoji cards.
- When imagery is needed: b&w or deeply desaturated, preserve grain.

---

## ICONOGRAPHY

### Approach

Multiversa uses **two icon systems in parallel**:

1. **lucide-react** (landing page, Next.js) and **lucide-svelte** (Cockpit). Stroke 1.5–2px, rounded, no fill. Always sized 14–24px with `text-primary` or muted color. Examples imported from repo: `ArrowRight`, `Terminal`, `Sparkles`, `Users`, `ShieldCheck`, `Globe`, `Zap`, `Link2`, `Twitter`, `Instagram`, `Linkedin`, `Github`, `Cpu`, `Brain`, `Activity`.
2. **Unicode Triad symbols** — `◎ ⬡ ✦` are rendered as text in Playfair Display, treated as ICONS for the agents. Never substitute with lucide glyphs.

### Usage rules

- Icons live inside 48×48 `rounded-2xl` chips (`border border-white/10 bg-white/5` or agent-tinted variant).
- No icon font. No SVG sprite. No custom iconography.
- Bullet lists use a 1×1 or 1.5×1.5 chartreuse dot, never icons.
- Emoji appear only in Markdown documentation, never in product UI.

### How to use in this design system

- **Reference Lucide from CDN** in UI kit HTML (already wired up):
  `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`.
- This is the **original icon system** used by the source codebase — no substitution flag needed.

### Logo

- `assets/Logotipo.svg` — full wordmark (635×140), three-pillar "M" mark in a rounded gradient square followed by "MULTIVERSA" text.
- `assets/favicon.svg` — standalone M mark (512×512) with same `#EEF6E8 → #8C9088` subtle grayscale gradient.
- Gradient fills are intentional — do NOT re-color the logo in chartreuse.

---

## FONT NOTE (flagged)

The source repo does not ship font files — it relies on `next/font/google` + Tailwind 4 to fetch Playfair Display, Sora, and JetBrains Mono at build time. This design system loads them via **Google Fonts CDN** in `colors_and_type.css`. **If you need offline `.ttf`/`.woff2` files for embedded mocks or PPTX export, ask and I'll place the substitution.** No non-Google font substitution was required.

---

## UI Kits

- **ui_kits/landing** — Multiversa marketing landing clone: Hero + Triad + Pricing ladder + Footer chrome. 5 core sections, interactive wizard stub.
- **ui_kits/cockpit** — CortexOS Cockpit dashboard: BrandHeader + Agent Nexus + Onboarding progress + mocked chat panel.

Each kit has its own `README.md`, `index.html`, and per-component JSX files.

---

© 2026 Multiversa Group. Consulting Innovation Lab.
