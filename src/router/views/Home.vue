<template>
  <div>
    <div :class="styles.container">
      <div id="search"
           :class="styles.search.container">
        <AppSearch ref="form"
                   :class="styles.search.form"
                   @focus="searchFocused = true"
                   @blur="searchFocused = false" />
        <div :class="styles.search.placeholder">
          <div ref="placeholder"
               v-text="`SUCHE`" />
          <div ref="seperator"
               :class="styles.search.seperator" />
        </div>
      </div>
      <div id="nav"
           :class="styles.nav">
        <AppNav />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { Timeline, Tween } from '~src/global/animation'
import { ViewMixin } from '~src/global/mixins'
import { css, design, media } from '~src/design'
import { mouseProximity } from '~src/global/utils'
import AppNav from '~src/components/app/AppNav.vue'
import AppSearch from '~src/components/app/AppSearch.vue'

@Component({
  components: {
    AppNav,
    AppSearch
  }
})
export default class HomeView extends Mixins(ViewMixin) {
  private searchFocused = false

  private homeIntro = design.Utils.homeIntro()

  public styles = {
    container: css(
      {
        height: `calc(100vh - (${design.appHeaderHeight} * 2))`,
        position: `relative`,
        userSelect: `none`
      },
      media(
        { maxWidth: design.breakpoints.md },
        {
          transform: `translateY(${design.appHeaderHeight})`,
          paddingTop: design.Utils.ms(1)
        }
      )
    ),
    search: {
      container: css(
        {
          display: `none`
        },
        media(
          { minWidth: design.breakpoints.md },
          { ...this.homeIntro.container(1), display: `block !important` }
        )
      ),
      form: css({
        ...design.Utils.coverParent,
        $nest: { '> input': this.homeIntro.content }
      }),
      placeholder: css({
        ...design.Utils.coverParent,
        pointerEvents: `none`,
        $nest: { '> div:first-child': this.homeIntro.content }
      }),
      seperator: css({
        backgroundColor: design.colors.text,
        height: `1px`,
        display: `inline-block`,
        width: 0
      })
    },
    nav: css(
      {
        $nest: {
          'ul > li > a': this.homeIntro.content
        }
      },
      media(
        { maxWidth: design.breakpoints.md },
        {
          transform: `translateY(${design.Utils.ms(1)})`,
          $nest: {
            'ul > li:not(:last-child)': {
              marginBottom: `${design.Utils.ms(1)} !important`
            }
          }
        }
      ),
      media(
        { minWidth: design.breakpoints.md },
        {
          $nest: {
            'ul > li:nth-child(1)': this.homeIntro.container(2),
            'ul > li:nth-child(1) a': { transform: `rotate(90deg)` },
            'ul > li:nth-child(2)': this.homeIntro.container(3),
            'ul > li:nth-child(3)': this.homeIntro.container(4),
            'ul > li:nth-child(3) a': { transform: `rotate(-90deg)` }
          }
        }
      )
    )
  }

  @Watch(`searchFocused`)
  private toggleFakePlaceholder(isFocused: boolean) {
    const { form, placeholder, seperator } = this.$refs as any
    const { keyword } = form

    if (isFocused) {
      new Timeline()
        .to(placeholder, 0.25, { autoAlpha: 0 })
        .to(seperator, 0.5, { width: `100%` }, `-=0.25`)
    } else if (!keyword) {
      new Timeline()
        .to(placeholder, 0.25, { autoAlpha: 1 })
        .to(seperator, 0.5, { width: 0 }, `-=0.25`)
    }
  }

  public mounted() {
    window.addEventListener(`mousemove`, this.tweenLogo as EventListener)
  }

  public destroyed() {
    window.removeEventListener(`mousemove`, this.tweenLogo as EventListener)
  }

  private tweenLogo(ev: MouseEvent) {
    const target = document.querySelector(`#logo img`)!

    // On page load it can happen, that the image is
    // no yet loaded when the user starts moving the mouse.
    if (!target) return

    mouseProximity(ev, target, {
      center: true,
      onProgress: (x: number, y: number) => {
        const distanceY: number = Math.max(-5, Math.min(y / 80, 5))
        const distanceX: number = Math.max(-5, Math.min(x / 200, 5)) * -1

        return Tween.to(target, 0, {
          transformPerspective: 25,
          rotationY: distanceX,
          rotationX: distanceY
        })
      }
    })
  }
}
</script>
