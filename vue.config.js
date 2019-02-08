const Path = require(`path`)
const PrerenderPlugin = require(`prerender-spa-plugin`)
const ROUTES = require(`./cms/routes.json`)
const isProduction = process.env.NODE_ENV === `production`

/**
 * Add all CMS and static routes for the prerenderer.
 */
const routesToPrerender = [`/`, ...ROUTES.map((r) => r.path)]

module.exports = {
  chainWebpack: (config) => {
    /**
     * Add webpack aliases.
     * Note: you may also want to add these to `tsconfig.json`.
     */
    config.resolve.alias.set(`~root`, Path.join(__dirname, `./`))
    config.resolve.alias.set(`~types`, Path.join(__dirname, `./types`))
    config.resolve.alias.set(`~src`, Path.join(__dirname, `./src`))
    config.resolve.alias.set(`~cms`, Path.join(__dirname, `./cms`))

    /**
     * Add the prerenderer.
     */
    if (isProduction) {
      config.plugin(`prerenderer`).use(PrerenderPlugin, [
        {
          routes: routesToPrerender,
          staticDir: Path.join(__dirname, `dist`),
          postProcess(renderedRoute) {
            // Add an indicator for SSR and `defer` all script, because
            // no JS is needed for the initial rendering of a static website.
            renderedRoute.html = renderedRoute.html
              .replace(/<script (.*?)>/g, `<script $1 defer>`)
              .replace(`id="app"`, `id="app" data-server-rendered="true"`)

            return renderedRoute
          },
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true
          },
          renderer: new PrerenderPlugin.PuppeteerRenderer({
            // Inject the global variable `window.__PRERENDER_INJECTED`
            // in order to detect whether we are inside the renderer.
            inject: {},
            // Hide the actual browser window.
            headless: true,
            // Wait for this event before rendering.
            renderAfterDocumentEvent: `start-prerenderer`
          })
        }
      ])
    }
  }
}
