<template>
  <figure v-observe-visibility="{ ...observerConfig, callback: visibilityChanged }"
          :class="styles.figure">
    <div :class="styles.image">
      <img ref="image"
           :data-src="src"
           :alt="alt"
           @load="imageLoaded" />
    </div>
    <figcaption v-if="caption"
                :class="styles.caption"
                v-text="caption" />
  </figure>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CssProps, css, design } from '~src/design'
import { IS_SSR, LAZY_THROTTLE, ROUTE_ENTER_DURATION } from '~src/global/constants'
import { Store, useStore } from '~src/store'
import { browser } from '~src/global/utils'

@Component
export default class BaseImage extends Vue {
  @Prop({ type: String, required: true })
  private src!: string

  @Prop({ type: Boolean, default: true })
  private lazy!: boolean

  @Prop({ type: Boolean, default: false })
  private animate!: boolean

  @Prop({ type: Boolean, default: false })
  private fill!: boolean

  @Prop({ type: Object, default: () => ({ backgroundColor: design.colors.text }) })
  private placeholder!: CssProps

  @Prop({ type: Number, default: 1 })
  private height!: number

  @Prop({ type: Number, default: 1 })
  private width!: number

  @Prop(String)
  private alt!: string

  @Prop(String)
  private caption!: string

  private store: Store = useStore(this.$store)

  private hasLoaded = false

  private imageRatio = !this.fill ? `${(this.height / this.width) * 100}%` : undefined

  public styles = {
    figure: css({
      ...(this.fill && design.Utils.fillParentHeight),
      display: `flex`,
      flexDirection: `column`
    }),
    image: css({
      ...this.placeholder,
      flex: this.fill ? 1 : undefined,
      paddingBottom: this.imageRatio,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`,
      overflow: `hidden`,
      position: `relative`,
      $nest: {
        '> img': {
          // If `animate` is true, keep the loaded image hidden
          // for the animation to kick in.
          ...(this.animate && design.Utils.autoAlpha(0)),
          ...design.Utils.coverParent
        }
      }
    }),
    caption: css({
      paddingTop: design.Utils.ms(0),
      textTransform: `uppercase`
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
      this.loadImage()
    }
  }

  private visibilityChanged(isVisible: boolean) {
    if (isVisible && !this.hasLoaded) {
      this.loadImage()
    }
  }

  private imageLoaded() {
    const { image } = this.$refs as any

    this.hasLoaded = true
    this.$emit(`imageLoaded`, image)
  }

  private loadImage() {
    if (IS_SSR) return this.imageLoaded()

    const { image } = this.$refs as any

    requestAnimationFrame(() => {
      image.src = this.src
    })
  }
}
</script>
