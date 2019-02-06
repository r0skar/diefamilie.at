import Vue from 'vue'

/**
 * Registers all components in the `components/base`
 * folder, which start with the suffix `Base`.
 */
export const registerComponents = () => {
  const requireComponent = require.context(`~src/components/base`, true, /Base[\w-]+\.vue$/)

  requireComponent.keys().forEach((fileName: string) => {
    const config = requireComponent(fileName)
    const name: string = fileName.replace(/^\.\//, ``).replace(/\.\w+$/, ``)

    // Make sure to register it only once.
    if (!(Vue as any).options.components[name]) {
      Vue.component(name, config.default || config)
    }
  })
}
