<template>
  <canvas :class="styles.board" />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Tween } from '~src/global/animation'
import { css, design } from '~src/design'
import { fetchDrawing, saveDrawing } from '~src/global/api'
import { sleep } from '~src/global/utils'
import SimpleDrawingBoard from 'simple-drawing-board'

@Component
export default class DrawingBoard extends Vue {
  private board!: any

  private timeout!: any

  private status = ``

  private delay = 1500

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

  private get localDrawing() {
    return window.sessionStorage.getItem(`diefamilie-drawing`) || this.board.getImg()
  }

  private set localDrawing(drawing: string) {
    window.sessionStorage.setItem(`diefamilie-drawing`, drawing)
  }

  @Watch(`status`)
  private statusChanged(next: string, prev: string) {
    const drawing = this.board.getImg()
    const canceled = prev === `canceled`
    const stopped = next === `mouseUp` && prev === `mouseMove`
    const active = (prev === `mouseDown` || prev === `mouseMove`) && next === `mouseMove`

    // Immediatly save the new drawing locally.
    // Doing so, makes sure that all changes survive, even if
    // the save timeout is canceled.
    this.localDrawing = drawing

    if (active && this.timeout) {
      clearTimeout(this.timeout)
    } else if (stopped || canceled) {
      this.timeout = setTimeout(this.saveDrawing, this.delay)
    }
  }

  public async mounted() {
    this.board = new SimpleDrawingBoard(this.$el, this.config)
    const remote = await fetchDrawing()

    // Add the remote drawing as base and overlay the local drawing.
    this.board.setImg(remote, false, false)
    this.board.setImg(this.localDrawing, true, false)

    this.events.forEach(this.addEvent)

    Tween.to(this.$el, 4, { autoAlpha: 1 })
  }

  public destroyed() {
    if (!this.timeout) this.saveDrawing()

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
    // Immediatly return statusCode `200` if nothing changed.
    if (this.localDrawing === this.board.getImg()) return 200

    const remote = await fetchDrawing()

    // Overlay the remote drawing over the local drawing.
    this.board.setImg(remote, true, true)

    // We sleep by 0 to force the next call to be executed last.
    // This ensures that `this.board.getImg()` returns the
    // merged image instead of the old one.
    await sleep(0)

    const drawing = this.board.getImg()

    // Save the drawing locally and remotely.
    this.localDrawing = drawing
    const status = await saveDrawing(drawing)

    return status
  }
}
</script>
