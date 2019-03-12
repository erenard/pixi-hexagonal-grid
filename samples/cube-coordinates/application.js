/* global PIXI, PixiHexagonalGrid */

const orientation = PixiHexagonalGrid.Orientation.POINTY_TOP
const distance = 25

const background = new PixiHexagonalGrid.Grid(orientation, distance)

background.fill(
  PixiHexagonalGrid.CubeCoordinates.selectArea({ x: 1, y: 1, z: 1 }, { y: 0 }),
  coordinates => {
    return new PixiHexagonalGrid.Hexagon(coordinates, {
      orientation: orientation,
      fillColor: '0x777777',
      lineColor: '0x444444',
      radius: distance
    })
  })

const application = new PIXI.Application({
  width: 640,
  height: 480
})

document.body.appendChild(application.view)

const gameBoard = new PIXI.Container()
gameBoard.position.x = 640 / 2
gameBoard.position.y = 480 / 2
gameBoard.addChild(background.displayObject)
application.stage.addChild(gameBoard)

const alignGrid = new PIXI.Graphics()
alignGrid.lineStyle(1, 0xff0000)
alignGrid.moveTo(0, 0)
alignGrid.lineTo(640, 480)
alignGrid.moveTo(640, 0)
alignGrid.lineTo(0, 480)
application.stage.addChild(alignGrid)
