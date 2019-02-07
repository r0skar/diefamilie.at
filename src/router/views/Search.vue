<template>
  <div v-if="results && results.length > 0">
    <BaseGrid v-if="results && results.length > 0"
              #default="{ item }"
              :cols="3"
              :items="results">
      <BaseLink :to="item.$path"
                :class="styles.link">
        <CmsImage :image="item.featuredImage"
                  :caption="item.title"
                  :fill="true" />
      </BaseLink>
    </BaseGrid>
  </div>
  <div v-else>
    <BaseArticle>
      <template v-slot:header>
        <h1>
          Ohje...
        </h1>
      </template>
      <template v-slot:body>
        <p>
          Deine Suche ergab leider keinen Treffer.  Wenn du eine Frage zur Familie hast,
          <BaseLink to="/contact"
                    v-text="`kontaktiere uns`" /> am besten direkt! Ansonsten, schau dich doch bei
          <BaseLink to="/projects"
                    v-text="`unseren Projekten`" /> um.
        </p>
      </template>
    </BaseArticle>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import { ViewMixin } from '~src/global/mixins'
import { css } from '~src/design'
import CmsImage from '~src/components/cms/CmsImage.vue'

@Component({
  components: {
    CmsImage
  }
})
export default class SearchView extends Mixins(ViewMixin) {
  @Prop({ type: String, required: true })
  private keyword!: string

  private results: Cms.Content[] = []

  public styles = {
    link: css({
      display: `block`,
      height: `45vh`,
      textDecoration: `none`
    })
  }

  @Watch(`keyword`, { immediate: true })
  private async keywordChanged(keyword: string) {
    this.results = await this.store.cms.searchContent({
      keyword,
      models: [`project`]
    })
  }
}
</script>
