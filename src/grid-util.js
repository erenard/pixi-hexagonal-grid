import Grid from './grid'
import Hexagon from './hexagon'
import Coordinates from './coordinates'

/**
 * Grid manipulation utilities.
 *
 * @class GridUtil
 */
class GridUtil {
  /**
   * Create a pseudo hexagonal shaped grid.
   * For pointy topped hexs, X is the horizontal axis.
   * For flat topped hexs, Y is the vertical axis.
   *
   * @static
   * @param {x: Number, y: Number, z: Number} dimensions - The dimensions of the wanted parallelogram.
   * @param {Function} hexagonFactory - A function which given coordiantes, return an hexagon.
   *
   * @memberof Grid
   */
  static createGrid (dimensions, hexagonFactory) {
    const grid = new Grid()
    const origin = new Coordinates({x: 0, y: 0, z: 0})
    let x = 0, y, z
    do {
      const xOffset = origin.offset({x})
      y = 0
      do {
        const yOffset = xOffset.offset({y})
        z = 0
        do {
          const zOffset = yOffset.offset({z})
          const hexagon = grid.get(zOffset)
          if (hexagon) console.log(hexagon.toString())
          else grid.add(hexagonFactory(zOffset))
          z = z + Math.sign(dimensions.z - 0)
        } while(z !== (dimensions.z || 0))
        y = y + Math.sign(dimensions.y - 0)
      } while(y !== (dimensions.y || 0))
      x = x + Math.sign(dimensions.x - 0)
    } while(x !== (dimensions.x || 0))
    return grid
  }

  static createHexagon (radius, hexagonFactory) {
    return GridUtil.createGrid({ x: radius, y: radius, z: radius }, hexagonFactory)
  }
}

export default GridUtil
