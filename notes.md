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

Hexagon:
* Needs a parent (hexagonalDisplayObject), basically (coordinate, displayObject)
* Or need an optionnal displayObject as constructor argument
* The private drawHexagon method needs to go to hexagon-geometry => done

Grid: (called by game)
- hexagonByCoordinates <-- Doublon (hexagons)
- Own and call a GridDisplayObject named displayObject
+ graph & path finding

GridDisplayObject: (called by pixi) <-- Hexagonal Grid ?
- orientation
- distance
- displayObjectByCoordinates <-- Doublon (displayObjects)
+ matrix for the coordinates system
+ transform coordinates to pixel positions

* System d'initialisation, start an app in 3 lines of code max !
* Merge Grid and GirdDisplayObject in HexagonalGrid ?
* Split Grid into Grid + PathFinder ?
* Utiliser une sortie de build Webpack pour le link.
	* Empecher l'embarquement de pixi.js dans cette build.
	* Ajouter une build UMD
