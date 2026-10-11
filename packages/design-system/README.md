# @multiversa/design-system

The canonical design system for the Multiversa ecosystem: **Cosmic Night** tokens, brand vector
assets, the official logo lockup and a Tailwind preset.

Canonical means *what ships today*: these are the exact tokens used by
[lab.multiversa.group](https://lab.multiversa.group) (`multiversa-lab/apps/lab-web`, which consumes
this package) and [multiversa.group](https://multiversa.group) (`multiversaOS/apps/web`, which keeps
its own copy of the same values until it adopts a tagged release of this package).

> **Paleta descontinuada (anterior a Cosmic Night).** The earlier Titanium Ink / Cosmic Violet /
> Lavender / Semantic Gold palette was the version before Cosmic Night. It never shipped on either
> site, it is not an alternative theme, and its tokens are no longer exported.

---

## 1. Tokens — Cosmic Night

### CSS (framework-agnostic)

```css
@import "@multiversa/design-system/tokens.css";
```

`tokens.css` defines two layers of custom properties on `:root`:

1. **Channels** — raw oklch components (`L C H`), so any consumer can add alpha:
   `oklch(var(--primary) / 0.2)`. This is the form the Tailwind preset reads.
2. **Full-color aliases** — ready-to-use colors with the names the Group site uses:
   `--color-canvas`, `--color-surface`, `--color-card`, `--color-primary`, `--color-primary-hover`,
   `--color-primary-glow`, `--color-secondary`, `--color-accent`, `--color-alternative`,
   `--color-ivory`, `--color-sand`, `--color-muted`, `--color-border`, `--hairline`.

| Token | Channels (oklch) | Role |
|---|---|---|
| `--background` | `0.1743 0.0227 283.7998` | Canvas (night) |
| `--foreground` | `0.9185 0.0257 285.8834` | Ivory text |
| `--card` | `0.2284 0.0384 282.9324` | Surfaces |
| `--card-hover` | `0.25 0.045 282.93` | Hovered surface |
| `--primary` | `0.7162 0.1597 290.3962` | Primary accent (lilac) |
| `--primary-hover` | `0.78 0.15 290.4` | Primary, hovered |
| `--secondary` | `0.3139 0.0736 283.4591` | Secondary surface |
| `--secondary-foreground` | `0.8367 0.0849 285.9111` | Secondary text / code keys |
| `--muted` | `0.271 0.0621 281.4377` | Muted surface |
| `--muted-foreground` | `0.7166 0.0462 285.1741` | Muted text |
| `--accent` | `0.3354 0.0828 280.9705` | Accent surface |
| `--destructive` | `0.6861 0.2061 14.9941` | Errors |
| `--border` | `0.3261 0.0597 282.5832` | Hairlines and borders |
| `--alternative` | `0.75 0.14 65` | Warm gold (use sparingly) |

**Brand invariant:** no chartreuse / neon green. Not as a token, not as an alias.

### JS / TS

```ts
import { colors, channels, withAlpha } from '@multiversa/design-system/tokens';

colors.primary;              // 'oklch(0.7162 0.1597 290.3962)'
channels.primary;            // '0.7162 0.1597 290.3962'
withAlpha('primary', 0.2);   // 'oklch(0.7162 0.1597 290.3962 / 0.2)'
```

### Typography

Both sites self-host the variable builds (`@fontsource-variable/*`):

- **Display / Sans**: `'Plus Jakarta Sans Variable'`, `'Plus Jakarta Sans'`, system-ui
- **Editorial / Serif**: `'Newsreader Variable'`, `'Newsreader'`, Georgia, serif
- **Monospace / Code**: `'JetBrains Mono Variable'`, `'JetBrains Mono'`, monospace

---

## 2. Tailwind preset

The preset maps the tokens to the utility names both sites use (`bg-canvas`, `text-ivory`,
`text-muted`, `border-border`, `bg-primary/10`, `text-alternative`…). Colors read the CSS
channels, so load `tokens.css` once.

