import CubeCoordinates from './cube-coordinates'
import * as PIXI from 'pixi.js'

/**
 * Abstraction of a hexagonal grid position
 *
 * @class Tile
 */
class Tile extends PIXI.Container {
  /**
   * Create a tile
   *
   * @param {Object|CubeCoordinates} coordinate Complete or partial cube coordinates.
   * @param {Number}  coordinate.x=0  x part of the coordinates.
   * @param {Number}  coordinate.y  y part of the coordinates.
   * @param {Number}  coordinate.z  z part of the coordinates.
   */
  constructor (coordinates = { x: 0, y: 0, z: 0 }) {
    super()
    this.coordinates = new CubeCoordinates(coordinates)
  }

  /**
   * Position the display object on a hexagonal grid.
   *
   * @see HexagonalGrid
   * @param {PIXI.Matrix} matrix the hexagonal grid's matrix
   */
  applyMatrix (matrix) {
    this.position = matrix.apply(this.coordinates)
  }

  toString () {
    return `Tile{${this.coordinates}}`
  }
}

export default Tile
