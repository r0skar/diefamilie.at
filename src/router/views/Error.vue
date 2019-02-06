<template>
  <div>
    ErrorView
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ViewMixin } from '~src/global/mixins'

@Component
export default class ErrorView extends Mixins(ViewMixin) {}
</script>
