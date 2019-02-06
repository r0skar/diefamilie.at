<template>
  <div>
    <BaseLink to="/imprint"
              itemprop="url">
      &copy; {{ year }} {{ name }}
    </BaseLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'

@Component
export default class AppInfo extends Vue {
  private store: Store = useStore(this.$store)

  private get year() {
    return new Date().getFullYear()
  }

  private get name() {
    return this.store.cms.settings.name
  }
}
</script>
