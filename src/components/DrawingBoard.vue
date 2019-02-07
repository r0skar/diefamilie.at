<template>
  <canvas :class="styles.board" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { css, design } from '~src/design'
import SimpleDrawingBoard from 'simple-drawing-board'

@Component
export default class DrawingBoard extends Vue {
  private drawingBoard!: any

  private boardConfig = {
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
      height: `100vh`,
      position: `fixed`,
      pointerEvents: `none`,
      width: `100vw`,
      zIndex: 0
    })
  }

  public mounted() {
    this.drawingBoard = new SimpleDrawingBoard(this.$el, this.boardConfig)
    this.events.forEach(this.addEvent)
  }

  public destroyed() {
    this.events.forEach(this.removeEvent)
  }

  private addEvent(type: string) {
    return window.addEventListener(type, (ev) => this.captureEvent(type, ev))
  }

  private removeEvent(type: string) {
    return window.removeEventListener(type, (ev) => this.captureEvent(type, ev))
  }

  private captureEvent(type: string, ev: Event) {
    let clientY = (ev as MouseEvent).clientY || undefined
    let clientX = (ev as MouseEvent).clientX || undefined

    // Since the drawing board is fixed, we must
    // take into account the window scroll position, when passing events.
    if (clientY) clientY += window.scrollY
    if (clientX) clientX += window.scrollX

    const event = new MouseEvent(type, { bubbles: false, cancelable: false, clientX, clientY })

    this.$el.dispatchEvent(event)
  }
}
</script>
