<template>
  <canvas :class="styles.board" />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Store, useStore } from '~src/store'
import { Tween } from '~src/global/animation'
import { css, design } from '~src/design'
import SimpleDrawingBoard from 'simple-drawing-board'

@Component
export default class DrawingBoard extends Vue {
  private store: Store = useStore(this.$store)

  private board!: any

  private timeout!: any

  private drawing!: string

  private status = ``

  private delay = 500

  private config = {
    lineSize: 3,
    lineColor: design.colors.brand,
    historyDepth: 1
  }

  private events = [
    `mousedown`,
    `touchstart`,
    `mousemove`,
    `touchmove`,
    `mouseup`,
    `touchend`,
    `touchcancel`,
    `gesturestart`
  ]

  public styles = {
    board: css({
      ...design.Utils.autoAlpha(0),
      height: `100vh`,
      position: `fixed`,
      pointerEvents: `none`,
      width: `100vw`,
      zIndex: 0
    })
  }

  @Watch(`status`)
  private statusChanged(next: string, prev: string) {
    const canceled = prev === `canceled`
    const stopped = next === `mouseUp` && prev === `mouseMove`
    const active = (prev === `mouseDown` || prev === `mouseMove`) && next === `mouseMove`

    if (active && this.timeout) {
      clearTimeout(this.timeout)
    } else if (stopped || canceled) {
      this.timeout = setTimeout(this.saveDrawing, this.delay)
    }
  }

  public async mounted() {
    this.board = new SimpleDrawingBoard(this.$el, this.config)
    this.drawing = await this.store.cms.fetchDrawing()

    this.board.setImg(this.drawing, false, true)
    this.events.forEach(this.addEvent)

    Tween.to(this.$el, 4, { autoAlpha: 1 })
  }

  public destroyed() {
    this.events.forEach(this.removeEvent)
    this.board.dispose()
  }

  private addEvent(type: string) {
    return window.addEventListener(type, (ev) => this.captureEvent(type, ev))
  }

  private removeEvent(type: string) {
    return window.removeEventListener(type, (ev) => this.captureEvent(type, ev))
  }

  private updateStatus(type: string) {
    switch (type) {
      case `mousedown`:
      case `touchstart`:
        this.status = `mouseDown`
        break
      case `mousemove`:
      case `touchmove`:
        this.status = `mouseMove`
        break
      case `mouseup`:
      case `touchend`:
      case `touchcancel`:
      case `gesturestart`:
        this.status = `mouseUp`
        break
    }
  }

  private captureEvent(type: string, ev: Event) {
    let clientY = (ev as MouseEvent).clientY || undefined
    let clientX = (ev as MouseEvent).clientX || undefined

    // Since the drawing board is fixed, we must
    // take into account the window scroll position, when passing events.
    if (clientY) clientY += window.scrollY
    if (clientX) clientX += window.scrollX

    const event = new MouseEvent(type, { bubbles: false, cancelable: false, clientX, clientY })

    this.updateStatus(type)

    this.$el.dispatchEvent(event)
  }

  private async saveDrawing() {
    let status!: number
    let drawing = this.board.getImg()

    // Skip saving is nothing changed.
    if (drawing === this.drawing) return

    // Merge the new drawing with the original one.
    const saved = await this.store.cms.fetchDrawing()

    this.board.setImg(saved, false, false)
    this.board.setImg(drawing, true, false)

    // Save the merged drawing.
    await this.$nextTick(async () => {
      drawing = this.board.getImg()
      status = await this.store.cms.saveDrawing(drawing)
    })

    return status
  }
}
</script>
