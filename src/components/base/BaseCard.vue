<template>
  <div :class="styles.container">
    <ul :class="styles.list">
      <li v-for="(item, index) in items"
          :key="index">
        <strong :class="styles.label"
                v-text="item.label" />
        <BaseLink v-if="item.to"
                  :to="item.to"
                  :class="styles.value"
                  v-text="item.value" />
        <span v-else
              :class="styles.value"
              v-text="item.value" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { css, design, media } from '~src/design'

@Component
export default class BaseCard extends Vue {
  @Prop({ type: Array, required: true })
  private items!: { label: string; value: any; to?: string }[]

  public styles = {
    container: css({
      ...design.Utils.wrap(design.contentWidth)
    }),
    list: css({
      $nest: {
        '> li': {
          ...design.Utils.clearFix()
        },
        '> li:not(:last-child)': {
          marginBottom: design.Utils.ms(0)
        }
      }
    }),
    label: css(
      {
        display: `block`,
        textTransform: `lowercase`
      },
      media(
        { minWidth: design.breakpoints.sm },
        {
          float: `left`,
          paddingRight: design.Utils.ms(1),
          width: design.Utils.ms(5)
        }
      )
    ),
    value: css(
      {
        display: `block`
      },
      media(
        { minWidth: design.breakpoints.sm },
        {
          float: `left`,
          maxWidth: `calc(100% - ${design.Utils.ms(5)})`
        }
      )
    )
  }
}
</script>