```js
// tailwind.config.js (ESM) — no build step needed: require() resolves to preset.cjs
import { createRequire } from 'node:module';
const multiversaPreset = createRequire(import.meta.url)('@multiversa/design-system/preset');

export default {
  presets: [multiversaPreset],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
};
```

```js
// tailwind.config.cjs
module.exports = { presets: [require('@multiversa/design-system/preset')], content: [/* … */] };
```

`import '@multiversa/design-system/preset'` also works once the package is built (`dist/`).
`preset.cjs` and `src/preset.ts` are kept identical by the test suite.

---

## 3. Logo and brand assets

### `MultiversaLogo` — the official lockup

Squircle emblem with the three pillars plus the bespoke lowercase **multiversa** wordmark. Same
geometry as `assets/multiversa-wordmark-light.svg` (viewBox `0 0 680 135`); the tests compare the
paths byte for byte.

```tsx
import { MultiversaLogo } from '@multiversa/design-system';

<MultiversaLogo height={24} className="text-ivory" />          // role="img", aria-label="Multiversa"
<a href="/" aria-label="Multiversa Lab, home">
  <MultiversaLogo height={22} decorative className="text-white" />
</a>
```

Rules: paint it white / ivory on dark surfaces (`currentColor`). Never re-tint it purple, never
redraw it, and never use the bare pillars as the logo.

### SVG assets

Geometry is preserved exactly; paths are never approximated or redrawn.

| Asset | Path | Description |
|---|---|---|
| **Wordmark Light** | `assets/multiversa-wordmark-light.svg` | Official lockup for dark surfaces (same paths as `MultiversaLogo`). |
| **Wordmark Dark** | `assets/multiversa-wordmark-dark.svg` | Official lockup for light surfaces. |
| **Isotype** | `assets/multiversa-isotype.svg` | The 3 pillars centered in `viewBox="0 0 512 512"` (emblem detail, not a logo on its own). |
| **Isotype Squircle** | `assets/multiversa-isotype-squircle.svg` | The 3 pillars inside the squircle frame. |
| **Favicons** | `assets/multiversa-favicon-{dark,light,squircle}.svg` | App icons. Their fills are frozen with the published icons and are not palette tokens. |

`apps/lab-web/public/` serves copies of these files; `apps/lab-web/scripts/check-brand-assets.mjs`
fails the build if any copy drifts from this package.

#### Isotype centering
- **Pillar 1**: `M189.25 355.03H116.00L143.47 156.97H216.77L189.25 355.03Z`
- **Pillar 2**: `M280.71 355.03H207.41L234.93 156.97H308.18L280.71 355.03Z`
- **Pillar 3**: `M372.12 355.03H298.87L326.34 156.97H343.97C373.37 156.97 396.00 182.93 391.94 212.06L372.12 355.03Z`
- Bounds `X ∈ [116, 396]`, `Y ∈ [156.97, 355.03]` → center (256, 256).

---

## 4. Other React components

```tsx
import { MultiversaIsotype, StatusPill, DesignCard } from '@multiversa/design-system';

<MultiversaIsotype size={40} variant="squircle" theme="light" />
<StatusPill variant="operating" label="Autonomous Kernel" />
<DesignCard variant="glow" accent="primary" title="Dispatcher" badge={<StatusPill size="sm" />}>
  …
</DesignCard>
```

All of them use Cosmic Night values (`primary`, `alternative`, `muted-foreground`).

---

## 5. Consuming from source (monorepo)

The `.` and `./tokens` exports expose a `source` condition that points at `src/`. Workspace apps
can resolve it without building `dist/` first:

- Vite: `resolve.conditions: ['source', ...defaultClientConditions]` (and `ssr.resolve.conditions`)
- TypeScript: `"customConditions": ["source"]` with `"moduleResolution": "bundler"`

Without that condition, consumers get the compiled `dist/` build.

---

## 6. Development

```bash
pnpm build       # emit dist/ (ESM + declarations)
pnpm test        # build, then asset / token / logo / preset integrity tests
pnpm typecheck
```
