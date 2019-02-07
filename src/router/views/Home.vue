<template>
  <div>
    <div :class="styles.container">
      <div :class="styles.search.container">
        <AppSearch
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
      <div :class="styles.nav">
        <AppNav />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { CssProps, css, design, media } from '~src/design'
import { Timeline } from '~src/global/animation'
import { ViewMixin } from '~src/global/mixins'
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

  private itemWidth = `60%`

  private itemContainer: CssProps = {
    display: `block`,
    position: `absolute`,
    textAlign: `center`,
    width: this.itemWidth
  }

  private itemContent: CssProps = {
    ...design.Utils.headline(`h3`),
    background: `none`,
    cursor: `pointer`,
    fontWeight: design.fontWeights.light,
    letterSpacing: design.tracking.wide,
    display: `block`,
    textAlign: `center`,
    textDecoration: `none`,
    textTransform: `uppercase`,
    userSelect: `none`,
    width: `100%`
  }

  public styles = {
    container: css({
      height: `calc(100vh - (${design.appHeaderHeight} * 2))`,
      position: `relative`
    }),
    search: {
      container: css(
        {
          ...this.itemContainer,
          left: `calc((100% - ${this.itemWidth}) / 2)`,
          top: `calc((${this.itemWidth} / 2) * -1)`
        },
        media(
          { maxWidth: design.breakpoints.sm },
          {
            left: 0,
            width: `100%`
          }
        )
      ),
      form: css({
        ...design.Utils.coverParent,
        $nest: { '> input': this.itemContent }
      }),
      placeholder: css({
        ...design.Utils.coverParent,
        pointerEvents: `none`,
        $nest: { '> div:first-child': this.itemContent }
      }),
      seperator: css({
        backgroundColor: design.colors.text,
        height: `1px`,
        display: `inline-block`,
        width: 0
      })
    },
    nav: css({
      $nest: {
        'ul > li': this.itemContainer,
        'ul > li > a': this.itemContent,
        'ul > li:nth-child(1)': {
          right: `calc((${this.itemWidth} / 2) * -1)`,
          top: `calc(50% - 0.5rem)`,
          transform: `rotate(90deg)`
        },
        'ul > li:nth-child(2)': {
          bottom: `calc((${this.itemWidth} / 2) * -1)`,
          left: `calc((100% - ${this.itemWidth}) / 2)`
        },
        'ul > li:nth-child(3)': {
          left: `calc((${this.itemWidth} / 2) * -1)`,
          top: `calc(50% - 0.5rem)`,
          transform: `rotate(-90deg)`
        }
      }
    })
  }

  @Watch(`searchFocused`)
  private toggleFakePlaceholder(isFocused: boolean) {
    const { placeholder, seperator } = this.$refs as any

    if (isFocused) {
      new Timeline()
        .to(placeholder, 0.25, { autoAlpha: 0 })
        .to(seperator, 0.5, { width: `100%` }, `-=0.25`)
    } else {
      new Timeline()
        .to(placeholder, 0.25, { autoAlpha: 1 })
        .to(seperator, 0.5, { width: 0 }, `-=0.25`)
    }
  }
}
</script>
