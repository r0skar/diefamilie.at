/**
 * Baseline ratio used to calculate modular scaling.
 * @see https://polished.js.org/docs/#modularscaleratio
 */
export const baseRatio = `goldenSection`

/**
 * Default font families.
 */
export const fontSans = `IBM Plex Sans`
export const fontSerif = `serif`

/**
 * App font size range in pixels.
 * Used to set the min and max size of the responsive body font.
 */
export const fontSizeRange = {
  min: 14,
  max: 22
}

/**
 * App font weights.
 */
export const fontWeights = {
  light: 300,
  normal: 400,
  bold: 500
}

/**
 * App colors.
 */
export const colors = {
  bg: `#fafafa`,
  text: `#222222`,
  brand: `#ffefc6`,
  white: `#ffffff`,
  black: `#000000`
}

/**
 * App media breakpoints.
 * @see https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints
 */
export const breakpoints = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1200
}

/**
 * App width.
 */
export const appWidth = breakpoints.lg

/**
 * App header height.
 */
export const appHeaderHeight = `30vh`

/**
 * App footer height.
 */
export const appFooterHeight = `30vh`

/**
 * Max width of content elements that contain mainly text.
 * The unit should be fluid, in order to keep the paragraph width
 * roughly the same for different font sizes.
 */
export const contentWidth = `30rem`
