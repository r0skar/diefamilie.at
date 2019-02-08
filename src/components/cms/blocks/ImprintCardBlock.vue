<template>
  <BaseCard :items="items" />
</template>

<script lang="ts">
import { BlockMixin } from '~src/global/mixins'
import { Component, Mixins } from 'vue-property-decorator'

@Component
export default class ImprintCardBlock extends Mixins(BlockMixin) {
  private get items() {
    const { name, email, telephone, jurisdiction, branch, uid } = this.block

    return [
      { label: `Name`, value: name },
      { label: `Email`, value: email, to: `mailto:${email}` },
      { label: `Telefon`, value: telephone, to: `mailto:${telephone}` },
      { label: `UID`, value: uid },
      { label: `Gerichtsstand`, value: jurisdiction },
      { label: `Branche`, value: branch }
    ]
  }
}
</script>
