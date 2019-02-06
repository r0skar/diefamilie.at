/**
 * Calculate linear equation between points.
 */
export const lineEq = (
  y2: number,
  y1: number,
  x2: number,
  x1: number,
  currentVal: number
): number => {
  const m = (y2 - y1) / (x2 - x1)
  const b = y1 - m * x1

  return m * currentVal + b
}
