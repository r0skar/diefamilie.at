import Component from 'vue-class-component'

/**
 * Component hooks.
 */
const HOOKS = [`metaInfo`, `beforeRouteEnter`, `beforeRouteLeave`, `beforeRouteUpdate`]

/**
 * Register global Vue component hooks.
 */
export const registerHooks = () => Component.registerHooks(HOOKS)
