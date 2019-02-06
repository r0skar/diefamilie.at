/**
 * Return the percentage value of `x` in relation to `y`.
 */
export const percentageDiff = (x: number, y: number, round = 0) => {
  return Number(Math.min(100, Math.max(0, (x * 100) / y)).toFixed(round))
}
