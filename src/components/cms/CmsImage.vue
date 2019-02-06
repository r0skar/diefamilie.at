<template>
  <BaseImage :animate="true"
             :src="image.url"
             :placeholder="placeholder"
             :alt="image.alt || image.caption || `Image`"
             :height="image.height"
             :width="image.width"
             v-bind="$attrs"
             v-on="$listeners"
             @imageLoaded="imageLoaded" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Power1, Tween } from '~src/global/animation'
import { cms } from '~src/global/utils'

@Component
export default class CmsImage extends Vue {
  @Prop({ type: Object, required: true })
  private image!: Cms.Image

  private get placeholder() {
    return cms.placeholder(this.image)
  }

  private imageLoaded(image: HTMLImageElement) {
    Tween.to(image, 1, { autoAlpha: 1, ease: Power1.easeIn })
  }
}
</script>
