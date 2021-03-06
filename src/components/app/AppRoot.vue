<template>
  <div id="app"
       :class="[styles.app, appInteractivity]">
    <DrawingBoard v-if="enableDrawingBoard" />
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
import { IS_SSR } from '~src/global/constants'
import { Store, useStore } from '~src/store'
import { css, design } from '~src/design'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppMain from './AppMain.vue'
import DrawingBoard from '~src/components/DrawingBoard.vue'

@Component({
  components: {
    AppFooter,
    AppHeader,
    AppMain,
    DrawingBoard
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

  private get isHome() {
    return this.store.app.router.to.fullPath === `/`
  }

  private get enableDrawingBoard() {
    // TODO: fix drawing and than re-enable it.
    return false
    // Always render canvas while prerendering, otherwhise the canvas element
    // will no get "pinrted" to the html output and the drawing board cant use
    // it as its mount point.
    return (IS_SSR && this.isHome) || (this.isHome && window.innerWidth > design.breakpoints.md)
  }

  private get showFooter() {
    const { from, status } = this.store.app.router

    return (!this.isHome && status === `hasEntered`) || (from.fullPath !== `/` && !this.isHome)
  }

  private get mainSpacing() {
    return css({
      marginBottom: this.showFooter ? design.appFooterHeight : undefined,
      paddingBottom: this.showFooter ? `calc(${design.appHeaderHeight} / 2)` : undefined
    })
  }

  private get appInteractivity() {
    const { status } = this.store.app.router
    const isInteractive = status !== `hasEntered` ? `none` : undefined
    const overflow = status !== `hasEntered` || this.isHome ? `hidden` : undefined

    return css({
      overflow,
      pointerEvents: isInteractive,
      userSelect: isInteractive
    })
  }

  private get footerVisibility() {
    return css({
      display: this.showFooter ? `block` : `none`
    })
  }
}
</script>
