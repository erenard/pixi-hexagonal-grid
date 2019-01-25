import Coordinates from './coordinates'
import * as PIXI from 'pixi.js'

// TODO Make observable ? -> Dependency  with the matrix
class Tile {
  constructor(coordinates = {x: 0, y: 0, z: 0}, displayObject = new PIXI.DisplayObject()) {
    this.coordinates = new Coordinates(coordinates)
    this.displayObject = displayObject
  }

  applyMatrix (matrix) {
    if (this.displayObject) {
      this.displayObject.position = matrix.apply(this.coordinates)
    }
  }
}

export default Tile
