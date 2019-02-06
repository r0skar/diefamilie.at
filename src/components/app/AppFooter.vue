<template>
  <footer :class="styles.footer">
    <div :class="styles.wrap">
      <AppContact />
      <AppInfo />
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { css, design } from '~src/design'
import AppContact from './AppContact.vue'
import AppInfo from './AppInfo.vue'

@Component({
  components: {
    AppContact,
    AppInfo
  }
})
export default class AppFooter extends Vue {
  public styles = {
    footer: css({
      ...design.Utils.vAlign,
      height: design.appFooterHeight,
      textAlign: `center`
    }),
    wrap: css({
      ...design.Utils.wrap(design.appWidth, `84%`, `center`)
    })
  }
}
</script>
