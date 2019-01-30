/**
 * Check the validity of an (x, y, z) tuple as hexagonal coordinates.
 * If the tuple is missing one or two elements, it will be completed.
 *
 * @param      {Object}  xyzTuple    (x, y, z) tuple
 * @param      {Number}  xyzTuple.x  x-coordinate
 * @param      {Number}  xyzTuple.y  y-coordinate
 * @param      {Number}  xyzTuple.z  z-coordinate
 * @return     {Object}  The checked or completed (x, y, z) tuple
 */
export default function checkAndComplete ({ x, y, z }) {
  const input = {
    x: x || 0,
    y: y || 0,
    z: z || 0
  }
  if ((input.x + input.y + input.z) === 0) return input
  const simplified = {
    x: (input.x - input.y),
    y: (input.y - input.z),
    z: (input.z - input.x)
  }
  return simplified
}
