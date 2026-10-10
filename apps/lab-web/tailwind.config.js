/**
 * Multiversa brand tokens — ported from the Group site (multiversaos/apps/web/tailwind.config.cjs)
 * so Lab and Group share one palette. Values live as CSS variables in src/index.css (Cosmic Night).
 * Channels are stored as raw oklch components, so Tailwind opacity modifiers (bg-primary/10) work.
 *
 * @type {import('tailwindcss').Config}
 */
const ok = (name) => `oklch(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cosmic Night semantic tokens (same names as Group)
        background: ok("background"),
        foreground: ok("foreground"),
        border: ok("border"),
        input: ok("border"),
        ring: ok("primary"),
        "muted-fg": ok("muted-foreground"),

        canvas: ok("background"),
        void: ok("background"),
        surface: ok("card"),
        card: ok("card"),
        "card-hover": ok("card-hover"),

        primary: ok("primary"),
        "primary-hover": ok("primary-hover"),
        secondary: ok("secondary-foreground"),
        accent: ok("primary"),
        alternative: ok("alternative"),
        gold: ok("alternative"),

        // Typographic tones
        ivory: ok("foreground"),
        copy: ok("foreground"),
        sand: ok("muted-foreground"),
        muted: ok("muted-foreground"),

        // Lab status signals (kept low-chroma so they sit inside the palette)
        ok: ok("signal-ok"),
        warn: ok("signal-warn"),
      },
      fontFamily: {
        serif: ['"Newsreader Variable"', "Newsreader", "ui-serif", "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        pill: "9999px",
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
