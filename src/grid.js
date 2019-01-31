import * as PIXI from 'pixi.js'

import Orientation from './orientation'
import createGraph from 'ngraph.graph'
import path from 'ngraph.path'

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
   * @memberof HexagonalGrid
   */
  constructor (orientation = Orientation.FLAT_TOP, distance = 25) {
    this.tileByCoordinates = {}
    this.displayObject = new PIXI.Container()
    this.matrix = new PIXI.Matrix()
    this._orientation = orientation
    this.distance = distance
    this.graph = createGraph()
  }

  /**
   * Get the orientation
   *
   * @return     {string}  The current orientation of this hexagonal grid.
   */
  get orientation () {
    return this._orientation
  }

  /**
   * Set the orientation
   *
   * @param      {string}  value   The new orientation of this hexagonal grid
   */
  set orientation (value) {
    if (value !== this._orientation && Orientation.check(value)) {
      this._orientation = value
      this.updateMatrix()
    }
  }

  get distance () {
    return this._distance / (2 * cos)
  }

  set distance (value) {
    this._distance = value * (2 * cos)
    this.updateMatrix()
  }

  /**
   * Update the transformation matrix used to position the tiles.
   *
   * @memberof HexagonalGrid
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
   * Convert Coordinates to a PIXI.Point.
   *
   * @param {Coordinates} coordinates - The coordinates to convert.
   * @returns {PIXI.Point} The PIXI.Point of the pixel position.
   * @memberof GridDisplayObject
   */
  coordinatesToPoint (coordinates) {
    return this.matrix.apply(coordinates)
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

  /**
   * Array of all the tiles in this grid.
   *
   * @readonly
   * @memberof Grid
   */
  get tiles () {
    return Object.values(this.tileByCoordinates)
  }

  /**
   * Get the tile at the given coordinates.
   *
   * @param {Coordinates} coordinates - The coordinates.
   * @returns {number} The tile.
   * @memberof Grid
   */
  get (coordinates) {
    const key = coordinates.toString()
    return this.tileByCoordinates[key]
  }

  /**
   * Add an tile to the grid.
   *
   * @param {Tile} tile - The tile to add.
   * @memberof Grid
   */
  add (tile) {
    const key = tile.coordinates.toString()
    this.tileByCoordinates[key] = tile

    tile.applyMatrix(this.matrix)

    this.displayObject.addChild(tile.displayObject)

    this.graph.addNode(key)
    for (let link of tile.coordinates.neighbourgs()) {
      const linkKey = link.toString()
      if (this.tileByCoordinates[linkKey]) {
        this.graph.addLink(key, linkKey)
      }
    }
  }

  /**
   * Proceduraly fill the grid with Tiles
   *
   * @param {Iterable<Coordinates>} coordinatesIterable  An iterable set of coordinates
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
   * @param {Coordinates} coordinates - The location of the removed tile.
   * @returns {Tile} The removed tile.
   * @memberof Grid
   */
  remove (coordinates) {
    const key = coordinates.toString()
    const tile = this.tileByCoordinates[key]
    if (tile) {
      this.displayObject.removeChild(tile.displayObject)
      delete this.tileByCoordinates[key]
      this.graph.removeNode(key)
      for (let link of tile.coordinates.neighbourgs()) {
        const linkKey = link.toString()
        if (this.tileByCoordinates[linkKey]) {
          this.graph.removeLink(key, linkKey)
        }
      }
    }
    return tile
  }

  /**
   * Find a path between two tiles.
   *
   * @param {Coordinates} start - Starting path tile.
   * @param {Coordinates} end - Ending path tile.
   */
  findPath (start, end) {
    const pathFinder = path.aStar(this.graph)
    try {
      return pathFinder
        .find(start.toString(), end.toString())
        .map(node => {
          return this.tileByCoordinates[node.id]
        })
    } catch (err) {
      console.error(err)
      return null
    }
  }

  addLink () {

  }

  removeLink () {

  }
}

export default HexagonalGrid
