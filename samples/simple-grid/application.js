/* global PIXI, PixiHexagonalGrid */
const radius = 50

// Create a new Grid of flat topped tiles having a 50 pixels radius.
const grid = new PixiHexagonalGrid.Grid(PixiHexagonalGrid.Orientation.FLAT_TOP, radius)

// Enumerate the coordinates of a {x: 2, y: 2, z: 2} sized area.
const area = PixiHexagonalGrid.CubeCoordinates.area({ x: 2, y: 2, z: 2 })

// Fill the grid's area with tiles
grid.fill(area, function (coordinates) {
  return new PixiHexagonalGrid.Hexagon(coordinates, { radius: radius, fillColor: '0x55aa55', lineColor: '0x005555' })
})

let removedTile

function removeAndAddSoon () {
  removedTile = grid.remove({ x: 1 })
  setTimeout(addAndRemoveSoon, 1000)
}

function addAndRemoveSoon () {
  grid.add(removedTile)
  setTimeout(removeAndAddSoon, 1000)
}

setTimeout(removeAndAddSoon, 1000)

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
