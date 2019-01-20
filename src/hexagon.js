import Coordinates from './coordinates'
import * as PIXI from 'pixi.js'
import { drawHexagon } from './hexagon-geometry'

function createDisplayObject(options) {
  if (options.texture) {
    const displayObject = new PIXI.Sprite(options.texture)
    displayObject.anchor.x = 0.5
    displayObject.anchor.y = 0.5
    return displayObject
  }
  return drawHexagon(
    options.orientation,
    options.radius,
    options.lineColor,
    options.fillColor
  )
}

class Hexagon {
  constructor (coordinates, options = {}) {
    this.coordinates = new Coordinates(coordinates)
    this.displayObject = createDisplayObject(options)
    if (options.interactive) {
      this.displayObject.interactive = true
      this.displayObject.buttonMode = true
    }
  }

  applyMatrix (matrix) {
    this.displayObject.position = matrix.apply(this.coordinates)
    // console.log(this.coordinates, this.displayObject.position)
  }
}

export default Hexagon

