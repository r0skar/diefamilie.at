import { Action, Getter, State } from 'vuex-simple'
import { cms, includesString } from '~src/global/utils'
import CONTENT from '~cms/content.json'
import ROUTES from '~cms/routes.json'
import SETTINGS from '~cms/settings.json'
import sortBy from 'lodash/sortBy'
import uniqBy from 'lodash/uniqBy'

export class CmsModule {
  @State() public settings: Cms.Settings
  @State() public routes: Cms.Route[]
  @State() public content: Cms.Content[]

  /**
   * Freeze the CMS content to disable Vue's reactivity.
   * This should reduce the costs of having many CMS entries.
   */
  public constructor() {
    this.settings = Object.freeze(SETTINGS)
    this.routes = ROUTES.map(Object.freeze) as Cms.Route[]
    this.content = CONTENT.map(Object.freeze) as Cms.Content[]
  }

  @Getter()
  public get allContent(): Cms.Content[] {
    return sortBy(this.content, [`$position`, `$updatedAt`])
  }

  @Getter()
  public get allProjects(): Cms.ProjectContent[] {
    return this.allContent.filter((p) => p.$model === `project`)
  }

  @Getter()
  public get activeProjects() {
    return this.allProjects.filter((p) => !p.archived)
  }

  @Getter()
  public get archivedProjects() {
    return this.allProjects.filter((p) => p.archived)
  }

  /**
   * Return the current drawing for the drawing board.
   */
  @Action()
  public async fetchDrawing() {
    const { data } = await cms.api.get(`443356`)
    const { drawing } = data.data.attributes

    return drawing
  }

  /**
   * Save a `base64` string as new drawing.
   */
  @Action()
  public async saveDrawing(drawing: string) {
    const data = { type: `item`, id: `443356`, attributes: { drawing } }
    const { status } = await cms.api.put(`443356`, { data })

    return status
  }

  /**
   * Search the CMS content for a specific keyword.
   * Searches the fields `title`, `tags`, `categories` and `meta`.
   * Optionally, include an array of content models to limit search.
   */
  @Action()
  public async searchContent({ keyword, models }: { keyword: string; models?: string[] }) {
    let content: Cms.Content[] = []
    let results: Cms.Content[] = []

    if (!keyword) return []

    if (models) {
      models.forEach((model) => {
        content = [...content, ...this.allContent.filter((c) => c.$model === model)]
      })
    } else {
      content = this.allContent
    }

    content.forEach((item) => {
      const fields = [`title`, `tags`, `categories`]

      fields.forEach((field) => {
        const value = (item as any)[field]

        if (includesString(value, keyword)) results.push(item)
      })

      if (item.meta) {
        const { title, description } = item.meta

        if (includesString(title, keyword)) results.push(item)
        if (includesString(description, keyword)) results.push(item)
      }
    })

    results = uniqBy(results, `$path`)

    return results
  }
}
