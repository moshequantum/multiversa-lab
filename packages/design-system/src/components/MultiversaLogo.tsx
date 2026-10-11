import type { SVGProps } from 'react';
import {
  MULTIVERSA_LOCKUP_HEIGHT,
  MULTIVERSA_LOCKUP_PATHS,
  MULTIVERSA_LOCKUP_VIEWBOX,
  MULTIVERSA_LOCKUP_WIDTH,
} from '../assets/svg.js';

export interface MultiversaLogoProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Rendered height in px (width follows the 680:135 ratio). Defaults to 28. */
  height?: number;
  /**
   * Accessible name. Defaults to "Multiversa". Ignored when `decorative` is true.
   */
  title?: string;
  /**
   * Set when the logo sits inside an element that already carries the accessible name
   * (e.g. a home link with its own aria-label): the SVG is then hidden from assistive tech.
   */
  decorative?: boolean;
}

/**
 * MultiversaLogo — the official lockup: squircle emblem with the three pillars plus the
 * bespoke lowercase "multiversa" wordmark. Same geometry as `assets/multiversa-wordmark-light.svg`.
 *
 * Paints with `currentColor`. Brand rule: on dark surfaces use white / ivory
 * (`text-white`, `text-ivory`); never re-tint it purple, never show the pillars alone as a logo.
 */
export function MultiversaLogo({
  height = 28,
  title = 'Multiversa',
  decorative = false,
  className,
  ...props
}: MultiversaLogoProps) {
  const width = Math.round((height * MULTIVERSA_LOCKUP_WIDTH) / MULTIVERSA_LOCKUP_HEIGHT);
  const a11y = decorative
    ? ({ 'aria-hidden': true, focusable: 'false' } as const)
    : ({ role: 'img', 'aria-label': title } as const);

  return (
    <svg
      viewBox={MULTIVERSA_LOCKUP_VIEWBOX}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11y}
      {...props}
    >
      {MULTIVERSA_LOCKUP_PATHS.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </svg>
  );
}
