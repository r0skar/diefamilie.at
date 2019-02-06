<template>
  <div>
    <ProjectHeader :project="content" />
    <CmsBlocks :blocks="blocks"
               :top-spacing="true" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { ViewMixin } from '~src/global/mixins'
import ProjectHeader from '~src/components/ProjectHeader.vue'

@Component({
  components: {
    ProjectHeader
  }
})
export default class ProjectView extends Mixins(ViewMixin) {}
</script>
