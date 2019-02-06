import * as Utils from './modules/utils'
import * as variables from './modules/variables'
import { globalCss } from './modules/global'
import { media, style, types } from 'typestyle'
import { resetCss } from './modules/reset'

/**
 * Plyr plugin CSS.
 */
const plyrCss = () => import(`plyr/dist/plyr.css`)

/**
 * Shorthand for the CSS Prop type.
 */
export type CssProps = types.NestedCSSProperties

/**
 * The `design` object includes all variables as well as all
 * utility functions. The utility functions are inside the object `Utils`,
 * while the variables are mapped 1:1 to the new `design` object.
 */
export const design = {
  ...variables,
  Utils
}

/**
 * The `registerStyles` function is called upon App load and registers
 * all CSS that should be available globally.
 */
export const registerStyles = () => {
  resetCss()
  globalCss()
  plyrCss()
}

/**
 * Export typestyle's style and helper functions.
 */
export { style as css, media }
