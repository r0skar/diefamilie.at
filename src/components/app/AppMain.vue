<template>
  <main>
    <div :class="styles.wrap">
      <Transition mode="out-in"
                  :css="false"
                  @enter="routeEnters"
                  @leave="routeLeaves">
        <RouterView ref="view"
                    :key="store.app.router.to.fullPath"
                    :class="styles.view" />
      </Transition>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IS_SSR } from '~src/global/constants'
import { ITransition } from '~src/global/transitions'
import { Store, useStore } from '~src/store'
import { css, design } from '~src/design'

@Component
export default class AppMain extends Vue {
  private store: Store = useStore(this.$store)

  public styles = {
    wrap: css({
      ...design.Utils.wrap(design.appWidth, `84%`, `center`)
    }),
    view: css({
      ...design.Utils.autoAlpha(0)
    })
  }

  private getRouteTransition(dir: `enter` | `leave`): false | ITransition {
    const { view } = this.$refs as any
    const { routeEnters, routeLeaves } = view

    if (dir === `enter` && routeEnters) {
      return routeEnters()
    } else if (dir === `leave` && routeLeaves) {
      return routeLeaves()
    } else {
      return false
    }
  }

  private async routeEnters(el: HTMLElement, done: () => void) {
    const transition = this.getRouteTransition(`enter`)

    if (!transition || IS_SSR) {
      await this.store.app.changeStatus(`hasEntered`)
      return requestAnimationFrame(done)
    }

    // Scroll to top before entering the page.
    // We do this here, because doing it inside the Vue router
    // `scrollBehaviour` prop, causes issues.
    window.scrollTo(0, 0)

    await this.store.app.changeStatus(`isEntering`)
    await transition(el)
    await this.store.app.changeStatus(`hasEntered`)

    return requestAnimationFrame(done)
  }

  private async routeLeaves(el: HTMLElement, done: () => void) {
    const transition = this.getRouteTransition(`leave`)

    if (!transition || IS_SSR) {
      await this.store.app.changeStatus(`hasEntered`)
      return requestAnimationFrame(done)
    }

    await this.store.app.changeStatus(`isLeaving`)
    await transition(el)
    await this.store.app.changeStatus(`hasLeft`)

    return requestAnimationFrame(done)
  }
}
</script>
