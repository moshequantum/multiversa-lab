---
name: multiversa-design
description: Use this skill to generate well-branded interfaces and assets for the Multiversa Lab / Group ecosystem (landing, CLI wizard, dashboards, prototypes/mocks). Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `README.md` — full brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — CSS variables for colors + type; link this from any HTML artifact
- `assets/` — logos (`Logotipo.svg`, `favicon.svg`)
- `fonts/` — Playfair Display, Sora, JetBrains Mono (Google Fonts fallback)
- `preview/` — individual specimen cards
- `ui_kits/landing/` — hi-fi recreation of the marketing site (Hero, pricing, benchmark, footer)

## Non-negotiables
- Background is always Black Carbon `#0A0A0F`. Chartreuse `#BDEB34` is the one hero color — never two at hero scale.
- Headlines are Playfair Display 400 + an italic 300 echo in chartreuse @ opacity 0.6–0.8. Two beats.
- Body is Sora 300. Micro-copy is JetBrains Mono uppercase w/ 0.22–0.3em tracking.
- Lucide icons only (stroke 1.75, no fill). Legacy glyphs are visual references only, not active architecture.
- No emoji. No purple-to-blue gradients. No hand-rolled SVG icons.
