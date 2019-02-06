<template>
  <form autocomplete="off"
        spellcheck="false"
        @submit.prevent="formSubmitted">
    <BaseInput v-model="keyword"
               :placeholder="placeholder"
               required="true"
               minlength="3" />
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppSearch extends Vue {
  private keyword = ``

  private placeholder = `Placeholder`

  private formSubmitted() {
    this.$router.push({
      name: `SearchView`,
      params: { keyword: this.keyword }
    })
  }
}
</script>
