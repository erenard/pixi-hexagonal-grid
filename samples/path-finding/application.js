/* global PIXI, PixiHexagonalGrid */

function createBoard (size = 5) {
  // Enumerate the coordinates of an hexagonal area, each side measuring 'size'.
  const area = PixiHexagonalGrid.CubeCoordinates.area({ x: size, y: size, z: size })
  // Create a new Grid of flat topped tiles having a 50 pixels radius.
  const grid = new PixiHexagonalGrid.Grid(PixiHexagonalGrid.Orientation.FLAT_TOP)
  // Fill the grid's area with tiles
  grid.fill(area, function (coordinates) {
    return new PixiHexagonalGrid.Hexagon(coordinates)
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

const pathFindingSample = new PathFindingSample()

pathFindingSample.start()
