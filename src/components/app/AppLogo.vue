<template>
  <div id="logo"
       :class="styles.container">
    <BaseLink to="/"
              itemprop="url">
      <img :src="src"
           :alt="name"
           itemprop="logo"
           :class="styles.image" />
    </BaseLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'
import { cms } from '~src/global/utils'
import { css, design, media } from '~src/design'

@Component
export default class AppLogo extends Vue {
  private store: Store = useStore(this.$store)

  public styles = {
    container: css({
      userSelect: `none`
    }),
    image: css(
      {
        maxWidth: `125px`,
        width: `50vw`
      },
      media({ minWidth: design.breakpoints.sm }, { maxWidth: `185px` })
    )
  }

  private get name() {
    return this.store.cms.settings.name
  }

  private get src() {
    return cms.image({ img: this.store.cms.settings.logo, width: 500 })
  }
}
</script>
