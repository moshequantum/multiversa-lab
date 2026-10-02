# @multiversa/design-system

The canonical design system, brand vector assets, and Tailwind preset for the Multiversa ecosystem.

---

## 1. Canonical Brand Assets (SVG)

Authentic vector assets extracted directly from the primary brand identity.
**Rule**: Geometry is mathematically preserved. Paths are never approximated or redrawn.

| Asset | Path | Description |
|---|---|---|
| **Authentic Isotype** | `assets/multiversa-isotype.svg` | The 3 pillars (paths 12, 13, 14) mathematically centered in `viewBox="0 0 512 512"`. |
| **Isotype Squircle** | `assets/multiversa-isotype-squircle.svg` | The 3 pillars framed within the authentic squircle container. |
| **Favicon Dark** | `assets/multiversa-favicon-dark.svg` | Titanium Ink (`#0E1422`) circular badge with white pillars. |
| **Favicon Light** | `assets/multiversa-favicon-light.svg` | Lavender Accent (`#F5F3FF`) circular badge with titanium pillars. |
| **Favicon Squircle** | `assets/multiversa-favicon-squircle.svg` | Titanium Ink squircle badge with white pillars. |
| **Wordmark Light** | `assets/multiversa-wordmark-light.svg` | Official light wordmark for dark surfaces. |
| **Wordmark Dark** | `assets/multiversa-wordmark-dark.svg` | Official dark wordmark for light surfaces. |

### Mathematical Centering Formula
- **Pillar 1**: `M189.25 355.03H116.00L143.47 156.97H216.77L189.25 355.03Z`
- **Pillar 2**: `M280.71 355.03H207.41L234.93 156.97H308.18L280.71 355.03Z`
- **Pillar 3**: `M372.12 355.03H298.87L326.34 156.97H343.97C373.37 156.97 396.00 182.93 391.94 212.06L372.12 355.03Z`
- **Horizontal Bounds**: `X ∈ [116.00, 396.00]` → Center $X = \frac{116 + 396}{2} = 256.00$
- **Vertical Bounds**: `Y ∈ [156.97, 355.03]` → Center $Y = \frac{156.97 + 355.03}{2} = 256.00$

---

## 2. Tokens & Theme Preset

### Colors

```typescript
import { colors } from '@multiversa/design-system/tokens';
```

- **Titanium Ink**: `#0E1422` (primary ink) / `#0F172A` (surface)
- **Cosmic Violet**: `#6D28D9` (visionary accent)
- **Lavender Accent**: `#F5F3FF` (luminous highlight) / `#EDE9FE` (subtle tint)
- **Semantic Gold**: `#D97706` (prestige & delivery)
- **Slate & Borders**: `#334155` (dark border), `#64748B` (slate), `#E2E8F0` (light border)
- **Brand Invariant**: Chartreuse (`#d4ff00`) is strictly excluded.

### Typography

- **Display / Sans**: `'Plus Jakarta Sans'`, system-ui, sans-serif
- **Editorial / Serif**: `'Newsreader'`, Georgia, serif
- **Monospace / Code**: `'JetBrains Mono'`, monospace

---

## 3. Tailwind Preset Configuration

### Consuming in `apps/lab-web`

Add `@multiversa/design-system` to your dependencies in `multiversa-lab`:

```json
// apps/lab-web/package.json
{
  "dependencies": {
    "@multiversa/design-system": "workspace:*"
  }
}
```

In `apps/lab-web/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
import multiversaPreset from '@multiversa/design-system/preset';

export default {
  presets: [multiversaPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/design-system/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Consuming in `MultiversaOs`

In `MultiversaOs/apps/web/tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
import multiversaPreset from '@multiversa/design-system/preset';

export default {
  presets: [multiversaPreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

*(Or using CommonJS: `presets: [require('@multiversa/design-system/preset')]`)*

---

## 4. React Components

### `MultiversaIsotype`

Renders the authentic vector isotype:

```tsx
import { MultiversaIsotype } from '@multiversa/design-system';

// Pure 3 pillars (centered in 512x512)
<MultiversaIsotype size={40} theme="violet" />

// Squircle badge
<MultiversaIsotype size={48} variant="squircle" theme="light" />

// Circular badge (favicon style)
<MultiversaIsotype size={32} variant="circle" theme="dark" />
```

### `StatusPill`

Renders operating badges with pulsing beacon:

```tsx
import { StatusPill } from '@multiversa/design-system';

<StatusPill variant="production" label="Production Live" pulse />
<StatusPill variant="operating" label="Autonomous Kernel" pulse />
<StatusPill variant="standard" label="Standard v1.0" pulse={false} />
<StatusPill variant="delivers" label="Delivers Milestone" pulse />
```

### `DesignCard`

Architectural card component with subtle glow and Multiversa aesthetics:

```tsx
import { DesignCard, StatusPill } from '@multiversa/design-system';

<DesignCard
  variant="glow"
  accent="violet"
  title="Autonomous Dispatcher"
  subtitle="Deterministic agent cluster orchestration"
  badge={<StatusPill variant="operating" size="sm" />}
  footer={<span>Last sync 2m ago</span>}
>
  <p>Executes multi-agent workflows with verified state receipts.</p>
</DesignCard>
```

---

## 5. Development & Testing

```bash
# Build the TypeScript declarations and ESM bundles
pnpm build

# Run export and asset integrity tests
pnpm test

# Typecheck package
pnpm typecheck
```
