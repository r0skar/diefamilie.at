import * as Transition from '~src/global/transitions'
import { Component, Vue } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'
import { cms } from '~src/global/utils'
import mergeWith from 'lodash/mergeWith'

/**
 * Mixin for router views.
 */
@Component({
  components: {
    CmsBlocks: () => import(`~src/components/cms/CmsBlocks.vue`)
  }
})
export class ViewMixin extends Vue {
  /**
   * Expose the current store instance.
   */
  public store: Store = useStore(this.$store)

  /**
   * The current route's content.
   */
  public get content() {
    const { fullPath } = this.$route

    return this.store.cms.content.find((i) => i.$path === fullPath || i.$path === `${fullPath}/`)
  }

  /**
   * The current route object.
   */
  private get currentRoute() {
    const { to, from } = this.store.app.router

    return { to, from }
  }

  /**
   * The current route's content blocks.
   * Returns an empty array if no blocks were found.
   */
  public get blocks() {
    return this.content && this.content.blocks ? this.content.blocks : []
  }

  /**
   * Return the current route's enter transition based on its `to` and `from` target.
   * This may be overridden in the actual route component.
   * Returning `false` will disable all route transitions.
   */
  public routeEnters(): false | Transition.ITransition {
    return Transition.getTransition(this.currentRoute, `enter`)
  }

  /**
   * Return the current route's leave transition based on its `to` and `from` target.
   * This may be overridden in the actual route component.
   * Returning `false` will disable all route transitions.
   */
  public routeLeaves(): false | Transition.ITransition {
    return Transition.getTransition(this.currentRoute, `leave`)
  }

  /**
   * Set the current route's page meta data.
   */
  public metaInfo() {
    const { settings } = this.store.cms
    const { globalMeta } = settings
    const pageMeta = this.content && this.content.meta ? this.content.meta : undefined

    // Merge the global meta with the page meta.
    // Note: we are using `mergeWith` to explicitly remove `null` values,
    // because `merge` does not exclude them by default.
    const mergedMeta = mergeWith({}, globalMeta, pageMeta, (objValue, srcValue) => {
      if (!srcValue) return objValue
    })

    // Append title suffix.
    const { title } = mergedMeta
    const { titleSuffix } = settings

    if (titleSuffix && (title && !titleSuffix.endsWith(title))) {
      mergedMeta.title += titleSuffix
    }

    // Social media image.
    const { image } = mergedMeta
    const socialImage = image ? cms.image({ img: image, width: 1200 }) : undefined

    // Search engine tags.
    const searchEngineTags = [
      { itemprop: `name`, content: settings.name },
      { itemprop: `description`, content: globalMeta.description },
      { hid: `description`, name: `description`, content: mergedMeta.description },
      { hid: `robots`, name: `robots`, content: `index,follow` }
    ]

    // Facebook tags.
    const facebookTags = [
      { property: `og:type`, content: `website` },
      { property: `og:site_name`, content: settings.name },
      { hid: `og:title`, property: `og:title`, content: mergedMeta.title },
      { hid: `og:description`, property: `og:description`, content: mergedMeta.description },
      { hid: `og:image`, property: `og:image`, content: socialImage }
    ]

    // Twitter tags.
    const twitterTags = [
      { hid: `twitter:title`, name: `twitter:title`, content: mergedMeta.title },
      { hid: `twitter:description`, name: `twitter:description`, content: mergedMeta.description },
      { hid: `twitter:image`, name: `twitter:image`, content: socialImage }
    ]

    return {
      title: mergedMeta.title,
      htmlAttrs: { lang: settings.lang },
      meta: [...searchEngineTags, ...facebookTags, ...twitterTags]
    }
  }
}
