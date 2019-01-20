import * as PIXI from 'pixi.js'

const cos = Math.cos(Math.PI / 6)
const sin = Math.sin(Math.PI / 6)

/**
 * Creates a hexagonContainer of hexagon.
 *
 * @param {number} radius - The outter radius of an hexagon, in pixel.
 * @returns {PIXI.Container} - A container having all the hexagons as childs.
 */
export function createHexagonContainer (radius = 50) {
  const gutter = 1.5 * radius * 2 * cos
  const matrix = new PIXI.Matrix()
  matrix.a = cos * gutter // Scale X
  matrix.b = sin * gutter // Skew Y
  matrix.d = gutter

  // Distance between two hexagon centers

  const hexagonContainer = new PIXI.Container()
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const position = new PIXI.Point(x, y)
      const hexagon = createHexagon(radius)
      hexagon.position = matrix.apply(position)
      hexagonContainer.addChild(hexagon)
    }
  }
  return hexagonContainer
}

export function createHexagon (radius = 50) {
  const graphics = new PIXI.Graphics(false)
  // set a fill and line style
  graphics.beginFill(0x777777)
  graphics.lineStyle(1, 0xffffff, 1, 0)
  graphics.drawPolygon(createFlatyPolygon(radius))
  graphics.closePath()
  graphics.endFill()
  return graphics
}

function createFlatyPolygon (radius) {
  var points = []
  var sin = Math.sin(Math.PI / 3) * radius

  // first point at right
  points.push(radius, 0)
  points.push(radius / 2, -sin)
  points.push(-radius / 2, -sin)

  // forth point left
  points.push(-radius, 0)
  points.push(-radius / 2, sin)
  points.push(radius / 2, sin)

  return points
}
