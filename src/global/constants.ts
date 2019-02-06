/**
 * Detect whether the site is being prerendered.
 */
export const IS_SSR = !!(window as any).__PRERENDER_INJECTED

/**
 * Default duration for the route ENTER transition.
 */
export const ROUTE_ENTER_DURATION = 1

/**
 * Default duration for the route LEAVE transition.
 */
export const ROUTE_LEAVE_DURATION = 0.5

/**
 * Throttle the `VueObserveVisibility` plugin.
 */
export const LAZY_THROTTLE = 0.2
