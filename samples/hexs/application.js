/* global PIXI, PixiHexagonalGrid */

const orientation = PixiHexagonalGrid.Orientation.POINTY_TOP
const distance = 25

const background = new PixiHexagonalGrid.Grid(orientation, distance)

background.fill(
  PixiHexagonalGrid.CubeCoordinates.selectArea({ x: 10, y: 1, z: 10 }, { y: 5 }),
  coordinates => {
    const hexagon = new PixiHexagonalGrid.Hexagon(coordinates, {
      orientation: orientation,
      interactive: true,
      buttonMode: true,
      fillColor: '0x777777', // coordinates.toString() === '0_0_0' ? '0xaaaaaa' : '0x777777',
      lineColor: '0x444444',
      radius: distance
    })
    hexagon.displayObject.on('click', event => {
      if (!winPath) {
        play(hexagon.coordinates)
      }
    })
    return hexagon
  })

const blues = new PixiHexagonalGrid.Grid(orientation, distance)

const reds = new PixiHexagonalGrid.Grid(orientation, distance)

const players = [
  {
    name: 'red',
    color: '0xff0000',
    grid: reds
  },
  {
    name: 'blue',
    color: '0x0000ff',
    grid: blues
  }
]

var playerTurn = 0
let winPath = false

function play (coordinates) {
  if (coordinates) {
    const player = players[playerTurn]
    console.log(player.name + ' plays @' + coordinates)
    player.grid.add(new PixiHexagonalGrid.Hexagon(coordinates, {
      interactive: true,
      buttonMode: false,
      orientation,
      fillColor: player.color,
      lineColor: '0x444444',
      radius: 25
    }))
    winPath = findVictoryPath(player)
  }

  if (winPath) {
    addPathFinding(winPath)
  } else {
    playerTurn++
    playerTurn %= 2
    showTurnIndicator()
  }
}

function showTurnIndicator () {
  const turnIndicatorCoordinates = new PixiHexagonalGrid.CubeCoordinates({ x: 7, z: 4 })
  background.remove(turnIndicatorCoordinates)
  background.add(new PixiHexagonalGrid.Hexagon(turnIndicatorCoordinates, {
    orientation,
    fillColor: players[playerTurn].color,
    radius: 25
  }))
}

function findVictoryPath (player) {
  // 0: x axis path
  // 1: y axis path
  if (player.name === 'red') {
    for (let zStart = -5; zStart < 5; zStart++) {
      let startCoordinates = new PixiHexagonalGrid.CubeCoordinates({ x: -5, z: zStart })
      if (player.grid.get(startCoordinates)) {
        for (let zEnd = -5; zEnd < 5; zEnd++) {
          let endCoordinates = new PixiHexagonalGrid.CubeCoordinates({ x: 4, z: zEnd })
          if (player.grid.get(endCoordinates)) {
            let path = player.grid.pathFinding.findPath(
              startCoordinates,
              endCoordinates
            )
            if (path && path.length) {
              return path
            }
          }
        }
      }
    }
  } else {
    for (let xStart = -5; xStart < 5; xStart++) {
      let startCoordinates = new PixiHexagonalGrid.CubeCoordinates({ x: xStart, z: -5 })
      if (player.grid.get(startCoordinates)) {
        for (let xEnd = -5; xEnd < 5; xEnd++) {
          let endCoordinates = new PixiHexagonalGrid.CubeCoordinates({ x: xEnd, z: 4 })
          if (player.grid.get(endCoordinates)) {
            let path = player.grid.pathFinding.findPath(
              startCoordinates,
              endCoordinates
            )
            if (path && path.length) {
              return path
            }
          }
        }
      }
    }
  }
  return false
}

const victoryPathGraphics = new PIXI.Graphics(false)

function addPathFinding (path) {
  victoryPathGraphics.lineStyle(1, 0xffffff, 1, 0)
  function drawPolygon (points) {
    victoryPathGraphics.drawPolygon(
      points.map(point => background.coordinatesToPoint(point))
    )
  }
  drawPolygon(path.map(p => background.get(p).coordinates), 0xffaaaa)
}

function initGeometryBackground (grid) {
  const geometry = new PIXI.Graphics(false)
  geometry.lineStyle(1, 0xffffff, 1, 0)

  const topLeft = new PixiHexagonalGrid.CubeCoordinates({ x: -6, y: -5, z: 11 })
  const bottomLeft = new PixiHexagonalGrid.CubeCoordinates({ y: 6 })
  const bottomRight = new PixiHexagonalGrid.CubeCoordinates({ x: 5, y: 6, z: -11 })
  const topRight = new PixiHexagonalGrid.CubeCoordinates({ y: -5 })
  const center = new PixiHexagonalGrid.CubeCoordinates({ x: 0, y: 0, z: 0 })

  function drawAndFillPolygon (points, color) {
    geometry.beginFill(color)
    const transformedPoints = points
      .map(point => grid.coordinatesToPoint(point))
      .reduce((acc, point) => {
        acc.push(point.x)
        acc.push(point.y)
        return acc
      }, [])
    geometry.drawPolygon(transformedPoints)
    geometry.closePath()
    geometry.endFill()
  }

  drawAndFillPolygon([topLeft, bottomLeft, center], players[0].color)
  drawAndFillPolygon([center, bottomRight, topRight], players[0].color)
  drawAndFillPolygon([topLeft, center, topRight], players[1].color)
  drawAndFillPolygon([center, bottomLeft, bottomRight], players[1].color)

  return geometry
}

const application = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  resolution: devicePixelRatio
})

document.body.appendChild(application.view)

const gameBoard = new PIXI.Container()
gameBoard.position.x = window.innerWidth / 2
gameBoard.position.y = window.innerHeight / 2
gameBoard.addChild(initGeometryBackground(background))
gameBoard.addChild(background.displayObject)
gameBoard.addChild(blues.displayObject)
gameBoard.addChild(reds.displayObject)
gameBoard.addChild(victoryPathGraphics)

application.stage.addChild(gameBoard)

showTurnIndicator()
