<template>
  <BaseGrid #default="{ item }"
            :cols="1"
            :items="projects">
    <BaseLink :to="item.$path">
      <ProjectHeader :project="item" />
    </BaseLink>
  </BaseGrid>
</template>

<script lang="ts">
import { BlockMixin } from '~src/global/mixins'
import { Component, Mixins } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'
import ProjectHeader from '~src/components/ProjectHeader.vue'

@Component({
  components: {
    ProjectHeader
  }
})
export default class ProjectListBlock extends Mixins(BlockMixin) {
  private store: Store = useStore(this.$store)

  private get projects() {
    const { showArchived } = this.block
    const { cms } = this.store

    return showArchived ? cms.allProjects : cms.activeProjects
  }
}
</script>
