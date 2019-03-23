<template>
  <div>
    <BaseLink :to="`mailto:${email}`"
              itemprop="url"
              :class="styles.link">
      <small>
        {{ email }}
      </small>
    </BaseLink>
    <BaseLink to="/impressum"
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
      // color: design.colors.brandMuted,
      paddingLeft: design.Utils.ms(0),
      textDecoration: `none`,
      textTransform: `uppercase`
    })
  }

  private get year() {
    return new Date().getFullYear()
  }

  private get email() {
    return this.store.cms.settings.email
  }

  private get name() {
    return this.store.cms.settings.name
  }
}
</script>
