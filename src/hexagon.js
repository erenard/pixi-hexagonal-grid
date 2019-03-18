import * as PIXI from 'pixi.js'
import drawHexagon from './utils/draw-hexagon'
import Tile from './tile'

function createDisplayObject (options) {
  if (options.texture) {
    const displayObject = PIXI.Sprite.from(options.texture)
    displayObject.anchor.set(0.5)
    return displayObject
  }
  return drawHexagon(
    options.orientation,
    options.radius,
    options.lineColor,
    options.fillColor
  )
}

function createDisplayMask (orientation, radius) {
  return drawHexagon(
    orientation,
    radius,
    0xffffff,
    0xffffff
  )
}

/**
 * Hexagon representation
 * TODO Allways use a texture, instead of a graphics
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
   * @param {PIXI.Texture}           options.texutre     Set texture if you need a sprite instead of an hexagon.
   * @param {Orientation}            options.orientation Pointy or flatty topped hexagon.
   * @param {Number}                 options.radius      radius of the hexagon to draw.
   * @param {String}                 options.lineColor   Color of the line to draw, formatted like `0xff5544`. (ignored if sprite is used)
   * @param {String}                 options.fillColor   Color of the hexagon to draw, formatted like `0xff5544`. (ignored if sprite is used)
   */
  constructor (coordinates, options = {}) {
    super(coordinates)
    this.displayObject = createDisplayObject(options)
    if (options.interactive) {
      this.displayObject.interactive = true
      this.displayObject.buttonMode = true
    }
    this.addChild(this.displayObject)
    this.mask = createDisplayMask(options.orientation, options.radius)
    this.addChild(this.mask)
    this.displayObject.mask = this.mask
  }

  toString () {
    return `Hexagon{${this.coordinates}}`
  }
}

export default Hexagon
