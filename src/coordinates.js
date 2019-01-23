import { checkAndComplete as checkCoordinates } from './coordinates-utils'

/**
 * The x, y, z coordinates of an hexagon.
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
   * @param {Coordinates} other - The other coordinates to compare.
   * @returns {boolean} The equality of this and other.
   * @memberof Coordinates
   */
  equals (other) {
    return this.x === other.x && this.y === other.y && this.z === other.z
  }

  /**
   * Get a new instance of coordinates with a translation.
   *
   * @param {*} Any - Translation { x, y, z }.
   * @returns New instance of coordinates.
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
   * Get neighbourgs of this coordinates.
   *
   * @readonly
   * @memberof Coordinates
   */
  get neighbourgs () {
    const returned = [
      this.offset({ x: 1 }),
      this.offset({ y: 1 }),
      this.offset({ z: 1 }),
      this.offset({ x: -1 }),
      this.offset({ y: -1 }),
      this.offset({ z: -1 })
    ]
    return returned
  }

  /**
   * Used as a storage key for the hexagon HexagonContainer.
   *
   * @returns {string} Representation of the coordinates.
   * @memberof Coordinates
   */
  toString () {
    return `${this.x}_${this.y}_${this.z}`
  }

  static toString (coordinates) {
    if (typeof coordinates === 'string') {
      return coordinates
    } else if (Coordinates.prototype.isPrototypeOf(coordinates)) {
      return coordinates.toString()
    } else if (coordinates.x && coordinates.y && coordinates.z) {
      return `${coordinates.x}_${coordinates.y}_${coordinates.z}`
    } else {
      return new Coordinates(coordinates).toString()
    }
  }

  static fromString (string) {
    const elements = string.split('_')
    return new Coordinates({ x: elements[0] * 1, y: elements[1] * 1, z: elements[2] * 1 })
  }

  static * area (dimensions, _origin = {x: 0, y: 0, z: 0}) {
    const origin = new Coordinates(_origin)
    let x = 0, y, z
    do {
      const xOffset = origin.offset({x})
      y = 0
      do {
        const yOffset = xOffset.offset({y})
        z = 0
        do {
          const zOffset = yOffset.offset({z})
          yield zOffset
          z = z + Math.sign(dimensions.z - 0)
        } while(z !== (dimensions.z || 0))
        y = y + Math.sign(dimensions.y - 0)
      } while(y !== (dimensions.y || 0))
      x = x + Math.sign(dimensions.x - 0)
    } while(x !== (dimensions.x || 0))
  }

}

export default Coordinates
