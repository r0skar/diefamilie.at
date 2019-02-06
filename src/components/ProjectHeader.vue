<template>
  <div :class="styles.container">
    <CmsImage :image="project.featuredImage"
              :fill="true"
              @imageLoaded="imageLoaded" />
    <div :class="styles.overlay">
      <h1 ref="title"
          :class="styles.title"
          v-text="project.title" />
      <div ref="seperator"
           :class="styles.seperator" />
      <ul ref="tags"
          :class="styles.tags">
        <li v-for="tag in project.tags"
            :key="tag"
            v-text="tag" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Timeline } from '~src/global/animation'
import { css, design, media } from '~src/design'
import CmsImage from '~src/components/cms/CmsImage.vue'

@Component({
  components: {
    CmsImage
  }
})
export default class ProjectHeader extends Vue {
  @Prop({ type: Object, required: true })
  project!: Cms.ProjectContent

  public styles = {
    container: css({
      display: `block`,
      height: `calc(100vh - ${design.appHeaderHeight} - ${design.Utils.ms(2.5)})`,
      textDecoration: `none`,
      position: `relative`
    }),
    overlay: css(
      {
        bottom: 0,
        left: 0,
        color: design.colors.white,
        position: `absolute`,
        textAlign: `center`,
        paddingBottom: `10vh`,
        paddingLeft: design.Utils.ms(1),
        paddingRight: design.Utils.ms(1),
        width: `100%`
      },
      media(
        { minWidth: design.breakpoints.md },
        {
          paddingLeft: design.Utils.ms(2),
          paddingRight: design.Utils.ms(2),
          textAlign: `left`
        }
      )
    ),
    title: css(
      {
        ...design.Utils.autoAlpha(0),
        ...design.Utils.headline(`h2`),
        fontWeight: design.fontWeights.light,
        marginBottom: design.Utils.ms(0),
        textTransform: `uppercase`,
        transform: `translateY(-10vh)`
      },
      media({ minWidth: design.breakpoints.md }, design.Utils.headline(`h1`))
    ),
    seperator: css({
      backgroundColor: design.colors.white,
      height: `1px`,
      marginBottom: design.Utils.ms(0),
      width: 0
    }),
    tags: css({
      $nest: {
        '> li': {
          ...design.Utils.autoAlpha(0),
          display: `inline-block`,
          transform: `translateX(-10vw)`
        },
        '> li:not(:last-child):after': {
          content: `'/'`,
          display: `inline-block`,
          paddingRight: design.Utils.ms(0),
          paddingLeft: design.Utils.ms(0)
        }
      }
    })
  }

  private imageLoaded() {
    const { title, seperator, tags } = this.$refs as any

    new Timeline()
      .to(title, 1, { autoAlpha: 1, y: 0 })
      .to(seperator, 1, { autoAlpha: 1, width: `100%` }, `-=0.5`)
      .staggerTo(tags.childNodes, 0.5, { autoAlpha: 1, x: 0 }, 0.1, `-=0.5`)
  }
}
</script>
