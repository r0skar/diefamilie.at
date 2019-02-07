<template>
  <div id="app"
       :class="styles.app">
    <AppHeader :class="styles.header" />
    <AppMain :class="[styles.main, mainSpacing]" />
    <AppFooter :class="[styles.footer, footerVisibility]" />
    <div :class="styles.borders">
      <div v-for="(border, index) in borders"
           :key="index" />
    </div>
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

  private borders = [`top`, `right`, `bottom`, `left`]

  public styles = {
    app: css({
      minHeight: `100vh`,
      width: `100%`
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
    }),
    borders: css({
      $nest: {
        '> div': {
          backgroundColor: design.colors.white,
          position: `fixed`,
          zIndex: 9999
        },
        '> div:nth-child(odd)': {
          height: design.Utils.ms(0),
          width: `100%`
        },
        '> div:nth-child(even)': {
          height: `100%`,
          width: design.Utils.ms(0)
        },
        '> div:nth-child(1)': {
          top: 0,
          left: 0
        },
        '> div:nth-child(2)': {
          right: 0,
          top: 0
        },
        '> div:nth-child(3)': {
          bottom: 0,
          left: 0
        },
        '> div:nth-child(4)': {
          left: 0,
          top: 0
        }
      }
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
