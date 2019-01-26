import Orientation from '../orientation'
import * as PIXI from 'pixi.js'

export default function drawHexagon (
  orientation = Orientation.FLAT_TOP,
  radius = 50,
  lineColor = 0xffffff,
  fillColor = 0x777777
) {
  const graphics = new PIXI.Graphics(false)
  // set a fill and line style
  if (fillColor) graphics.beginFill(fillColor, 1)
  graphics.lineStyle(1, lineColor, 1, 0)
  graphics.drawPolygon(createPoints(orientation, radius))
  graphics.closePath()
  if (fillColor) graphics.endFill()
  return graphics
}

const halfSquareRootOf3 = Math.sqrt(3) / 2

function createPoints (orientation, radius) {
  Orientation.check(orientation)

  const halfRadius = radius / 2
  const halfSquareRootOf3Radius = halfSquareRootOf3 * radius

  var points = []
  if (Orientation.FLAT_TOP === orientation) {
    // first point at right
    points.push(radius, 0)
    points.push(halfRadius, -halfSquareRootOf3Radius)
    points.push(-halfRadius, -halfSquareRootOf3Radius)

    // forth point left
    points.push(-radius, 0)
    points.push(-halfRadius, halfSquareRootOf3Radius)
    points.push(halfRadius, halfSquareRootOf3Radius)
  } else {
    // first point at bottom
    points.push(0, radius)
    points.push(-halfSquareRootOf3Radius, halfRadius)
    points.push(-halfSquareRootOf3Radius, -halfRadius)

    // forth point top
    points.push(0, -radius)
    points.push(halfSquareRootOf3Radius, -halfRadius)
    points.push(halfSquareRootOf3Radius, halfRadius)
  }
  return points
}
