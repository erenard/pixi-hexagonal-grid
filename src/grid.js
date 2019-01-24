import * as PIXI from 'pixi.js'

import GridDisplayObject from './grid-display-object'
import Coordinates from './coordinates'
import createGraph from 'ngraph.graph'
import path from 'ngraph.path'

/**
 * Grid of hexagons, stored by coordinates.
 * TODO Rename to HexagonContainer ?
 *
 * @class Grid
 */
class Grid {
  /**
   * Creates an instance of Grid.
   *
   * @memberof Grid
   */
  constructor (orientation, distance) {
    this.displayObject = new GridDisplayObject(orientation, distance)
    this.graph = createGraph()
    this.hexagonByCoordinates = {}
  }

  get orientation () {
    return this.displayObject.orientation
  }

  set orientation (value) {
    return this.displayObject.orientation = value
  }

  get distance () {
    return this.displayObject.distance
  }

  set distance (value) {
    return this.displayObject.distance = value
  }

  /**
   * Array of all the hexagons in this grid.
   *
   * @readonly
   * @memberof Grid
   */
  get hexagons () {
    return Object.values(this.hexagonByCoordinates)
  }

  /**
   * Get the hexagon at the given coordinates.
   *
   * @param {Coordinates} coordinates - The coordinates.
   * @returns {number} The hexagon.
   * @memberof Grid
   */
  get (coordinates) {
    const key = Coordinates.toString(coordinates)
    return this.hexagonByCoordinates[key]
  }

  /**
   * Add an hexagon to the grid.
   *
   * @param {Hexagon} hexagon - The hexagon to add.
   * @memberof Grid
   */
  add (hexagon) {
    const key = hexagon.coordinates.toString()
    this.hexagonByCoordinates[key] = hexagon

    this.displayObject.addHexagon(hexagon)

    this.graph.addNode(key)
    hexagon.coordinates.neighbourgs.forEach(link => {
      const linkKey = link.toString()
      if (this.hexagonByCoordinates[linkKey]) {
        this.graph.addLink(key, linkKey)
      }
    })
  }

  /**
   * Proceduraly fill the grid with Tiles
   *
   * @param {Iterable<Coordinates>} coordinatesIterable  An iterable set of coordinates
   * @param {Function}              tileFactory          A factory function creating a Tile form a coordinate: coordinates => Tile
   */
  fill (coordinatesIterable, tileFactory) {
    for(let coordinates of coordinatesIterable) {
      const tile = tileFactory(coordinates)
      this.add(tile)
    }
  }

  /**
   * Remove an hexagon at the given coordinates.
   *
   * @function
   * @param {Coordinates} coordinates - The location of the removed hexagon.
   * @returns {Hexagon} The removed hexagon.
   * @memberof Grid
   */
  remove (coordinates) {
    const key = Coordinates.toString(coordinates)
    const hexagon = this.hexagonByCoordinates[key]
    if (hexagon) {
      this.displayObject.removeHexagon(hexagon)
      delete this.hexagonByCoordinates[key]
      this.graph.removeNode(key)
      hexagon.coordinates.neighbourgs.forEach(link => {
        const linkKey = link.toString()
        if (this.hexagonByCoordinates[linkKey]) {
          this.graph.removeLink(key, linkKey)
        }
      })
    }
    return hexagon
  }

  /**
   * Find a path between two hexagons.
   *
   * @param {Coordinates} start - Starting path hexagon.
   * @param {Coordinates} end - Ending path hexagon.
   */
  findPath (start, end) {
    let pathFinder = path.aStar(this.graph)
    try {
      return pathFinder
        .find(Coordinates.toString(start), Coordinates.toString(end))
        .map(node => {
          return this.hexagonByCoordinates[node.id]
        })
    } catch (err) {
      console.error(err)
      return null
    }
  }
}

export default Grid
