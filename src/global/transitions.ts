import { Back, ITimeline, Power2, Timeline } from '~src/global/animation'
import { IRoute } from '~src/store/modules/app'
import { ROUTE_ENTER_DURATION, ROUTE_LEAVE_DURATION } from '~src/global/constants'
import { design } from '~src/design'
import { store } from '~src/store'

export type ITransition = (el: HTMLElement) => Promise<ITimeline>

/**
 * Get direction based on item's index in the main navigation.
 */
const getDirection = (path: string) => {
  const { navigation } = store.state.cms.settings
  const item = navigation.find((n: any) => n.path === path)
  const index = navigation.indexOf(item)

  let direction = { y: -100, x: 0 }

  if (index === 0) direction = { y: 0, x: 100 }
  if (index === 1) direction = { y: 100, x: 0 }
  if (index === 2) direction = { y: 0, x: -100 }

  return direction
}

/**
 * Return a new timeline that fades in the main router view
 * from outside the viewport based on the current route.
 */
const defaultEnterTimeline = (el: HTMLElement, route: IRoute) => {
  const direction = getDirection(route.to.fullPath)

  return new Timeline()
    .to(el, ROUTE_ENTER_DURATION, { autoAlpha: 1, ease: Power2.easeIn })
    .from(el, ROUTE_ENTER_DURATION, direction, `-=${ROUTE_ENTER_DURATION}`)
}

/**
 * Return a new timeline that fades out the main router view
 * to outside the viewport based on the current route.
 */
const defaultLeaveTimeline = (el: HTMLElement, route: IRoute) => {
  const direction = getDirection(route.from.fullPath)

  return new Timeline()
    .to(el, ROUTE_LEAVE_DURATION, { autoAlpha: 0, ease: Power2.easeOut })
    .to(el, ROUTE_LEAVE_DURATION, direction, `-=${ROUTE_LEAVE_DURATION}`)
}

/**
 * Return the `defaultEnterTimeline` and `defaultLeaveTimeline`.
 */
const defaultTransition = (route: IRoute): { enter: ITransition; leave: ITransition } => {
  return {
    enter: (el: HTMLElement) => {
      const tl = defaultEnterTimeline(el, route)

      return new Promise((onComplete) => {
        new Timeline({ onComplete }).add(tl)
      })
    },
    leave: (el: HTMLElement) => {
      const tl = defaultLeaveTimeline(el, route)

      return new Promise((onComplete) => {
        new Timeline({ onComplete }).add(tl)
      })
    }
  }
}

/**
 * Scale the logo and move it to the top, when leaving the home page
 * and to the center when entering it. Adds the `defaultTransition`.
 */
const homeTransition = (route: IRoute): { enter: ITransition; leave: ITransition } => {
  const logo = document.querySelector(`#logo`)!
  const y = `${(100 - Number(design.Utils.stripUnit(design.appHeaderHeight))) / 2}vh`

  return {
    enter: (el: HTMLElement) => {
      const defaultTl = defaultEnterTimeline(el, route)
      const homeTl = new Timeline()
        .to(logo, 1, { y, ease: Power2.easeOut })
        .to(logo, 0.5, { ease: Back.easeIn, scale: 1.25 })

      return new Promise((onComplete) => {
        new Timeline({ onComplete }).add(homeTl).add(defaultTl, `-=0.75`)
      })
    },
    leave: (el: HTMLElement) => {
      const defaultTl = defaultLeaveTimeline(el, route)
      const homeTl = new Timeline()
        .to(logo, 1, { y: 0, ease: Power2.easeOut })
        .to(logo, 0.5, { ease: Back.easeIn, scale: 1 })

      return new Promise((onComplete) => {
        new Timeline({ onComplete }).add(defaultTl).add(homeTl, `-=${ROUTE_LEAVE_DURATION / 2}`)
      })
    }
  }
}

/**
 * Get transition based on the current route.
 */
export const getTransition = (route: IRoute, direction: `enter` | `leave`) => {
  const isEntering = direction === `enter`
  const isLeaving = direction === `leave`
  const to = route.to.fullPath
  const from = route.from.fullPath

  let transition = defaultTransition(route)

  // Homepage.
  if ((to === `/` && isEntering) || (from === `/` && isLeaving)) {
    transition = homeTransition(route)
  }

  return transition[direction] || false
}
