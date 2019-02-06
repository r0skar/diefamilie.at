import { registerComponents } from '~src/global/components'
import { registerHooks } from '~src/global/hooks'
import { registerPlugins } from '~src/global/plugins'
import { registerStyles } from '~src/design'
import { router } from '~src/router'
import { store } from '~src/store'
import AppRoot from '~src/components/app/AppRoot.vue'
import Vue from 'vue'

/**
 * Register global Vue hooks, plugins, components and CSS styles.
 */
registerHooks()
registerPlugins()
registerComponents()
registerStyles()

/**
 * Create a new Vue app.
 * Starts the prerenderer when the app is mounted.
 */
new Vue({
  el: `#app`,
  router,
  store,
  mounted: () => document.dispatchEvent(new Event(`start-prerenderer`)),
  render: (h) => h(AppRoot)
})
