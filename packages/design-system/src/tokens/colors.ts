/**
 * Multiversa Design System — Cosmic Night color tokens (canonical).
 *
 * These are the exact values shipped today by lab.multiversa.group and multiversa.group.
 * The CSS source of truth is `tokens.css` at the package root; this module mirrors it for
 * JS/TS consumers (inline styles, canvas, charts, emails).
 *
 * - `channels`: raw oklch components ("L C H"), for `oklch(var(--x) / alpha)` style usage.
 * - `colors`:   full `oklch(...)` color strings.
 * - `withAlpha(name, a)`: one token at a given opacity.
 *
 * Paleta descontinuada (anterior a Cosmic Night): Titanium Ink / Cosmic Violet / Semantic Gold.
 * It is not an alternative theme and none of its tokens are exported.
 *
 * STRICT BRAND INVARIANT:
 * NO Chartreuse. Legacy chartreuse / neon green is strictly forbidden.
 */

export const channels = {
  background: '0.1743 0.0227 283.7998',
  foreground: '0.9185 0.0257 285.8834',
  card: '0.2284 0.0384 282.9324',
  cardForeground: '0.9185 0.0257 285.8834',
  cardHover: '0.25 0.045 282.93',
  popover: '0.2284 0.0384 282.9324',
  popoverForeground: '0.9185 0.0257 285.8834',
  primary: '0.7162 0.1597 290.3962',
  primaryHover: '0.78 0.15 290.4',
  primaryForeground: '0.1743 0.0227 283.7998',
  secondary: '0.3139 0.0736 283.4591',
  secondaryForeground: '0.8367 0.0849 285.9111',
  muted: '0.271 0.0621 281.4377',
  mutedForeground: '0.7166 0.0462 285.1741',
  accent: '0.3354 0.0828 280.9705',
  accentForeground: '0.9185 0.0257 285.8834',
  destructive: '0.6861 0.2061 14.9941',
  destructiveForeground: '1 0 0',
  border: '0.3261 0.0597 282.5832',
  borderMedium: '0.38 0.05 282.6',
  input: '0.3261 0.0597 282.5832',
  ring: '0.7162 0.1597 290.3962',
  alternative: '0.75 0.14 65',
  alternativeHover: '0.82 0.13 65',
} as const;

export type ColorToken = keyof typeof channels;

/** `oklch(L C H)` or `oklch(L C H / alpha)` for a Cosmic Night token. */
export function withAlpha(token: ColorToken, alpha?: number): string {
  return alpha === undefined ? `oklch(${channels[token]})` : `oklch(${channels[token]} / ${alpha})`;
}

const full = Object.fromEntries(
  Object.entries(channels).map(([k, v]) => [k, `oklch(${v})`])
) as { readonly [K in ColorToken]: string };

/** Cosmic Night semantic colors, plus the Group-site aliases (canvas, surface, ivory, sand…). */
export const colors = {
  ...full,
  canvas: full.background,
  surface: full.card,
  ivory: full.foreground,
  sand: full.mutedForeground,
  primaryGlow: 'rgba(182, 140, 255, 0.22)',
  accentGlow: 'rgba(182, 140, 255, 0.15)',
  hairline: withAlpha('border', 0.7),
} as const;

/** Status colors used by StatusPill, derived from the palette (no chartreuse, no neon). */
export const statusColors = {
  production: {
    dot: 'oklch(0.8 0.11 165)',
    bg: 'oklch(0.8 0.11 165 / 0.08)',
    border: 'oklch(0.8 0.11 165 / 0.3)',
    text: 'oklch(0.8 0.11 165)',
  },
  operating: {
    dot: colors.primary,
    bg: withAlpha('primary', 0.1),
    border: withAlpha('primary', 0.35),
    text: colors.primary,
  },
  standard: {
    dot: colors.mutedForeground,
    bg: withAlpha('mutedForeground', 0.08),
    border: withAlpha('mutedForeground', 0.25),
    text: colors.mutedForeground,
  },
  delivers: {
    dot: colors.alternative,
    bg: withAlpha('alternative', 0.1),
    border: withAlpha('alternative', 0.35),
    text: colors.alternativeHover,
  },
} as const;

export type Colors = typeof colors;
