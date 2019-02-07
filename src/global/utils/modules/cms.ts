import { percentageDiff } from './percentageDiff'
import { types } from 'typestyle'
import sample from 'lodash/sample'

/**
 * Create an image url for a CMS image object.
 *
 * If no `width` is provided, we fall back to either `maxWidth`
 * (defaults to `1200px`), or to `200px` if `compress` is `true`.
 */
export const image = ({
  img,
  width,
  compress,
  maxWidth = 1200
}: {
  img: { url: string; format: string }
  width?: number
  maxWidth?: number
  compress?: boolean
}) => {
  const { url, format } = img
  const sep = url.includes(`?`) ? `&` : `?`
  const w = width ? width : compress ? 200 : maxWidth
  const c = compress ? `&auto=compress` : ``
  const ext = `&auto=format&fm=${format}`

  return `${url}${sep}w=${w}${ext}${c}`
}

/**
 * Convert CMS block alignment to flexbox properties.
 * The alignment defaults to `flex-start`.
 */
export const alignment = (alignment = `flex-start`) => {
  if (alignment === `top`) alignment = `flex-start`
  if (alignment === `center`) alignment = `center`
  if (alignment === `bottom`) alignment = `flex-end`

  return alignment
}

/**
 * The CMS returns the width as string of type `1/n`.
 * To calculate the factor, we divide the divident
 * with the divisor and multiply by 100 to get the percentage.
 *
 * The width defaults to `1/1`, which returns `100%`.
 */
export const width = (w = `1/1`) => {
  const divident = Number(w.split(`/`)[0])
  const divisor = Number(w.split(`/`)[1])
  const percentage = `${percentageDiff(divident, divisor, 2)}%`

  return percentage
}

/**
 * Generate placeholder for image based on its `colors`.
 * Fall back defaults to `{ backgroundColor: `#222222` }`.
 */
export const placeholder = (
  image: Cms.Image,
  fallback: types.NestedCSSProperties = { backgroundColor: `#222222` }
): types.NestedCSSProperties => {
  const { colors } = image

  if (!colors) return fallback

  return {
    backgroundImage: `
      radial-gradient(ellipse at top, ${sample(colors)}, transparent),
      radial-gradient(ellipse at bottom, ${sample(colors)}, transparent)
    `
  }
}
