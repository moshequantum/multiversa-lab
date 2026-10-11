import type { SVGProps } from 'react';
import {
  MULTIVERSA_ISOTYPE_PATHS,
  MULTIVERSA_ISOTYPE_RAW_PATHS,
} from '../assets/svg.js';
import { colors } from '../tokens/colors.js';

export type MultiversaIsotypeTheme =
  | 'light'
  | 'dark'
  | 'primary'
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
 * Renders the authentic Multiversa isotype vector glyph (the emblem only).
 * For the brand logo use `MultiversaLogo` (full lockup); the bare pillars are not a logo.
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
        return colors.background; // Cosmic Night canvas
      case 'primary':
        return colors.primary; // oklch(0.7162 0.1597 290.3962)
      case 'gold':
        return colors.alternative; // oklch(0.75 0.14 65)
      case 'monochrome':
        return '#000000';
      case 'currentColor':
      default:
        return 'currentColor';
    }
  };

  const glyphFill = resolveFill();

  if (variant === 'circle') {
    const bgFill = theme === 'light' ? colors.foreground : colors.background;
    const pillarFill = theme === 'light' ? colors.background : '#FFFFFF';

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
