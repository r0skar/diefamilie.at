<template>
  <div>
    <BaseLink to="/imprint"
              itemprop="url"
              :class="styles.link">
      <small>
        &copy; {{ year }} {{ name }}
      </small>
    </BaseLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'
import { css, design } from '~src/design'

@Component
export default class AppInfo extends Vue {
  private store: Store = useStore(this.$store)

  public styles = {
    link: css({
      color: design.colors.brandMuted,
      textDecoration: `none`,
      textTransform: `uppercase`
    })
  }

  private get year() {
    return new Date().getFullYear()
  }

  private get name() {
    return this.store.cms.settings.name
  }
}
</script>
