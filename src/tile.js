
class Tile {
  constructor(coordinates = {x: 0, y: 0, z: 0}, displayObject = null) {
    this.coordinates = coordinates
    this.displayObject = displayObject
  }

  applyMatrix (matrix) {
    this.displayObject.position = matrix.apply(this.coordinates)
  }
}

export default Tile
