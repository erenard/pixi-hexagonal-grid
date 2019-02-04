Version 0

- Flat hexagons
- Navigation in 3 directions
    - Axe x => Axe x classic -30deg
    - Axe y => Axe y (type x, y)
    - Axe z => Axe x classic +30deg
- Map datastructure defined by 3 dimensions

# render

Projection matrix, Z could be added
https://stackoverflow.com/questions/673216/skew-matrix-algorithm

http://pixijs.download/release/docs/PIXI.TransformStatic.html

Hexagon => Tile

HexagonalGrid: (called by game)
- tileByCoordinates
- Own and call a PIXI.Container named displayObject
+ graph & path finding
- orientation
- distance
+ matrix for the coordinates system
+ transform coordinates to pixel positions

* System d'initialisation, start an app in 3 lines of code max !
* Split Grid into Grid + PathFinder ?
* Différence Tile / displayobject => addTile / addChild
* Faire marcher Uglify pour le .min.js
* Rename Coordinates to CubeCoordinates
* Mettre le centre au centre

+ Mister Jack
+ Slay
