Version 0

- Flat hexagons
- Navigation in 3 directions
    - Axe x => Axe x classic -30deg
    - Axe y => Axe y (type x, y)
    - Axe z => Axe x classic +30deg
- Map datastructure defined by 3 dimensions

# render

regular hexagon 6x60 deg

Projection matrix, Z could be added
https://stackoverflow.com/questions/673216/skew-matrix-algorithm

http://pixijs.download/release/docs/PIXI.TransformStatic.html

Merge Hexagon-container and grid into hexagon-grid.

Grid: (called by game)
- graph & path finding
- hexagonByCoordinates
- pilot the GridDisplayObject
- displayObject <-- getter

GridDisplayObject: (called by pixi) <-- Hexagonal Grid ?
- orientation
- options
- displayObjectByCoordinates <-- A garder ?

* Vertical Hexs.
* System d'initialisation
