<template>
  <BaseVideo :id="id"
             :src="src"
             :provider="provider"
             :animate="true"
             v-bind="$attrs"
             v-on="$listeners"
             @videoLoaded="videoLoaded" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Power1, Tween } from '~src/global/animation'

@Component
export default class CmsVideo extends Vue {
  @Prop({ type: Object, required: true })
  private video!: Cms.VideoBlock

  private get isInternal() {
    return !this.video.videoExternal && !!this.video.videoInternal
  }

  private get src() {
    return this.isInternal ? this.video.videoInternal!.url : undefined
  }

  private get provider() {
    return !this.isInternal ? this.video.videoExternal!.provider : undefined
  }

  private get id() {
    return !this.isInternal ? this.video.videoExternal!.providerUid : undefined
  }

  private videoLoaded(payload: { container: HTMLElement; player: Plyr.Player }) {
    const { container } = payload

    Tween.to(container, 1, { autoAlpha: 1, ease: Power1.easeIn })
  }
}
</script>
