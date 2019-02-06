<template>
  <input :type="type"
         :value="value"
         :placeholder="placeholder"
         v-on="listeners" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class BaseInput extends Vue {
  @Prop({ type: [String, Number], default: `` })
  private value!: string

  @Prop({ type: String, default: `text` })
  private type!: string

  @Prop({ type: String })
  private placeholder!: string

  /**
   * Add a new `input` event that emits the input's current value,
   * add it to the default listeners and return all of them.
   */
  private get listeners() {
    return {
      ...this.$listeners,
      input: (event: any) => this.$emit(`input`, event.target.value)
    }
  }
}
</script>
