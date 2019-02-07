<template>
  <div :class="styles.container">
    <div :class="styles.grid">
      <div v-for="(item, index) in items"
           :key="index"
           :class="[styles.item, getItemWidth(item), getItemAlignment(item)]">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { cms } from '~src/global/utils'
import { css, design, media } from '~src/design'

@Component
export default class BaseGrid extends Vue {
  @Prop({ type: Array, required: true })
  private items!: { [key: string]: any }[]

  @Prop({ type: String, default: design.Utils.ms(1) })
  private hSpacing!: string

  @Prop({ type: String, default: design.Utils.ms(2) })
  private vSpacing!: string

  @Prop({ type: String, default: `flex-start` })
  private align!: string

  @Prop({ type: String, default: `space-between` })
  private justify!: string

  @Prop({ type: Number, default: 1 })
  private cols!: number

  @Prop({ type: Boolean, default: false })
  private topSpacing!: boolean

  @Prop({ type: Boolean, default: false })
  private bottomSpacing!: boolean

  public styles = {
    container: css({
      overflow: `hidden`,
      position: `relative`
    }),
    grid: css({
      display: `flex`,
      flexWrap: `wrap`,
      alignItems: this.align,
      justifyContent: this.justify,
      marginBottom: this.bottomSpacing ? this.vSpacing : `calc(${this.vSpacing} * -1)`,
      marginLeft: `calc(${this.hSpacing} * -1)`,
      marginTop: this.topSpacing ? this.vSpacing : `calc(${this.vSpacing} * -1)`,
      width: `calc(100% + (${this.hSpacing} * 2))`
    }),
    item: css({
      paddingBottom: this.vSpacing,
      paddingTop: this.vSpacing,
      paddingLeft: this.hSpacing,
      paddingRight: this.hSpacing
    })
  }

  private getItemAlignment(item: { [key: string]: any }) {
    const alignSelf = item.alignment ? cms.alignment(item.alignment) : undefined

    return css({ alignSelf })
  }

  private getItemWidth(item: { [key: string]: any }) {
    const width = item.width ? cms.width(item.width) : cms.width(`1/${this.cols}`)

    return css(
      { width: `100%` },
      media({ minWidth: design.breakpoints.sm }, { width: this.cols > 1 ? `50%` : `100%` }),
      media({ minWidth: design.breakpoints.lg }, { width })
    )
  }
}
</script>
