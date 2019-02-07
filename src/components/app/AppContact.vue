<template>
  <div>
    <h4 :class="styles.title">
      <BaseLink :to="email"
                v-text="email" />
    </h4>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'
import { css, design } from '~src/design'

@Component
export default class AppContact extends Vue {
  private store: Store = useStore(this.$store)

  public styles = {
    title: css({
      ...design.Utils.headline(`h3`, true, false),
      backgroundColor: design.colors.bg,
      fontWeight: design.fontWeights.bold,
      display: `inline-block`,
      clipPath: `polygon(0 0, 100% 20%, 100% 100%, 0 80%)`,
      padding: design.Utils.ms(1)
    })
  }

  private get email() {
    return this.store.cms.settings.email
  }
}
</script>
