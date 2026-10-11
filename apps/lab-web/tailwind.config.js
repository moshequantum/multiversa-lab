import { createRequire } from "node:module";

/**
 * Multiversa brand tokens come from @multiversa/design-system: the Cosmic Night preset maps the
 * CSS channels in tokens.css (imported by src/index.css) to the same utility names the Group
 * site uses (bg-canvas, text-ivory, text-muted, bg-primary/10…). require() resolves to the
 * package's preset.cjs, so no build step is needed. Only Lab-specific additions live here.
 *
 * @type {import('tailwindcss').Config}
 */
const multiversaPreset = createRequire(import.meta.url)("@multiversa/design-system/preset");
const ok = (name) => `oklch(var(--${name}) / <alpha-value>)`;

export default {
  presets: [multiversaPreset],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Lab status signals (kept low-chroma so they sit inside the palette)
        ok: ok("signal-ok"),
        warn: ok("signal-warn"),
      },
      letterSpacing: {
        kicker: "0.18em",
      },
      maxWidth: {
        page: "84rem",
        prose: "38rem",
      },
    },
  },
  plugins: [],
};
