<template>
  <div v-observe-visibility="{ ...observerConfig, callback: visibilityChanged }"
       :class="styles.outerContainer">
    <div ref="container"
         :class="styles.innerContainer">
      <video v-if="src"
             ref="video"
             :src="src"
             :class="styles.video" />
      <div v-else-if="provider && id"
           ref="video"
           :data-plyr-provider="provider"
           :data-plyr-embed-id="id"
           :class="styles.video" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CssProps, css, design } from '~src/design'
import { IS_SSR, LAZY_THROTTLE, ROUTE_ENTER_DURATION } from '~src/global/constants'
import { Store, useStore } from '~src/store'
import { browser } from '~src/global/utils'

@Component
export default class BaseVideo extends Vue {
  @Prop({ type: Boolean, default: true })
  private lazy!: boolean

  @Prop({ type: Boolean, default: false })
  private animate!: boolean

  @Prop({ type: Object, default: () => ({ backgroundColor: design.colors.text }) })
  private placeholder!: CssProps

  @Prop({ type: Number, default: 9 })
  private height!: number

  @Prop({ type: Number, default: 16 })
  private width!: number

  @Prop({ type: String })
  private src!: string

  @Prop({ type: String })
  private provider!: string

  @Prop({ type: String })
  private id!: string

  private store: Store = useStore(this.$store)

  private player!: Plyr.Player

  private plyrConfig = {}

  private hasLoaded = false

  private videoRatio = `${(this.height / this.width) * 100}%`

  public styles = {
    outerContainer: css({
      ...this.placeholder,
      overflow: `hidden`,
      position: `relative`,
      paddingBottom: this.videoRatio
    }),
    innerContainer: css({
      // If `animate` is true, keep the loaded video hidden
      // for the animation to kick in.
      ...(this.animate && design.Utils.autoAlpha(0)),
      ...design.Utils.coverParent
    }),
    video: css({
      height: `100%`,
      width: `100%`
    })
  }

  private get observerConfig() {
    const { status } = this.store.app.router
    const intersection = { threshold: 0.3 }
    const throttle = status === `isEntering` ? ROUTE_ENTER_DURATION * 1000 : LAZY_THROTTLE * 1000

    return { throttle, intersection }
  }

  public mounted() {
    if ((!this.lazy || !browser.supports.intersectionObserver) && !this.hasLoaded) {
      this.loadVideo()
    }
  }

  private visibilityChanged(isVisible: boolean) {
    if (isVisible && !this.hasLoaded) {
      this.loadVideo()
    }
  }

  private videoLoaded() {
    const { container } = this.$refs as any
    const player = this.player

    this.hasLoaded = true
    this.$emit(`videoLoaded`, { container, player })
  }

  private async loadVideo() {
    if (IS_SSR) return this.videoLoaded()

    const component = await import(`plyr`)
    const Plyr = component.default || component
    const { video } = this.$refs as any

    requestAnimationFrame(() => {
      this.player = new Plyr(video, this.plyrConfig)
      this.player.on(`ready`, this.videoLoaded)
    })
  }
}
</script>
