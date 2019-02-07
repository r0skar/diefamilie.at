/* eslint-disable quotes */
import { types } from 'typestyle'
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    /**
     * The `styles` data property is being used as parent object
     * for the component's `typestyle` CSS modules.
     */
    styles?: {
      [key: string]:
        | string
        | types.NestedCSSProperties
        | { [key: string]: string | types.NestedCSSProperties }
    }
  }
}
