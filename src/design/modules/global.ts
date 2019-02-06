import { breakpoints, colors, fontSans, fontSizeRange, fontWeights } from './variables'
import { cssRule, media } from 'typestyle'
import { ms, stripUnit } from './utils'

export const globalCss = () => {
  const lineHeight = stripUnit(ms(1))
  const fontFamily = `${fontSans}, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
  const fontRangeMin = `${fontSizeRange.min}px + (${fontSizeRange.max} - ${fontSizeRange.min}`
  const fontRangeMax = `((100vw - ${breakpoints.xs}px) / (${breakpoints.lg} - ${breakpoints.xs}))`
  const responsiveFontSize = `calc(${fontRangeMin}) * ${fontRangeMax})`

  cssRule(
    `html`,
    { fontSize: `${fontSizeRange.min}px` },
    media({ minWidth: breakpoints.xs }, { fontSize: responsiveFontSize }),
    media({ minWidth: breakpoints.lg }, { fontSize: `${fontSizeRange.max}px` })
  )

  cssRule(`body`, {
    lineHeight,
    fontFamily,
    backgroundColor: colors.bg,
    color: colors.text
  })

  cssRule(`#app`, {
    minHeight: `100vh`,
    width: `100%`
  })

  cssRule(`b, strong`, {
    fontWeight: fontWeights.bold
  })
}
