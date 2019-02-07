import { appHeaderHeight, baseRatio, fontWeights, tracking } from './variables'
import { clearFix, ellipsis, modularScale, stripUnit } from 'polished'
import { types } from 'typestyle'

/**
 * Export selected polished functions.
 */
export { ellipsis, stripUnit, clearFix }

/**
 * Modular scale helper that returns `rem` units.
 * Defaults to `0` steps.
 */
export const ms = (steps = 0) => {
  return `${stripUnit(modularScale(steps, 1, baseRatio))}rem`
}

/**
 * Visually hide/show an element.
 * This behaves just the same as gsap's `autoAlpha`.
 */
export const autoAlpha = (showHide: Number): types.NestedCSSProperties => {
  return {
    opacity: showHide === 1 ? 1 : 0,
    visibility: showHide === 1 ? `inherit` : `hidden`,
    willChange: `opacity, visibility, transform`
  }
}

/**
 * Wrap content to a specific width.
 * Defaults to `100%` for maxWidth and width and `center` for alignment.
 */
export const wrap = (
  maxWidth: string | number = `100%`,
  width: string | number = `100%`,
  align: string = `center`
): types.NestedCSSProperties => {
  return {
    maxWidth,
    width,
    marginLeft: align === `center` || align === `right` ? `auto` : undefined,
    marginRight: align === `center` || align === `left` ? `auto` : undefined
  }
}

/**
 * Generate a new headline.
 * `type` defaults to `h1`.
 * `resetLineHeight` defaults to `true`.
 * `bottomSpacing` defaults to `false`.
 */
export const headline = (
  type: `h1` | `h2` | `h3` | `h4` = `h1`,
  resetLineHeight = true,
  bottomSpacing = false
): types.NestedCSSProperties => {
  let fontSize = ms(3)
  let letterSpacing!: string

  if (type === `h1`) letterSpacing = tracking.narrow
  if (type === `h2`) fontSize = ms(2)
  if (type === `h3`) fontSize = ms(1)
  if (type === `h4`) fontSize = ms(0)

  return {
    fontSize,
    letterSpacing,
    lineHeight: resetLineHeight ? 1.15 : `inherit`,
    marginBottom: bottomSpacing ? ms(1) : undefined
  }
}

/**
 * Generate styles for the home intro.
 * `index` starts at `1`, because `nth-child` counting does too.
 */
export const homeIntro = (): {
  container: (index: number) => types.NestedCSSProperties
  content: types.NestedCSSProperties
} => {
  const itemWidth = `60%`

  return {
    container: (index) => {
      const x = `calc((${itemWidth} / 2) * -1)`
      const y = `calc((${appHeaderHeight} / 2) * -1)`
      const centerX = `calc((100% - ${itemWidth}) / 2)`
      const centerY = `calc(50% - 0.5rem)`

      let position!: types.NestedCSSProperties

      if (index === 1) position = { left: centerX, top: y }
      if (index === 2) position = { right: x, top: centerY }
      if (index === 3) position = { bottom: y, left: centerX }
      if (index === 4) position = { left: x, top: centerY }

      return {
        ...position,
        display: `block`,
        position: `absolute`,
        textAlign: `center`,
        width: itemWidth
      }
    },
    content: {
      ...headline(`h3`),
      background: `none`,
      cursor: `pointer`,
      fontWeight: fontWeights.light,
      letterSpacing: tracking.wide,
      display: `block`,
      textAlign: `center`,
      textDecoration: `none`,
      textTransform: `uppercase`,
      userSelect: `none`,
      width: `100%`
    }
  }
}

/**
 * Fills the parent container's height.
 */
export const fillParentHeight: types.NestedCSSProperties = {
  display: `block`,
  minHeight: `inherit`,
  height: `100%`
}

/**
 * Completely covers the parent container.
 */
export const coverParent: types.NestedCSSProperties = {
  ...fillParentHeight,
  bottom: 0,
  left: 0,
  margin: `auto`,
  position: `absolute`,
  right: 0,
  top: 0,
  width: `100%`
}

/**
 * Vertically align content.
 */
export const vAlign: types.NestedCSSProperties = {
  display: `flex`,
  justifyContent: `center`,
  flexDirection: `column`
}
