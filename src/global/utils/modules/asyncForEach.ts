/**
 * Async forEach helper utility.
 *
 * Accepts and `array` and an `async function` as callback.
 * Will loop over the `array` and run the callback with the
 * item as argument, awaiting all Promises within.
 *
 * Returns a `promise` itself.
 */
export const asyncForEach = async (array: any[], callback: (item: any) => Promise<any>) => {
  for (const item of array) {
    await callback(item)
  }
}
