import CubeCoordinates from '../cube-coordinates'

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
 * @return {Array<CubeCoordinates>} Set of coordinates covering the area.
 */
export default function selectArea (
  dimensions = { x: 1, y: 1, z: 1 },
  origin = { x: 0, y: 0, z: 0 }
) {
  if (dimensions.x * dimensions.y * dimensions.z === 0) return []
  const coordinates = new Map()
  for (let x = 0; x < dimensions.x; x++) {
    for (let y = 0; y < dimensions.y; y++) {
      const coordinate = new CubeCoordinates({ x, y })
      coordinates.set(coordinate.toString(), coordinate)
    }
  }
  for (let y = 0; y < dimensions.y; y++) {
    for (let z = 0; z < dimensions.z; z++) {
      const coordinate = new CubeCoordinates({ y, z })
      coordinates.set(coordinate.toString(), coordinate)
    }
  }
  for (let z = 0; z < dimensions.z; z++) {
    for (let x = 0; x < dimensions.x; x++) {
      const coordinate = new CubeCoordinates({ x, z })
      coordinates.set(coordinate.toString(), coordinate)
    }
  }
  return coordinates.values()
}
