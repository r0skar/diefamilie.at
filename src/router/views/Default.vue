<template>
  <div>
    <CmsBlocks :blocks="blocks" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ViewMixin } from '~src/global/mixins'

@Component
export default class DefaultView extends Mixins(ViewMixin) {}
</script>
