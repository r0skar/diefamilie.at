/**
 * Nullify transforms when calculating an element's
 * bounding client rectangle. This is all behaving just like
 * `getBoundingClientRect()`, but it nullifies all the transforms and
 * therefor reverts the element onto its original position.
 * @see https://gist.githubusercontent.com/andreiglingeanu/aa3aef6c8dffb2105736148b2cab3617/raw/520bb02363d2c86aa22d311959d7214f219d73e1/nullify-transforms.js
 */
export const nullifyTransforms = (el: HTMLElement) => {
  const parseTransform = (el: HTMLElement) => {
    const transform = window.getComputedStyle(el).transform

    return transform
      ? transform
          .split(/\(|,|\)/)
          .slice(1, -1)
          .map(function(v) {
            return parseFloat(v)
          })
      : false
  }

  const { top, left, width, height } = el.getBoundingClientRect()
  const transformArr = parseTransform(el)

  if (transformArr && transformArr.length == 6) {
    const t = transformArr
    const det = t[0] * t[3] - t[1] * t[2]

    return {
      width: width / t[0],
      height: height / t[3],
      left: (left * t[3] - top * t[2] + t[2] * t[5] - t[4] * t[3]) / det,
      top: (-left * t[1] + top * t[0] + t[4] * t[1] - t[0] * t[5]) / det
    }
  } else {
    return { top, left, width, height }
  }
}
