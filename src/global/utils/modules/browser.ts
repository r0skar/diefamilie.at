/**
 * Detect current browser manufacturer.
 */
export const is = {
  opera: () => {
    return (
      (!!(window as any).opr && !!(window as any).opr.addons) ||
      !!(window as any).opera ||
      navigator.userAgent.indexOf(` OPR/`) >= 0
    )
  },
  safari: () => {
    return (
      /constructor/i.test((window as any).HTMLElement) ||
      (function(p) {
        return p.toString() === `[object SafariRemoteNotification]`
        // @ts-ignore
      })(!(window as any)[`safari`] || typeof safari !== `undefined`)
    )
  },
  chrome: () => {
    return (
      !!(window as any).chrome &&
      (!!(window as any).chrome.webstore || !!(window as any).chrome.runtime)
    )
  },
  ie: () => {
    return /*@cc_on!@*/ false || !!(document as any).documentMode
  },
  edge: () => {
    return !is.ie && !!(window as any).StyleMedia
  },
  firefox: () => {
    // @ts-ignore
    return typeof InstallTrigger !== `undefined`
  },
  blink: () => {
    return (is.chrome || is.opera) && !!(window as any).CSS
  }
}

/**
 * Detect browser feature support.
 */
export const supports = {
  intersectionObserver:
    `IntersectionObserver` in window &&
    `IntersectionObserverEntry` in window &&
    `intersectionRatio` in (window as any).IntersectionObserverEntry.prototype
}
