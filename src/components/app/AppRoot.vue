<template>
  <div id="app"
       :class="styles.app">
    <AppHeader />
    <AppMain :class="styles.main" />
    <AppFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { css } from '~src/design'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
import AppMain from './AppMain.vue'

@Component({
  components: {
    AppFooter,
    AppHeader,
    AppMain
  }
})
export default class App extends Vue {
  public styles = {
    app: css({
      display: `flex`,
      flexDirection: `column`
    }),
    main: css({
      flex: 1
    })
  }
}
</script>
