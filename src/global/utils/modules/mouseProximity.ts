/**
 * Track the distance of the mouse to a given element.
 * When `center` is true, track the distance to the center
 * of the element, otherwise to its outer boundaries.
 */
export const mouseProximity = (
  ev: MouseEvent,
  el: HTMLElement | Element,
  options: { center?: boolean; onProgress: (x: number, y: number, z: number) => void }
) => {
  // Helper to get the current mouse posiion.
  const getMousePos = (e: MouseEvent) => {
    let posx = 0
    let posy = 0

    if (e.pageX || e.pageY) {
      posx = e.pageX
      posy = e.pageY
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }

    return { x: posx, y: posy }
  }

  // Returns the distance between two points.
  const distancePoints = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  }

  const elRect = el.getBoundingClientRect()
  const mousepos = getMousePos(ev)
  const { x, y } = mousepos
  const closestPoint = { x, y }

  const docScrolls = {
    left: document.body.scrollLeft + document.documentElement.scrollLeft,
    top: document.body.scrollTop + document.documentElement.scrollTop
  }

  const elCoords = {
    x1: elRect.left + docScrolls.left,
    x2: elRect.width + elRect.left + docScrolls.left,
    y1: elRect.top + docScrolls.top,
    y2: elRect.height + elRect.top + docScrolls.top
  }

  // Use the elements center as anchor point
  // otherwise the outer borders are used.
  if (options.center) {
    elCoords.x1 = elRect.left + elRect.width / 2 + docScrolls.left
    elCoords.x2 = elRect.width / 2 + elRect.left + docScrolls.left
    elCoords.y1 = elRect.top + elRect.height / 2 + docScrolls.top
    elCoords.y2 = elRect.height / 2 + elRect.top + docScrolls.top
  }

  if (mousepos.x < elCoords.x1) {
    closestPoint.x = elCoords.x1
  } else if (mousepos.x > elCoords.x2) {
    closestPoint.x = elCoords.x2
  }

  if (mousepos.y < elCoords.y1) {
    closestPoint.y = elCoords.y1
  } else if (mousepos.y > elCoords.y2) {
    closestPoint.y = elCoords.y2
  }

  // We are done if no callback was provided.
  if (!options.onProgress) return

  // Run the provided callback.
  requestAnimationFrame(() => {
    options.onProgress(
      closestPoint.x - mousepos.x,
      closestPoint.y - mousepos.y,
      distancePoints(mousepos.x, mousepos.y, closestPoint.x, closestPoint.y)
    )
  })
}
