import isArray from 'lodash/isArray'

/**
 * Check if a string or an array of strings includes a substring.
 */
export const includesString = (haystack?: string | string[], needle?: string) => {
  if (!haystack || !needle) return false

  const toLowerCase = (s: string) => s.toLowerCase()

  needle = toLowerCase(needle)

  if (isArray(haystack)) {
    return haystack.map(toLowerCase).includes(needle)
  }

  return toLowerCase(haystack).includes(needle)
}
