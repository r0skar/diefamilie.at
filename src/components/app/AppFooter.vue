<template>
  <footer>
    <div :class="styles.wrap">
      <AppContact :class="styles.contact" />
      <AppInfo :class="styles.info" />
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
    wrap: css({
      ...design.Utils.wrap(design.appWidth, `84%`, `center`),
      ...design.Utils.fillParentHeight,
      ...design.Utils.vAlign,
      position: `relative`
    }),
    contact: css({
      textAlign: `center`
    }),
    info: css({
      bottom: design.Utils.ms(1),
      right: 0,
      position: `absolute`,
      textAlign: `right`,
      width: `100%`
    })
  }
}
</script>
