import CubeCoordinates from './cube-coordinates'
import * as PIXI from 'pixi.js'

// TODO Make observable ? -> Dependency  with the matrix
/**
 * Abstraction of a hexagonal grid position
 *
 * @class Tile
 */
class Tile {
  /**
   * Create a tile
   *
   * @param {Object|CubeCoordinates} coordinate Complete or partial cube coordinates.
   * @param {Number}  coordinate.x=0  x part of the coordinates.
   * @param {Number}  coordinate.y  y part of the coordinates.
   * @param {Number}  coordinate.z  z part of the coordinates.
   * @param {PIXI.DisplayObject} displayObject the display object to render at the tile position.
   */
  constructor (coordinates = { x: 0, y: 0, z: 0 }, displayObject = new PIXI.DisplayObject()) {
    this.coordinates = new CubeCoordinates(coordinates)
    this.displayObject = displayObject
  }

  /**
   * Position the display object on a hexagonal grid.
   *
   * @see HexagonalGrid
   * @param {PIXI.Matrix} matrix the hexagonal grid's matrix
   */
  applyMatrix (matrix) {
    if (this.displayObject) {
      this.displayObject.position = matrix.apply(this.coordinates)
    }
  }

  toString () {
    return `Tile{${this.coordinates}}`
  }
}

export default Tile
