import * as PIXI from 'pixi.js'
import Orientation from './orientation'
import Coordinates from './coordinates'

const cos = Math.cos(Math.PI / 6)
const sin = Math.sin(Math.PI / 6)

/**
 * Pixi container associated with an hexagon grid.
 *
 * @export
 * @class GridDisplayObject
 * @extends {PIXI.Container}
 */
class GridDisplayObject extends PIXI.Container {
  /**
   * Creates a GridDisplayObject
   * @param orientation
   * @param distance
   * @memberof GridDisplayObject
   */
  constructor (orientation = Orientation.FLAT_TOP, distance = 25) {
    super()
    this.displayObjectByCoordinates = {}
    this.interactive = true
    this.matrix = new PIXI.Matrix()
    this._orientation = orientation
    this.distance = distance
  }

  get orientation () {
    return this._orientation
  }

  set orientation (value) {
    this._orientation = value
    this.updateMatrix()
  }

  get distance () {
    return this._distance / (2 * cos)
  }

  set distance (value) {
    this._distance = value * (2 * cos)
    this.updateMatrix()
  }

  /**
   * Adds several hexagons to this gridDisplayObject.
   *
   * @param {Array<Hexagon>} hexagons - Array of hexagons to be added.
   * @memberof GridDisplayObject
   */
  addHexagons (hexagons) {
    hexagons.forEach(this.addHexagon, this)
  }

  /**
   * Add an hexagon to this  gridDisplayObject.
   *
   * @param {Hexagon} hexagon - The hexagon to be added.
   * @memberof GridDisplayObject
   */
  addHexagon (hexagon) {
    hexagon.applyMatrix(this.matrix)

    const key = hexagon.coordinates.toString()
    const displayObject = hexagon.displayObject

    this.displayObjectByCoordinates[key] = displayObject

    this.addChild(displayObject)
  }

  /**
   * Removes several hexagons.
   *
   * @param {Array<Hexagon>} hexagons - The array of hexagons to be removed.
   * @memberof GridDisplayObject
   */
  removeHexagons (hexagons) {
    hexagons.forEach(this.removeHexagon, this)
  }

  /**
   * Remove an hexagon form this gridDisplayObject.
   *
   * @param {Hexagon} hexagon - The hexagon to be removed.
   * @memberof GridDisplayObject
   */
  removeHexagon (hexagon) {
    const displayObject = this.displayObjectByCoordinates[hexagon.coordinates.toString()]
    if (displayObject) {
      // TODO use removeChildAt ?
      this.removeChild(displayObject)
      delete this.displayObjectByCoordinates[hexagon.coordinates.x + '_' + hexagon.coordinates.y]
    }
  }

  /**
   * Update the transformation matrix used to position the hexagons.
   *
   * @memberof GridDisplayObject
   */
  updateMatrix () {
    this.matrix.identity()
    if(this._orientation === Orientation.FLAT_TOP) {
      // Distance between two hexagon centers
      this.matrix.a = cos * this._distance // Scale X
      this.matrix.b = sin * this._distance // Skew X
      this.matrix.c = 0
      this.matrix.d = this._distance      
    } else {
      // Distance between two hexagon centers
      this.matrix.a = this._distance
      this.matrix.b = 0
      this.matrix.c = sin * this._distance // Skew Y
      this.matrix.d = cos * this._distance // Scale Y
    }
    // Updates all the childrens positions
    Object.entries(this.displayObjectByCoordinates).forEach(entry => {
      entry[1].position = this.coordinatesToPoint(Coordinates.fromString(entry[0]))
    })
  }

  /**
   * Convert Coordinates to a PIXI.Point.
   *
   * @param {Coordinates} coordinates - The coordinates to convert.
   * @returns {PIXI.Point} The PIXI.Point of the pixel position.
   * @memberof GridDisplayObject
   */
  coordinatesToPoint (coordinates) {
    return this.matrix.apply(new Coordinates(coordinates))
  }

  /**
   * Converts a PIXI.Point to Coordinates
   *
   * @param   {PIXI.Point}  point - The point of the pixel position.
   * @returns {Coordinates} The closest coordinates to that pixel position.
   */
  pointToCoordinates (point) {
    throw new Error('not implemented')
  }
}

export default GridDisplayObject
