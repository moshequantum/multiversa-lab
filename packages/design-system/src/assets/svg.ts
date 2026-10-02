/**
 * Canonical Multiversa Brand Vector Glyphs & Assets
 *
 * CRITICAL RULE:
 * NEVER redraw, simplify, or alter the vector geometry.
 * The 3 pillars are extracted directly from `multiversa-wordmark-light.svg` (paths 12, 13, 14)
 * and mathematically centered on a 512x512 canvas.
 */

export interface IsotypePaths {
  readonly pillar1: string;
  readonly pillar2: string;
  readonly pillar3: string;
}

export interface IsotypeRawPaths {
  readonly pillar1Raw: string;
  readonly pillar2Raw: string;
  readonly pillar3Raw: string;
  readonly squircleRaw: string;
  readonly transform: string;
}

/**
 * Mathematically centered 3 pillars in viewBox="0 0 512 512"
 * Linear transformation from wordmark: scale S = 2.956556, dx = 8.4724, dy = 57.3932
 * Center of X: (116.00 + 396.00) / 2 = 256.00
 * Center of Y: (156.97 + 355.03) / 2 = 256.00
 */
export const MULTIVERSA_ISOTYPE_PATHS: IsotypePaths = {
  pillar1: 'M189.25 355.03H116.00L143.47 156.97H216.77L189.25 355.03Z',
  pillar2: 'M280.71 355.03H207.41L234.93 156.97H308.18L280.71 355.03Z',
  pillar3: 'M372.12 355.03H298.87L326.34 156.97H343.97C373.37 156.97 396.00 182.93 391.94 212.06L372.12 355.03Z',
} as const;

/**
 * Raw paths exactly as extracted from `multiversa-wordmark-light.svg`
 */
export const MULTIVERSA_ISOTYPE_RAW_PATHS: IsotypeRawPaths = {
  pillar1Raw: 'M61.1452 100.67H36.3692L45.6602 33.6799H70.4538L61.1452 100.67Z',
  pillar2Raw: 'M92.08 100.67H67.2864L76.595 33.6799H101.371L92.08 100.67Z',
  pillar3Raw: 'M122.997 100.67H98.2212L107.512 33.6799H113.477C123.42 33.6799 131.074 42.4606 129.702 52.3147L122.997 100.67Z',
  squircleRaw: 'M153.316 134.332H38.4984C27.3598 134.332 16.7842 129.511 9.46402 121.117C2.14384 112.724 -1.16432 101.585 0.366583 90.5521L8.32024 33.2048C10.9421 14.2708 27.3422 0 46.4521 0H127.731C138.869 0 149.445 4.82147 156.765 13.215C164.085 21.6086 167.393 32.7649 165.863 43.7979L153.299 134.35L153.316 134.332ZM46.4521 11.473C33.0259 11.473 21.5177 21.503 19.67 34.7885L11.7164 92.1358C10.643 99.8783 12.9657 107.709 18.1039 113.604C23.2422 119.498 30.6679 122.877 38.4808 122.877H143.304L154.495 42.2142C155.569 34.4717 153.246 26.6412 148.108 20.7464C142.969 14.8515 135.544 11.473 127.731 11.473H46.4521Z',
  transform: 'translate(8.4724, 57.3932) scale(2.956556)',
} as const;

/** Canonical Isotype SVG string (viewBox: 0 0 512 512) */
export const MULTIVERSA_ISOTYPE_SVG = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar1}" fill="currentColor"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar2}" fill="currentColor"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar3}" fill="currentColor"/>
</svg>`;

/** Canonical Isotype Squircle SVG string (viewBox: 0 0 512 512) */
export const MULTIVERSA_ISOTYPE_SQUIRCLE_SVG = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="${MULTIVERSA_ISOTYPE_RAW_PATHS.transform}">
    <path d="${MULTIVERSA_ISOTYPE_RAW_PATHS.squircleRaw}" fill="currentColor"/>
    <path d="${MULTIVERSA_ISOTYPE_RAW_PATHS.pillar1Raw}" fill="currentColor"/>
    <path d="${MULTIVERSA_ISOTYPE_RAW_PATHS.pillar2Raw}" fill="currentColor"/>
    <path d="${MULTIVERSA_ISOTYPE_RAW_PATHS.pillar3Raw}" fill="currentColor"/>
  </g>
</svg>`;

/** Canonical Favicon Dark SVG string */
export const MULTIVERSA_FAVICON_DARK_SVG = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="256" cy="256" r="256" fill="#0E1422"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar1}" fill="#FFFFFF"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar2}" fill="#FFFFFF"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar3}" fill="#FFFFFF"/>
</svg>`;

/** Canonical Favicon Light SVG string */
export const MULTIVERSA_FAVICON_LIGHT_SVG = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="256" cy="256" r="256" fill="#F5F3FF"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar1}" fill="#0E1422"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar2}" fill="#0E1422"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar3}" fill="#0E1422"/>
</svg>`;

/** Canonical Favicon Squircle SVG string */
export const MULTIVERSA_FAVICON_SQUIRCLE_SVG = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="128" fill="#0E1422"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar1}" fill="#FFFFFF"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar2}" fill="#FFFFFF"/>
  <path d="${MULTIVERSA_ISOTYPE_PATHS.pillar3}" fill="#FFFFFF"/>
</svg>`;
