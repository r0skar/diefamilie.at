import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'

/**
 * Register global Vue plugins.
 */
export const registerPlugins = () => {
  Vue.use(VueObserveVisibility)
}
