const fs = require(`fs`)
const lowerCase = require(`lodash/lowerCase`)
const camelCase = require(`lodash/camelCase`)
const upperFirst = require(`lodash/upperFirst`)

/**
 * Create an async forEach helper.
 */
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index])
  }
}

/**
 * Create a Dato Image object.
 */
function datoImage(img) {
  return img ? img.upload.payload.attributes : undefined
}

/**
 * Create SEO meta tags.
 */
function createMetaTags(data) {
  return {
    title: data.title,
    description: data.description,
    image: datoImage(data.image)
  }
}

/**
 * Get colors for an image.
 */
function getColors(src) {
  return new Promise((resolve, reject) => {
    fetch(`${src}?palette=json`)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch(reject)
  })
}

/**
 * Create content blocks.
 */
function createContentBlocks(blocks) {
  return blocks.map((block) => {
    const map = block.toMap()

    // Cleanup unused props.
    delete map.updatedAt
    delete map.createdAt

    // Convert the itemType to a Vue component name.
    map.itemType = `${upperFirst(camelCase(map.itemType))}Block`

    return map
  })
}

/**
 * Fetch dominant colors of an image.
 */
function fetchImgColors(url) {
  return new Promise((resolve) => {
    getColors(url)
      .then((data) => {
        const dominantColors = Object.values(data.dominant_colors)
        resolve(dominantColors.map((val) => val.hex))
      })
      .catch((e) => {
        console.warn(e)
      })
  })
}

/**
 * Create pages.
 */
function createDefaultPage(page, path = `/`, model = `page`, view = `Default`) {
  const $path = `${path}${page.slug}`

  return {
    $path,
    $position: parseInt(page.position),
    $model: lowerCase(model),
    $view: upperFirst(view),
    $createdAt: page.createdAt,
    $updatedAt: page.updatedAt,
    $slug: page.slug,
    title: page.title,
    meta: createMetaTags(page.meta),
    blocks: page.blocks ? createContentBlocks(page.blocks) : undefined
  }
}

/**
 * Write CMS data to files.
 */
async function generateContent({ content, settings, routes }) {
  // Create the root folder.
  fs.mkdirSync(`./cms`)

  // Write global settings and routes.
  fs.writeFileSync(`./cms/settings.json`, JSON.stringify(settings), `utf8`)
  fs.writeFileSync(`./cms/routes.json`, JSON.stringify(routes), `utf8`)

  // Loop over content to fetch colors for images.
  await asyncForEach(content, async (item) => {
    if (item.featuredImage) {
      const colors = await fetchImgColors(item.featuredImage.url)
      item.featuredImage.colors = colors
    }
    if (item.blocks) {
      await asyncForEach(item.blocks, async (block) => {
        if (block.itemType === `ImageBlock`) {
          const colors = await fetchImgColors(block.image.url)
          block.image.colors = colors
        }
      })
    }
  })

  // Write content.
  fs.writeFileSync(`./cms/content.json`, JSON.stringify(content), `utf8`)
}

/**
 * Fetch data from DatoCMS.
 */
module.exports = (dato) => {
  /**
   * Global settings.
   */
  const globalSettings = {
    lang: dato.site.locales[0],
    url: dato.site.entity.frontendUrl,
    name: dato.site.globalSeo.siteName,
    logo: datoImage(dato.configuration.logo),
    titleSuffix: dato.site.globalSeo.titleSuffix,
    globalMeta: createMetaTags(dato.site.globalSeo.fallbackSeo),
    navigation: dato.configuration.navigation.map((i) => ({
      title: i.title,
      path: `/${i.slug}`
    }))
  }

  /**
   * All default pages.
   */
  const defaultPages = dato.pages.map((p) => {
    return createDefaultPage(p)
  })

  /**
   * Single project pages.
   */
  const projectPages = dato.projects.map((p) => {
    return {
      ...createDefaultPage(p, `/projects/`, `project`, `Project`),
      archived: p.archived === true ? true : false,
      featuredImage: datoImage(p.featuredImage),
      tags: p.tags ? p.tags.split(`,`).map((tag) => tag.trim()) : undefined,
      categories: p.categories ? p.categories.toMap().map((c) => c.name) : undefined
    }
  })

  /**
   * Add all pages to the global content.
   */
  const globalContent = [...defaultPages, ...projectPages]

  /**
   * Create routes for each content item.
   */
  const globalRoutes = globalContent.map((p) => {
    return { path: p.$path, view: upperFirst(p.$view) }
  })

  /**
   * Write data to files.
   */
  generateContent({
    content: globalContent,
    settings: globalSettings,
    routes: globalRoutes
  })
}
