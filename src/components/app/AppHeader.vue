<template>
  <header :class="styles.header">
    <div :class="styles.wrap">
      <AppLogo />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { css, design } from '~src/design'
import AppLogo from './AppLogo.vue'

@Component({
  components: {
    AppLogo
  }
})
export default class AppHeader extends Vue {
  public styles = {
    header: css({
      ...design.Utils.vAlign,
      height: design.appHeaderHeight,
      textAlign: `center`
    }),
    wrap: css({
      ...design.Utils.wrap(design.appWidth, `84%`, `center`)
    })
  }
}
</script>
