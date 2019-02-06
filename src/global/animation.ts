// We only load types from the main package and we load the real
// modules directly. This way webpack tree-shaking works correctly
// and removes all modules we dont explicitly import here.
import { TimelineLite, TweenLite } from 'gsap'
import CssPlugin from 'gsap/CSSPlugin'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import TextPlugin from 'gsap/TextPlugin'
import TimelineLiteModule from 'gsap/TimelineLite'
import TweenLiteModule from 'gsap/TweenLite'

// Note: we have to "use" the plugins, because otherwise
// webpack strips them from the bundle.
// @ts-ignore
const _plugins = [CssPlugin, ScrollToPlugin, TextPlugin]

/**
 * Export type definitions.
 */
export { TimelineLite as ITimeline }
export { TweenLite as ITween }

/**
 * GSAP TimelineLite.
 */
export const Timeline = TimelineLiteModule as new (vars?: {} | undefined) => TimelineLite

/**
 * GSAP TweenLite.
 */
export const Tween = TweenLiteModule as {
  to: (target: any, duration: number, vars: any) => TweenLite
  from: (target: any, duration: number, vars: any) => TweenLite
}

/**
 * Export GSAP Easings.
 */
export {
  Ease,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Linear,
  Back,
  Elastic,
  Bounce,
  RoughEase,
  SlowMo,
  SteppedEase,
  Circ,
  Expo,
  Sine
} from 'gsap'
