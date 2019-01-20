import 'normalize-css'
import * as PIXI from 'pixi.js'

import PixiHexa from 'pixi-hexa'

const application = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  autoResize: true,
  resolution: devicePixelRatio
})

document.body.appendChild(application.view)

const background = PixiHexa.GridUtil.createParallelogram({ x: 5, y: 10 }, { fillColor: '0x777777' })
const backgroundHexagonContainer = new PixiHexa.HexagonContainer(PixiHexa.Orientation.FLAT_TOP, background, { interactive: true })

const blues = new PixiHexa.Grid()
const blueHexagonContainer = new PixiHexa.HexagonContainer(PixiHexa.Orientation.FLAT_TOP, blues)

const reds = new PixiHexa.Grid()
const redHexagonContainer = new PixiHexa.HexagonContainer(PixiHexa.Orientation.FLAT_TOP, reds)

backgroundHexagonContainer.on('hexagonClicked', (event, hexagon) => {
  console.log('background hexagonContainer, hexagon clicked', event)
  blues.add(new PixiHexa.Hexagon(hexagon.coordinates, { fillColor: '0x0000ff' }))
})

const gameBoard = new PIXI.Container()
application.stage.addChild(gameBoard)
gameBoard.position.x = 50
gameBoard.position.y = 50

gameBoard.addChild(backgroundHexagonContainer)
gameBoard.addChild(blueHexagonContainer)
gameBoard.addChild(redHexagonContainer)
// gameBoard.addChild(interactionHexagonContainer)

blues.add(new PixiHexa.Hexagon({ x: 0, y: 0, z: 0 }, { fillColor: '0x0000ff' }))
reds.add(new PixiHexa.Hexagon({ x: 4, y: 9 }, { fillColor: '0xff0000' }))

let removeds

function removeSoon () {
  removeds = background.remove({ x: 1, y: 1, z: -2 })
  setTimeout(addSoon, 1000)
}

function addSoon () {
  background.add(removeds[0])
  setTimeout(removeSoon, 1000)
}

removeSoon()

export default application
