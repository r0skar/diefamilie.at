/**
 * Simulate the CSS viewport unit `vh`.
 */
export const vh = (v: number) => {
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  return (v * h) / 100
}

/**
 * Simulate the CSS viewport unit `vw`.
 */
export const vw = (v: number) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  return (v * w) / 100
}

/**
 * Simulate the CSS viewport unit `vmin`.
 */
export const vmin = (v: number) => Math.min(vh(v), vw(v))

/**
 * Simulate the CSS viewport unit `vmax`.
 */
export const vmax = (v: number) => Math.max(vh(v), vw(v))
