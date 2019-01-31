import checkCoordinates from './utils/check-coordinates'

/**
 * The cude coordinates (x, y, z) of an hexagon.
 *
 * @class Coordinates
 */
class Coordinates {
  /**
   * Creates an instance of Coordinates.
   * Will check and complete the coordinates if one of them is missing.
   *
   * @param {*} Any - Object having two of these properties x, y, z.
   * @memberof Coordinates
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
   * @param  {Coordinates}  other    The other cube coordinate.
   * @param  {Number}  other.x  x part of the other coordinates.
   * @param  {Number}  other.y  y part of the other coordinates.
   * @param  {Number}  other.z  z part of the other coordinates.
   * @return {Boolean}  Equality between this and other.
   * @memberof Coordinates
   */
  equals ({ x, y, z }) {
    return this.x === x && this.y === y && this.z === z
  }

  /**
   * Get a new instance of coordinates with an offset.
   *
   * @param  {Coordinates}  offset The offset to apply to this cube coordinate.
   * @param  {Number}  offset.x  x part of the offset coordinates.
   * @param  {Number}  offset.y  y part of the offset coordinates.
   * @param  {Number}  offset.z  z part of the offset coordinates.
   * @returns New offseted instance of coordinates.
   * @memberof Coordinates
   */
  offset ({ x, y, z }) {
    const offset = checkCoordinates({ x, y, z })
    return new Coordinates({
      x: this.x + offset.x,
      y: this.y + offset.y,
      z: this.z + offset.z
    })
  }

  /**
   * Generate a set of the 6 neighbouring Coordinates.
   *
   * @return     {Coordinates} Each neighbourg Coordinates.
   * @memberof Coordinates
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
   * Gives a string representation of this Coordinates, using the following format: `${x}_${y}_${z}`.
   * Used as a storage key for the tiles of a Grid.
   *
   * @returns {string} Representation of the coordinates.
   * @memberof Coordinates
   */
  toString () {
    return `${this.x}_${this.y}_${this.z}`
  }

  /**
   * Contruct a coordinate object from its string representation.
   * @see toString()
   *
   * @param      {string}       string  The string representation of the following format: `${x}_${y}_${z}`
   * @return     {Coordinates}  The coordinates object
   */
  static parseCoordinates (string) {
    const elements = string.split('_')
    return new Coordinates({
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
   * for(let coordinates of Coordinates.area({x: 2, y: 2, z: 2})) {
   *   // use coordinates
   * }
   * ```
   *
   * @param  {Object}  dimensions - The dimensions of the wanted area for all the axis.
   * @param  {Number}  [dimensions.x=0] - The size of the area along the X axis.
   * @param  {Number}  [dimensions.y=0] - The size of the area along the Y axis.
   * @param  {Number}  [dimensions.z=0] - The size of the area along the Z axis.
   * @param  {Coordinates} [origin={x: 0, y: 0, z: 0}] - The origin coordinate to construct the area from.
   * @return {Coordinates} Set of coordinates covering the area.
   */
  static * area (dimensions, origin = { x: 0, y: 0, z: 0 }) {
    const _origin = new Coordinates(origin)
    let x = 0
    do {
      const xOffset = _origin.offset({ x })
      let y = 0
      do {
        const yOffset = xOffset.offset({ y })
        let z = 0
        do {
          const zOffset = yOffset.offset({ z })
          yield zOffset
          z = z + Math.sign(dimensions.z - 0)
        } while (z !== (dimensions.z || 0))
        y = y + Math.sign(dimensions.y - 0)
      } while (y !== (dimensions.y || 0))
      x = x + Math.sign(dimensions.x - 0)
    } while (x !== (dimensions.x || 0))
  }
}

export default Coordinates
