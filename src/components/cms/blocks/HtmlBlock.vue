<template>
  <BaseArticle>
    <template v-if="block.title"
              v-slot:header>
      <h1 v-text="block.title" />
    </template>
    <template v-if="block.html"
              v-slot:body>
      <div v-html="block.html" />
    </template>
  </BaseArticle>
</template>

<script lang="ts">
import { BlockMixin } from '~src/global/mixins'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class HtmlBlock extends Mixins(BlockMixin) {}
</script>
