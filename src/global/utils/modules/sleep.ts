/**
 * Return a Promise that waits for `n` milliseconds to resolve.
 */
export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
