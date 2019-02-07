<template>
  <div id="app"
       :class="styles.app">
    <AppHeader :class="styles.header" />
    <AppMain :class="[styles.main, mainSpacing]" />
    <AppFooter :class="[styles.footer, footerVisibility]" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'
import { css, design } from '~src/design'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppMain from './AppMain.vue'

@Component({
  components: {
    AppFooter,
    AppHeader,
    AppMain
  }
})
export default class App extends Vue {
  private store: Store = useStore(this.$store)

  public styles = {
    app: css({
      overflowX: `hidden`
    }),
    header: css({
      height: design.appHeaderHeight
    }),
    main: css({
      backgroundColor: design.colors.bg,
      minHeight: `calc(100vh - ${design.appHeaderHeight})`
    }),
    footer: css({
      backgroundColor: design.colors.brand,
      bottom: 0,
      left: 0,
      height: design.appFooterHeight,
      position: `fixed`,
      width: `100%`,
      zIndex: -1
    })
  }

  private get showFooter() {
    const { to, from, status } = this.store.app.router

    return (
      (to.fullPath !== `/` && status === `hasEntered`) ||
      (from.fullPath !== `/` && to.fullPath !== `/`)
    )
  }

  private get mainSpacing() {
    return css({
      marginBottom: this.showFooter ? design.appFooterHeight : undefined,
      paddingBottom: this.showFooter ? `calc(${design.appHeaderHeight} / 2)` : undefined
    })
  }

  private get footerVisibility() {
    return css({
      display: this.showFooter ? `block` : `none`
    })
  }
}
</script>
