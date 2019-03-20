import * as PIXI from 'pixi.js'
import drawHexagon from './utils/draw-hexagon'
import Tile from './tile'

function createDisplayObject (options) {
  // TODO test PIXI.mesh.Plane
  const displayObject = PIXI.Sprite.from(options.texture)
  displayObject.anchor.set(0.5)
  return displayObject
}

function createMask (options) {
  return drawHexagon(
    options.orientation,
    options.radius,
    options.lineColor || 0xffffff,
    options.fillColor || 0xffffff
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
   * @param {Orientation}            options.orientation Pointy or flatty topped hexagon.
   * @param {Number}                 options.radius      radius of the hexagon to draw.
   * @param {Number}                 options.tint        Color of the hexagon, formatted like `0xff5544`.
   * @param {Number}                 options.lineColor   Color of the line to draw, formatted like `0xff5544`. (ignored if texture is used)
   * @param {Number}                 options.fillColor   Color of the hexagon to draw, formatted like `0xff5544`. (ignored if texture is used)
   */
  constructor (coordinates, options = {}) {
    super(coordinates)
    if (options.texture) {
      this.displayObject = createDisplayObject(options)
      this.addChild(this.displayObject)
      this.mask = createMask(options)
      this.addChild(this.mask)
      this.displayObject.mask = this.mask
    } else {
      this.displayObject = createMask(options)
      this.addChild(this.displayObject)
    }
    if (options.interactive) {
      this.displayObject.interactive = true
      this.displayObject.buttonMode = true
    }
    this.displayObject.tint = options.tint || 0xFFFFFF
  }

  set tint (value) {
    this.displayObject.tint = value
  }

  get tint () {
    return this.displayObject.tint
  }

  toString () {
    return `Hexagon{${this.coordinates}}`
  }
}

export default Hexagon
