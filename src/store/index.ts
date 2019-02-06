import { AppModule } from './modules/app'
import { CmsModule } from './modules/cms'
import { Module, createVuexStore, useStore } from 'vuex-simple'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * The `Store` class defines our root store by combining all store modules.
 * It is only used once to create a new store instance.
 */
class Store {
  @Module() public app = new AppModule()
  @Module() public cms = new CmsModule()
}

/**
 * Create a new instance of the root store.
 */
const store = createVuexStore(new Store(), { strict: false })

/**
 * Export the current store instance, the `Store` class for it to be used
 * as type and all helper functions.
 */
export { Store, store, useStore }
