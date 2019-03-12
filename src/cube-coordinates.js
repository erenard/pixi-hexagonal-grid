import checkCoordinates from './utils/check-coordinates'
import selectArea from './utils/select-area'

/**
 * The cude coordinates (x, y, z) of an hexagon.
 *
 * @class CubeCoordinates
 */
class CubeCoordinates {
  /**
   * Creates an instance of CubeCoordinates.
   * Will check and complete the coordinates if one of them is missing.
   *
   * @param  {Object|CubeCoordinates} coordinate Complete or partial cube coordinates.
   * @param  {Number}  coordinate.x  x part of the coordinates.
   * @param  {Number}  coordinate.y  y part of the coordinates.
   * @param  {Number}  coordinate.z  z part of the coordinates.
   * @memberof CubeCoordinates
   */
  constructor ({ x, y, z }) {
    const coordinates = checkCoordinates({ x, y, z })
    this.x = coordinates.x
    this.y = coordinates.y
    this.z = coordinates.z
  }

  /**
   * Check the equality of this coordinates with an other coordinates.
   *
   * @param  {Object|CubeCoordinates}  other The other cube coordinate.
   * @param  {Number}  other.x  x part of the other coordinates.
   * @param  {Number}  other.y  y part of the other coordinates.
   * @param  {Number}  other.z  z part of the other coordinates.
   * @return {Boolean}  Equality between this and other.
   * @memberof CubeCoordinates
   */
  equals ({ x, y, z }) {
    return this.x === x && this.y === y && this.z === z
  }

  /**
   * Add an offset to this cube coordinates.
   *
   * @param  {Object|CubeCoordinates}  offset The offset to apply to this cube coordinate.
   * @param  {Number}  offset.x  x part of the offset coordinates.
   * @param  {Number}  offset.y  y part of the offset coordinates.
   * @param  {Number}  offset.z  z part of the offset coordinates.
   * @returns New offseted instance of cube coordinates.
   * @memberof CubeCoordinates
   */
  offset ({ x, y, z }) {
    const offset = checkCoordinates({ x, y, z })
    return new CubeCoordinates({
      x: this.x + offset.x,
      y: this.y + offset.y,
      z: this.z + offset.z
    })
  }

  /**
   * Generate a set of the 6 neighbouring CubeCoordinates.
   * @example
   * for (let neighbourg in cc.neighbourgs()) {
   *   // use neighbourg
   * }
   * @yields   {CubeCoordinates} Neighbourg cube coordinates.
   * @memberof CubeCoordinates
   */
  * neighbourgs () {
    yield this.offset({ x: 1 })
    yield this.offset({ y: 1 })
    yield this.offset({ z: 1 })
    yield this.offset({ x: -1 })
    yield this.offset({ y: -1 })
    yield this.offset({ z: -1 })
  }

  /**
   * Gives a string representation of this CubeCoordinates, using the following format: `${x}_${y}_${z}`.
   * Used as a storage key for the tiles of a Grid.
   *
   * @returns {string} Representation of the coordinates.
   * @memberof CubeCoordinates
   */
  toString () {
    return `${this.x}_${this.y}_${this.z}`
  }

  /**
   * Contruct a coordinate object from its string representation.
   * @see toString()
   *
   * @param      {string}       string  The string representation of the following format: `${x}_${y}_${z}`
   * @return     {CubeCoordinates}  The coordinates object
   */
  static parseCoordinates (string) {
    const elements = string.split('_')
    return new CubeCoordinates({
      x: Number.parseInt(elements[0]),
      y: Number.parseInt(elements[1]),
      z: Number.parseInt(elements[2])
    })
  }

  /**
   * Generates a set of coordinates covering an area, given (x, y, z) dimensions and optionnaly a coordinates of origin.
   *
   * Usage example:
   * ```js
   * // iterate over the area's set of coordinates
   * for(let coordinates of CubeCoordinates.selectArea({x: 2, y: 2, z: 2})) {
   *   // use coordinates
   * }
   * ```
   *
   * @param  {Object}  dimensions - The dimensions of the wanted area for all the axis.
   * @param  {Number}  [dimensions.x=0] - The size of the area along the X axis.
   * @param  {Number}  [dimensions.y=0] - The size of the area along the Y axis.
   * @param  {Number}  [dimensions.z=0] - The size of the area along the Z axis.
   * @param  {CubeCoordinates} [origin={x: 0, y: 0, z: 0}] - The origin coordinate to construct the area from.
   * @return {CubeCoordinates} Set of coordinates covering the area.
   */
  static * selectArea (dimensions, origin = { x: 0, y: 0, z: 0 }) {
    return selectArea(dimensions, origin)
  }
}

export default CubeCoordinates
