<template>
  <header>
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
    wrap: css({
      ...design.Utils.wrap(design.appWidth, `84%`, `center`),
      ...design.Utils.fillParentHeight,
      ...design.Utils.vAlign,
      textAlign: `center`
    })
  }
}
</script>
