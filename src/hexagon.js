import * as PIXI from 'pixi.js'
import drawHexagon from './utils/draw-hexagon'
import Tile from './tile'

function createDisplayObject (options) {
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

/**
 * Hexagon representation
 *
 * @class Hexagon
 */
class Hexagon extends Tile {
  /**
   * Constructs the object.
   *
   * @param {Object|CubeCoordinates} coordinates         The coordinates
   * @param {Object}                 options             The options
   * @param {Boolean}                options.interactive Set to true if the hexagon can catch mouse events.
   * @param {PIXI.Texture}           options.texture     Set texture if you need a sprite instead of an hexagon.
   * @param {Orientation}            options.orientation Pointy or flatty topped hexagon. (ignored if texture is used)
   * @param {Number}                 options.radius      radius of the hexagon to draw. (ignored if texture is used)
   * @param {String}                 options.lineColor   Color of the line to draw, formatted like `0xff5544`. (ignored if texture is used)
   * @param {String}                 options.fillColor   Color of the hexagon to draw, formatted like `0xff5544`. (ignored if texture is used)
   */
  constructor (coordinates, options = {}) {
    super(coordinates)
    this.displayObject = createDisplayObject(options)
    if (options.interactive) {
      this.displayObject.interactive = true
      this.displayObject.buttonMode = true
    }
  }

  toString () {
    return `Hexagon{${this.coordinates}}`
  }
}

export default Hexagon
