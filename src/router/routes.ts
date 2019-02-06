import { store } from '~src/store'

/**
 * Fetch dynamic CMS routes from the store.
 */
const dynamicRoutes: any = store.state.cms.routes.map((r: any) => ({
  path: r.path,
  component: () => import(`./views/${r.view}.vue`)
}))

/**
 * Static app routes.
 */
const staticRoutes: any = [
  /**
   * The home page.
   */
  {
    name: `HomeView`,
    path: `/`,
    component: () => import(`./views/Home.vue`)
  },
  /**
   * The search page.
   * If no search term is specified, we redirect to the home page.
   */
  {
    path: `/search`,
    redirect: `/`
  },
  {
    name: `SearchView`,
    path: `/search/:keyword`,
    props: true,
    component: () => import(`./views/Search.vue`)
  },
  /**
   * The error page.
   * Accepts an `error` object as param, which is turned into a component prop.
   */
  {
    name: `ErrorView`,
    path: `/oops`,
    props: true,
    component: () => import(`./views/Error.vue`)
  },
  /**
   * Catch all undefined routes and redirect them to the `ErrorView` with a 404 error.
   */
  {
    path: `*`,
    redirect: {
      name: `ErrorView`,
      params: {
        error: { code: 404, message: `Page not found.` }
      }
    }
  }
]

/**
 * Export all dynamic and static routes.
 */
export const routes = [...dynamicRoutes, ...staticRoutes]
