# Legacy dashboard UI Kit

Hi-fi recreation of a legacy dashboard snapshot (`@multiversa/core/apps/cortex-frontend`). Kept as visual reference only; not active product architecture.

**Source:** legacy `lib/Cockpit.svelte` + `lib/components/{AgentStatusNexus,BrandHeader}.svelte` + `app.css`.

## Files
- `index.html` — full dashboard with sidebar, main surface, and chat rail
- `BrandHeader.jsx` — top bar with Multiversa mark + user entity + model pill
- `Sidebar.jsx` — collapsible nav with asset list
- `AgentNexus.jsx` — three-agent status panel (◎ ⬡ ✦)
- `AssetCard.jsx` — liquid-glass asset cards
- `HydraChat.jsx` — right-rail chat with model switcher

## Demonstrated patterns
- Onion UI shell: 288px sidebar · flex main · 360px chat rail
- Liquid glass cards (blur-20 + white/.05 + 8-32-0-.37 shadow)
- Status pulses (violet / teal / rose)
- Mono tracking labels everywhere
- Chartreuse primary CTAs

Svelte transitions (fadeInBlur, slideIn, staggerCards, pulseGlow) are approximated with CSS only — no GSAP.
