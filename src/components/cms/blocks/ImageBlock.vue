<template>
  <CmsImage :image="block.image"
            :caption="block.caption"
            :show-placeholder="!block.transparent" />
</template>

<script lang="ts">
import { BlockMixin } from '~src/global/mixins'
import { Component, Mixins } from 'vue-property-decorator'
import CmsImage from '~src/components/cms/CmsImage.vue'

@Component({
  components: {
    CmsImage
  }
})
export default class ImageBlock extends Mixins(BlockMixin) {}
</script>
