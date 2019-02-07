<template>
  <article :class="styles.article">
    <header v-if="$scopedSlots.header"
            :class="styles.header">
      <slot name="header" />
    </header>
    <div v-if="$scopedSlots.body"
         :class="styles.body">
      <slot name="body" />
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { css, design } from '~src/design'

@Component
export default class BaseArticle extends Vue {
  public styles = {
    article: css({
      ...design.Utils.wrap(design.contentWidth)
    }),
    header: css({
      ...design.Utils.headline(`h1`, false, true)
    }),
    body: css({
      $nest: {
        h2: design.Utils.headline(`h2`, false, false),
        h3: design.Utils.headline(`h3`, false, false),
        h4: design.Utils.headline(`h4`, false, false),
        p: {
          lineHeight: design.Utils.ms(1.5)
        },
        'p:not(:last-child), ul:not(:last-child), ol:not(:last-child), table:not(:last-child)': {
          marginBottom: design.Utils.ms(1)
        },
        'ul, ol': {
          listStyleType: `disc`,
          marginLeft: `20px`
        },
        'ul > li:not(:last-child), ol > li:not(:last-child)': {
          marginBottom: design.Utils.ms(-1)
        },
        a: {
          boxShadow: `inset 0 0px 0 white, inset 0 -5px 0 ${design.colors.brand}`,
          textDecoration: `none`,
          $nest: {
            '&:active': {
              boxShadow: `inset 0 0px 0 white, inset 0 -1em 0 ${design.colors.brand}`
            }
          }
        }
      }
    })
  }
}
</script>
