/**
 * Multiversa Tailwind preset — Cosmic Night (CommonJS, no build step required).
 *
 * Mirrors src/preset.ts. Colors read the CSS channels defined in ./tokens.css, so load the
 * tokens once in your CSS (`@import "@multiversa/design-system/tokens.css";`).
 *
 * The file is .cjs because the package is "type": "module": a CommonJS preset.js would not
 * load with require(). STRICT BRAND INVARIANT: no chartreuse.
 */

const ok = (name) => `oklch(var(--${name}) / <alpha-value>)`;

const typography = {
  fontFamily: {
    sans: ['Plus Jakarta Sans Variable', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    display: ['Plus Jakarta Sans Variable', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    serif: ['Newsreader Variable', 'Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    editorial: ['Newsreader Variable', 'Newsreader', 'Georgia', 'serif'],
    mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    code: ['JetBrains Mono Variable', 'JetBrains Mono', 'monospace'],
  },
};

const multiversaPreset = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cosmic Night semantic tokens (same names as the Group site)
        background: ok('background'),
        foreground: ok('foreground'),
        border: ok('border'),
        input: ok('input'),
        ring: ok('ring'),
        'muted-fg': ok('muted-foreground'),

        canvas: ok('background'),
        void: ok('background'),
        surface: ok('card'),
        card: ok('card'),
        'card-hover': ok('card-hover'),

        primary: ok('primary'),
        'primary-hover': ok('primary-hover'),
        secondary: ok('secondary-foreground'),
        accent: ok('primary'),
        alternative: ok('alternative'),
        gold: ok('alternative'),
        destructive: ok('destructive'),

        // Typographic tones
        ivory: ok('foreground'),
        copy: ok('foreground'),
        sand: ok('muted-foreground'),
        muted: ok('muted-foreground'),
      },
      fontFamily: typography.fontFamily,
      borderRadius: {
        pill: '9999px',
        squircle: '1.75rem',
      },
      boxShadow: {
        'card-glow': '0 0 24px -4px rgba(182, 140, 255, 0.15)',
        'card-hover': '0 12px 32px -8px rgba(0, 0, 0, 0.6), 0 0 30px -5px rgba(182, 140, 255, 0.22)',
        'pill-glow': '0 0 12px -2px rgba(182, 140, 255, 0.3)',
        'gold-glow': '0 0 16px -2px oklch(0.75 0.14 65 / 0.3)',
      },
      keyframes: {
        'multiversa-ping': {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },
      animation: {
        'multiversa-ping': 'multiversa-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
};

module.exports = multiversaPreset;
module.exports.default = multiversaPreset;
module.exports.multiversaPreset = multiversaPreset;
