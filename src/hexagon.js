import * as PIXI from 'pixi.js'
import drawHexagon from './utils/draw-hexagon'
import Tile from './tile'
import Orientation from './orientation'

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
   * @param {Orientation}            options.orientation Pointy or flatty topped hexagon.
   * @param {Number}                 options.radius      radius of the hexagon to draw.
   * @param {Number}                 options.tint        Color of the hexagon, formatted like `0xff5544`.
   * @param {Number}                 options.lineColor   Color of the line to draw, formatted like `0xff5544`. (ignored if texture is used)
   * @param {Number}                 options.fillColor   Color of the hexagon to draw, formatted like `0xff5544`. (ignored if texture is used)
   */
  constructor (coordinates, options = {}) {
    super(coordinates)
    this.updateDisplayObject(options)
    // Make reactive
    if (options.interactive) {
      this.displayObject.interactive = true
      this.displayObject.buttonMode = true
    }
    this.displayObject.tint = options.tint || 0xFFFFFF
  }

  set tint (value) {
    if (this.displayObject) this.displayObject.tint = value
  }

  get tint () {
    return this.displayObject ? this.displayObject.tint : undefined
  }

  toString () {
    return `Hexagon{${this.coordinates}}`
  }

  updateDisplayObject (options) {
    if (this.displayObject) this.removeChild(this.displayObject)
    if (options.texture) {
      this.displayObject = PIXI.Sprite.from(options.texture)
      this.displayObject.anchor.set(0.5)
    } else {
      this.displayObject = drawHexagon(
        options.orientation || Orientation.FLAT_TOP,
        options.radius || 25,
        options.lineColor || 0xffffff,
        options.fillColor || 0xffffff
      )
    }
    this.addChild(this.displayObject)
  }
}

export default Hexagon
