<template>
  <a v-if="isExternal"
     rel="noopener nofollow"
     target="_blank"
     v-bind="$attrs"
     :href="to"
     v-on="$listeners">
    <slot />
  </a>
  <RouterLink v-else
              v-bind="$attrs"
              :to="to"
              v-on="$listeners">
    <slot />
  </RouterLink>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { isExternalLink } from '~src/global/utils'

@Component
export default class BaseLink extends Vue {
  @Prop({ type: String, required: true })
  private to!: string

  private isExternal = isExternalLink(this.to)
}
</script>
