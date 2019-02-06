import { Action, Mutation, State } from 'vuex-simple'
import { Route } from 'vue-router'

/**
 * The status during a route transition.
 */
export type IStatus = `isEntering` | `hasEntered` | `isLeaving` | `hasLeft`

/**
 * The current and previous app route.
 */
export interface IRoute {
  to: Route
  from: Route
}

export interface IRouter extends IRoute {
  status: IStatus
}

export class AppModule {
  @State() public router: IRouter

  public constructor() {
    this.router = { to: {}, from: {}, status: `isEntering` } as IRouter
  }

  @Mutation()
  private routeChanged(route: IRoute) {
    this.router = { ...this.router, ...route }
  }

  @Mutation()
  private statusChanged(status: IStatus) {
    this.router.status = status
  }

  @Action()
  public async changeRoute(route: IRoute) {
    this.routeChanged(route)
  }

  @Action()
  public async changeStatus(status: IStatus) {
    this.statusChanged(status)
  }
}
