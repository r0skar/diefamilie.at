<template>
  <div>
    <AppSearch />
    <AppNav />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ViewMixin } from '~src/global/mixins'
import AppNav from '~src/components/app/AppNav.vue'
import AppSearch from '~src/components/app/AppSearch.vue'

@Component({
  components: {
    AppNav,
    AppSearch
  }
})
export default class HomeView extends Mixins(ViewMixin) {}
</script>
