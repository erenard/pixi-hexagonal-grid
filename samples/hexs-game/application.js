import 'normalize-css'
import * as PIXI from 'pixi.js'
import PixiHexa from 'pixi-hexa'

const orientation = PixiHexa.Orientation.POINTY_TOP
const distance = 25
const gridSize = { x: 10, y: 10 }

const background = PixiHexa.GridUtil.createGrid(
  { x: 10, y: 0, z: -10 },
  coordinates => {
    const hexagon = new PixiHexa.Hexagon(coordinates, {
      orientation: orientation,
      interactive: true,
      buttonMode: true,
      fillColor: '0x777777',
      radius: 25
    })
    hexagon.displayObject.on('click', event => {
      play(hexagon.coordinates)
    })
    return hexagon
  })
background.orientation = orientation
background.distance = distance

const blues = new PixiHexa.Grid(orientation, distance)

const reds = new PixiHexa.Grid(orientation, distance)

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
let isEnded = false

function play (coordinates) {
  if (coordinates) {
    const player = players[playerTurn]
    player.grid.add(new PixiHexa.Hexagon(coordinates, {
      orientation,
      fillColor: player.color,
      radius: 25
    }))
    isEnded = checkEndGame(player)
  }

  if (isEnded) {
    console.log('game finished')
    return playerTurn
  }

  playerTurn++
  playerTurn %= 2
  showTurnIndicator()
}

function showTurnIndicator () {
  const turnIndicatorCoordinates = { x: gridSize.x - 1, y: -2 }
  background.remove(turnIndicatorCoordinates)
  background.add(new PixiHexa.Hexagon(turnIndicatorCoordinates, {
    orientation,
    fillColor: players[playerTurn].color,
    radius: 25
  }))
}

function checkEndGame (player) {
  // 0: x axis path
  // 1: y axis path
  if (player.name === 'red') {
    for (let y1 = 0; y1 < gridSize.y; y1++) {
      if (player.grid.get({ x: 0, y: y1 })) {
        for (let y2 = 0; y2 < gridSize.y; y2++) {
          if (player.grid.get({ x: gridSize.x - 1, y: y2 })) {
            let path = player.grid.findPath(
              { x: 0, y: y1 },
              { x: gridSize.x - 1, y: y2 }
            )
            if (path && path.length) {
              addPathFinding(path)
              return true
            }
          }
        }
      }
    }
  } else {
    for (let x1 = 0; x1 < gridSize.x; x1++) {
      if (player.grid.get({ x: x1, y: 0 })) {
        for (let x2 = 0; x2 < gridSize.x; x2++) {
          if (player.grid.get({ x: x2, y: gridSize.y - 1 })) {
            let path = player.grid.findPath(
              { x: x1, y: 0 },
              { x: x2, y: gridSize.y - 1 }
            )
            if (path && path.length) {
              addPathFinding(path)
              return true
            }
          }
        }
      }
    }
  }
  return false
}

const foreground = new PIXI.Graphics(false)
function addPathFinding (path) {
  foreground.lineStyle(1, 0xffffff, 1, 0)

  function drawPolygon (points) {
    foreground.drawPolygon(
      background.displayObject.coordinatesToPixels(points)
    )
  }

  drawPolygon(path.map(p => p.coordinates), 0xffaaaa)
}

function initGeometryBackground (gridDisplayObject) {
  const geometryBackGround = new PIXI.Graphics(false)
  geometryBackGround.lineStyle(1, 0xffffff, 1, 0)

  const origin = { x: -1, y: -1 }
  const extremumY = { x: -1, y: gridSize.y }
  const extremumXY = { x: gridSize.x, y: gridSize.y }
  const extremumX = { x: gridSize.x, y: -1 }
  const center = { x: gridSize.x / 2, y: gridSize.y / 2 }

  function drawAndFillPolygon (points, color) {
    geometryBackGround.beginFill(color)
    geometryBackGround.drawPolygon(
      gridDisplayObject.coordinatesToPixels(points)
    )
    geometryBackGround.closePath()
    geometryBackGround.endFill()
  }

  drawAndFillPolygon([origin, extremumY, center], players[0].color)
  drawAndFillPolygon([center, extremumXY, extremumX], players[0].color)
  drawAndFillPolygon([origin, center, extremumX], players[1].color)
  drawAndFillPolygon([center, extremumY, extremumXY], players[1].color)

  return geometryBackGround
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
gameBoard.addChild(initGeometryBackground(background.displayObject))
gameBoard.addChild(background.displayObject)
gameBoard.addChild(blues.displayObject)
gameBoard.addChild(reds.displayObject)
gameBoard.addChild(foreground)

application.stage.addChild(gameBoard)

showTurnIndicator()

export default application
