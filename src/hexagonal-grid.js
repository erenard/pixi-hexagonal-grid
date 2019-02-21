import * as PIXI from 'pixi.js'

import Orientation from './orientation'
import PathFinding from './path-finding'

const cos = Math.cos(Math.PI / 6)
const sin = Math.sin(Math.PI / 6)

/**
 * Hexagonal grid of tiles, stored by coordinates.
 *
 * @class HexagonalGrid
 */
class HexagonalGrid {
  /**
   * Creates an instance of HexagonalGrid.
   *
   * @param      {String} [orientation=Orientation.FLAT_TOP] - The orientation of the hexagons of the grid.
   * @param      {Number} [distance=25] - The distance between two hexagons.
   */
  constructor (orientation = Orientation.FLAT_TOP, distance = 25) {
    this.tileByCoordinates = {}
    this.displayObject = new PIXI.Container()
    this.matrix = new PIXI.Matrix()
    this._orientation = orientation
    this.distance = distance
    this.pathFinding = new PathFinding()
  }

  /**
   * The tile's orientation.
   * @type {String}
   */
  get orientation () {
    return this._orientation
  }

  set orientation (value) {
    if (value !== this._orientation && Orientation.check(value)) {
      this._orientation = value
      this.updateMatrix()
    }
  }

  /**
   * The distance between two tiles.
   * @type {Number}
   */
  get distance () {
    return this._distance / (2 * cos)
  }

  set distance (value) {
    this._distance = value * (2 * cos)
    this.updateMatrix()
  }

  /**
   * Update the transformation matrix used to position the tiles.
   */
  updateMatrix () {
    this.matrix.identity()
    if (this._orientation === Orientation.FLAT_TOP) {
      // Distance between two tile centers
      this.matrix.a = cos * this._distance // Scale X
      this.matrix.b = sin * this._distance // Skew X
      this.matrix.c = 0
      this.matrix.d = this._distance
    } else {
      // Distance between two tile centers
      this.matrix.a = this._distance
      this.matrix.b = 0
      this.matrix.c = sin * this._distance // Skew Y
      this.matrix.d = cos * this._distance // Scale Y
    }
    // Updates all the childrens positions
    this.tiles.forEach(tile => {
      tile.applyMatrix(this.matrix)
    })
  }

  /**
   * Convert CubeCoordinates to a PIXI.Point
   *
   * @param {CubeCoordinates} coordinates - The coordinates to convert.
   * @returns {PIXI.Point} The PIXI.Point of the pixel position.
   */
  coordinatesToPoint (coordinates) {
    return this.matrix.apply(coordinates)
  }

  /**
   * Converts a PIXI.Point to CubeCoordinates
   *
   * @param   {PIXI.Point}  point - The point of the pixel position.
   * @returns {CubeCoordinates} The closest coordinates to that pixel position.
   */
  pointToCoordinates (point) {
    throw new Error('not implemented')
  }

  /**
   * All the tiles in this grid.
   *
   * @readonly
   * @type {Tile[]}
   */
  get tiles () {
    return Object.values(this.tileByCoordinates)
  }

  /**
   * The path finding object.
   *
   * @readonly
   * @type {PathFinding}
   */
  get pathFinding () {
    return this.pathFinding
  }

  /**
   * Get the tile at the given coordinates.
   *
   * @param {CubeCoordinates|String} coordinates - The coordinates or its string representation. @see CubeCoordinates.toString()
   * @returns {number} The tile.
   */
  get (coordinates) {
    const key = coordinates.toString()
    return this.tileByCoordinates[key]
  }

  /**
   * Add an tile to the grid.
   *
   * @param {Tile} tile - The tile to add.
   */
  add (tile) {
    const key = tile.coordinates.toString()
    this.tileByCoordinates[key] = tile

    tile.applyMatrix(this.matrix)

    this.displayObject.addChild(tile.displayObject)

    this.pathFinding.addNode(tile.coordinates)
  }

  /**
   * Proceduraly fill the grid with Tiles
   *
   * @param {Iterable<CubeCoordinates>} coordinatesIterable  An iterable set of coordinates
   * @param {Function}              tileFactory          A factory function creating a Tile form a coordinate: coordinates => Tile
   */
  fill (coordinatesIterable, tileFactory) {
    for (let coordinates of coordinatesIterable) {
      const tile = tileFactory(coordinates)
      this.add(tile)
    }
  }

  /**
   * Remove an tile at the given coordinates.
   *
   * @function
   * @param {CubeCoordinates} coordinates - The location of the removed tile.
   * @returns {Tile} The removed tile.
   */
  remove (coordinates) {
    const key = coordinates.toString()
    const tile = this.tileByCoordinates[key]
    if (tile) {
      this.displayObject.removeChild(tile.displayObject)
      delete this.tileByCoordinates[key]
      this.pathFinding.removeNode(coordinates)
    }
    return tile
  }
}

export default HexagonalGrid
