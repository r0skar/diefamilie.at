<template>
  <BaseGrid v-if="blocksLoaded"
            #default="{ item }"
            :items="blocks"
            v-bind="$attrs"
            v-on="$listeners">
    <Component :is="item.itemType"
               :block="item" />
  </BaseGrid>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { asyncForEach } from '~src/global/utils'

@Component
export default class CmsBlocks extends Vue {
  @Prop({ type: Array, required: true })
  blocks!: Cms.Block[]

  private blocksLoaded = false

  public async created() {
    await asyncForEach(this.blocks, await this.registerBlock)
    this.blocksLoaded = true
  }

  private async registerBlock(block: Cms.Block) {
    const { itemType } = block
    const component = await import(`./blocks/${itemType}.vue`)

    Vue.component(itemType, component.default)
  }
}
</script>
