import type { SVGProps } from 'react';
import {
  MULTIVERSA_ISOTYPE_PATHS,
  MULTIVERSA_ISOTYPE_RAW_PATHS,
} from '../assets/svg.js';
import { colors } from '../tokens/colors.js';

export type MultiversaIsotypeTheme =
  | 'light'
  | 'dark'
  | 'violet'
  | 'gold'
  | 'monochrome'
  | 'currentColor';

export type MultiversaIsotypeVariant = 'pillars' | 'squircle' | 'circle';

export interface MultiversaIsotypeProps extends SVGProps<SVGSVGElement> {
  /**
   * Width and height dimension (pixels or CSS string, e.g. 32, "2rem", "100%").
   * Defaults to 32.
   */
  size?: number | string;

  /**
   * Predefined theme color mapping.
   * Defaults to 'currentColor'.
   */
  theme?: MultiversaIsotypeTheme;

  /**
   * Container geometry variant:
   * - 'pillars': Pure authentic 3 pillars glyph mathematically centered in 512x512.
   * - 'squircle': Authentic squircle frame contour containing the 3 pillars.
   * - 'circle': Circular container badge (favicon style).
   * Defaults to 'pillars'.
   */
  variant?: MultiversaIsotypeVariant;

  /**
   * Custom fill color override. Overrides `theme` when provided.
   */
  fill?: string;
}

/**
 * MultiversaIsotype
 *
 * Renders the authentic Multiversa isotype vector glyph.
 * Extracted directly from `multiversa-wordmark-light.svg` (paths 12, 13, 14)
 * and mathematically centered on a 512x512 canvas.
 * Geometry is never approximated or redrawn.
 */
export function MultiversaIsotype({
  size = 32,
  theme = 'currentColor',
  variant = 'pillars',
  fill,
  className,
  style,
  ...props
}: MultiversaIsotypeProps) {
  // Resolve fill color
  const resolveFill = (): string => {
    if (fill) return fill;
    switch (theme) {
      case 'light':
        return '#FFFFFF';
      case 'dark':
        return colors.titanium.ink; // #0E1422
      case 'violet':
        return colors.violet.cosmic; // #6D28D9
      case 'gold':
        return colors.gold.semantic; // #D97706
      case 'monochrome':
        return '#000000';
      case 'currentColor':
      default:
        return 'currentColor';
    }
  };

  const glyphFill = resolveFill();

  if (variant === 'circle') {
    const bgFill =
      theme === 'light'
        ? colors.lavender.accent
        : colors.titanium.ink;
    const pillarFill =
      theme === 'light' ? colors.titanium.ink : '#FFFFFF';

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Multiversa Isotype"
        className={className}
        style={style}
        {...props}
      >
        <circle cx="256" cy="256" r="256" fill={bgFill} />
        <path d={MULTIVERSA_ISOTYPE_PATHS.pillar1} fill={fill || pillarFill} />
        <path d={MULTIVERSA_ISOTYPE_PATHS.pillar2} fill={fill || pillarFill} />
        <path d={MULTIVERSA_ISOTYPE_PATHS.pillar3} fill={fill || pillarFill} />
      </svg>
    );
  }

  if (variant === 'squircle') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Multiversa Isotype"
        className={className}
        style={style}
        {...props}
      >
        <g transform={MULTIVERSA_ISOTYPE_RAW_PATHS.transform}>
          <path d={MULTIVERSA_ISOTYPE_RAW_PATHS.squircleRaw} fill={glyphFill} />
          <path d={MULTIVERSA_ISOTYPE_RAW_PATHS.pillar1Raw} fill={glyphFill} />
          <path d={MULTIVERSA_ISOTYPE_RAW_PATHS.pillar2Raw} fill={glyphFill} />
          <path d={MULTIVERSA_ISOTYPE_RAW_PATHS.pillar3Raw} fill={glyphFill} />
        </g>
      </svg>
    );
  }

  // Default: authentic pure 3 pillars centered mathematically
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Multiversa Isotype"
      className={className}
      style={style}
      {...props}
    >
      <path d={MULTIVERSA_ISOTYPE_PATHS.pillar1} fill={glyphFill} />
      <path d={MULTIVERSA_ISOTYPE_PATHS.pillar2} fill={glyphFill} />
      <path d={MULTIVERSA_ISOTYPE_PATHS.pillar3} fill={glyphFill} />
    </svg>
  );
}
