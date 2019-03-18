/* global PIXI, PixiHexagonalGrid */

// PIXI loader needed
var texture = PIXI.Texture.fromImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAlCAYAAABcZvm2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNrsV8sNwjAMbUqBBWACxB2pQ8AKcGALTsAJuDEFB1gBhuDAuWICmICPQh01pXWdJqEFcaglRGRbfonjPLuMc+5QwhjLGEJfZusjxZOL9akZKye9G98vPMfvsAx4qBfKwfzBL9s6uUHpI6U/u7+BKGkNb/H6umtk7MczF0HyfKS4zo/k/4AgTV8DOizrqX8oECgC+MGa8lGJp9sJDiAB8nyqYoglvJOPbP97IqoATGxWVZeXJlMQwYHA3piF8wJIblOVNBBxe3TPMLoHIKtxrbS7AAbBrA4Y5NaPAXf8LjN6wKZ0RaZOnlAFZnuXInVR4FTE6eYp0olPhhshtXsAwY3PquoAJNkIY33U7HTs7hYBwV24ItUKqDwgKF3VzAZ6k8HF+B1BMF8xRJbeJoqMXHZAAQ1kwoluURCdzepEugGEImBrIADB7I4lyfbJLlw92FKE6b5hVd+ktv4vAQYASMWxvlAAvcsAAAAASUVORK5CYII=')

function createBoard (size = 5) {
  // Enumerate the coordinates of an hexagonal area, each side measuring 'size'.
  const area = PixiHexagonalGrid.CubeCoordinates.selectArea({ x: size, y: size, z: size })
  // Create a new Grid of flat topped tiles having a 50 pixels radius.
  const grid = new PixiHexagonalGrid.Grid(PixiHexagonalGrid.Orientation.FLAT_TOP)
  // Fill the grid's area with tiles
  grid.fill(area, function (coordinates) {
    const hexagon = new PixiHexagonalGrid.Hexagon(coordinates, {
      interactive: true,
      texture: texture,
      fillColor: 0xaaaaaa,
      radius: 25
    })
    hexagon.displayObject.on('click', function (event) {
      handleTileClick(hexagon, event)
    })
    return hexagon
  })
  return grid
}

function createApplication (grid) {
  const application = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    autoResize: true
  })
  document.body.appendChild(application.view)
  return application
}

function createPathGraphics (board, tiles) {
  const pathGraphics = new PIXI.Graphics(false)
  pathGraphics.lineStyle(1, 0xffffff, 1, 0)
  pathGraphics.drawPolygon(
    tiles.map(
      tile => board.coordinatesToPoint(tile.coordinates)
    ),
    0xffaaaa
  )
  return pathGraphics
}

function PathFindingSample (boardSize = 5) {
  this.boardSize = boardSize
  this.application = createApplication()
  this.board = createBoard(this.boardSize)
  this.container = new PIXI.Container()
  this.container.addChild(this.board.displayObject)
  this.container.position.x = window.innerWidth / 2
  this.container.position.y = window.innerHeight / 2
  this.application.stage.addChild(this.container)
}

PathFindingSample.prototype.start = function () {
  this.startTile = this.board.get(new PixiHexagonalGrid.CubeCoordinates({ y: 1 - this.boardSize }))
  this.endTile = this.board.get(new PixiHexagonalGrid.CubeCoordinates({ y: this.boardSize - 1 }))
  this.path = this.board.findPath(this.startTile, this.endTile)
  const pathGraphics = createPathGraphics(this.board, this.path)
  this.container.addChild(pathGraphics)
}

function handleTileClick (hexagon, event) {
  console.log(hexagon.toString(), event)
  // Change color
  hexagon.setDisplayObject()
  // Toggle path
}

const pathFindingSample = new PathFindingSample()

pathFindingSample.start()
