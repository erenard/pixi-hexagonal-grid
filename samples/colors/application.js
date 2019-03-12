/* global PIXI, PixiHexagonalGrid */
const size = 10

// Create a new Grid of flat topped tiles having a 50 pixels radius.
const grid = new PixiHexagonalGrid.Grid(PixiHexagonalGrid.Orientation.FLAT_TOP)

// Enumerate the coordinates of an hexagonal area, each side measuring 'size'.
const area = PixiHexagonalGrid.CubeCoordinates.selectArea({ x: size, y: size, z: size })

function decimalToHexString (number) {
  if (number < 0) {
    number = 0xff + number + 1
  }
  let hexString = number.toString(16)
  if (hexString.length % 2) {
    hexString = '0' + hexString
  }
  return hexString
}

// Fill the grid's area with tiles
grid.fill(area, function (coordinates) {
  // let's use x, y, z as RGB
  const red = decimalToHexString(Math.round((size - coordinates.x) / ((2 * size) / 255)))
  const green = decimalToHexString(Math.round((size - coordinates.y) / ((2 * size) / 255)))
  const blue = decimalToHexString(Math.round((size - coordinates.z) / ((2 * size) / 255)))
  return new PixiHexagonalGrid.Hexagon(coordinates, { fillColor: `0x${red}${green}${blue}` })
})

const application = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true
})
document.body.appendChild(application.view)

const gameBoard = new PIXI.Container()
gameBoard.position.x = window.innerWidth / 2
gameBoard.position.y = window.innerHeight / 2
gameBoard.addChild(grid.displayObject)
application.stage.addChild(gameBoard)
