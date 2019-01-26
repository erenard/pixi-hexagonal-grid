import 'normalize-css'
import * as PIXI from 'pixi.js'
import * as PixiHexa from 'pixi-hexagonal-grid'

const orientation = PixiHexa.Orientation.POINTY_TOP
const distance = 25

const background = new PixiHexa.Grid(orientation, distance)

background.fill(
  PixiHexa.Coordinates.area({ x: 10, y: 0, z: -10 }, { x: -5, y: -5, z: 10 }),
  coordinates => {
    const hexagon = new PixiHexa.Hexagon(coordinates, {
      orientation: orientation,
      interactive: true,
      buttonMode: true,
      fillColor: coordinates.toString() === '0_0_0' ? '0xaaaaaa' : '0x777777',
      lineColor: '0x444444',
      radius: distance
    })
    hexagon.displayObject.on('click', event => {
      play(hexagon.coordinates)
    })
    return hexagon
  })

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
  const turnIndicatorCoordinates = new PixiHexa.Coordinates({ x: 7, y: -5 })
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
    for (let y1 = -5; y1 < 5; y1++) {
      if (player.grid.get({ x: -5, y: y1 })) {
        for (let y2 = -5; y2 < 5; y2++) {
          if (player.grid.get({ x: 4, y: y2 })) {
            let path = player.grid.findPath(
              { x: -5, y: y1 },
              { x: 4, y: y2 }
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
    for (let x1 = -5; x1 < 5; x1++) {
      if (player.grid.get({ x: x1, y: -5 })) {
        for (let x2 = -5; x2 < 5; x2++) {
          if (player.grid.get({ x: x2, y: 4 })) {
            let path = player.grid.findPath(
              { x: x1, y: -5 },
              { x: x2, y: 4 }
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
      points.map(background.coordinatesToPoint)
    )
  }

  drawPolygon(path.map(p => p.coordinates), 0xffaaaa)
}

function initGeometryBackground (grid) {
  const geometryBackGround = new PIXI.Graphics(false)
  geometryBackGround.lineStyle(1, 0xffffff, 1, 0)

  const origin = { x: -5, y: -5 }
  const extremumY = { x: -5, y: 5 }
  const extremumXY = { x: 5, y: 5 }
  const extremumX = { x: 5, y: -5 }
  const center = { x: 5 / 2, y: 5 / 2 }

  function drawAndFillPolygon (points, color) {
    geometryBackGround.beginFill(color)

    geometryBackGround.drawPolygon(
      points.map(point => grid.coordinatesToPoint(point))
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
gameBoard.addChild(initGeometryBackground(background))
gameBoard.addChild(background.displayObject)
gameBoard.addChild(blues.displayObject)
gameBoard.addChild(reds.displayObject)
gameBoard.addChild(foreground)

application.stage.addChild(gameBoard)

showTurnIndicator()

export default application
