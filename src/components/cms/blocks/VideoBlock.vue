<template>
  <CmsVideo :video="block" />
</template>

<script lang="ts">
import { BlockMixin } from '~src/global/mixins'
import { Component, Mixins } from 'vue-property-decorator'
import CmsVideo from '~src/components/cms/CmsVideo.vue'

@Component({
  components: {
    CmsVideo
  }
})
export default class VideoBlock extends Mixins(BlockMixin) {}
</script>
