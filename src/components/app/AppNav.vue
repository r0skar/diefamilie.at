<template>
  <nav>
    <ul>
      <li v-for="item in navigation"
          :key="item.path"
          itemprop="url">
        <BaseLink :to="item.path"
                  itemprop="name"
                  v-text="item.title" />
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'

@Component
export default class AppNav extends Vue {
  private store: Store = useStore(this.$store)

  private get navigation() {
    return this.store.cms.settings.navigation
  }
}
</script>
