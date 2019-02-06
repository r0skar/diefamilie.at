import { routes } from './routes'
import { store } from '~src/store'
import Meta from 'vue-meta'
import Router, { Route } from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
Vue.use(Meta)

/**
 * Force browser to keep scroll position.
 */
window.history.scrollRestoration = `manual`

/**
 * Create a new instance of the Vue router.
 */
const router = new Router({
  routes,
  mode: `history`,
  base: process.env.BASE_URL
})

/**
 * Add global router guards.
 */
router.beforeEach(async (to: Route, from: Route, done: () => void) => {
  await store.dispatch(`app/changeRoute`, { to, from })

  done()
})

/**
 * Export the current router instance.
 */
export { router }
