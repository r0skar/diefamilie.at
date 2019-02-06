import { Component, Prop, Vue } from 'vue-property-decorator'

/**
 * Mixin for a single CMS content block.
 */
@Component
export class BlockMixin extends Vue {
  /**
   * The current block object.
   */
  @Prop({ type: Object, required: true })
  public block!: Cms.Block
}
