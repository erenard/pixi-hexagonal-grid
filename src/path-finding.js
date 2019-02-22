import createGraph from 'ngraph.graph'
import path from 'ngraph.path'

class PathFinding {
  constructor () {
    this.graph = createGraph()
  }

  addNode (coordinates, { addLinks, nodeData, linkData } = { addLinks: true }) {
    const key = coordinates.toString()
    this.graph.beginUpdate()
    this.graph.addNode(key, nodeData)
    if (addLinks) {
      for (let neighbourg of coordinates.neighbourgs()) {
        const neighbourgKey = neighbourg.toString()
        if (this.graph.getNode(neighbourgKey)) {
          this.addLink(key, neighbourgKey, linkData)
        }
      }
    }
    this.graph.endUpdate()
  }

  removeNode (coordinates) {
    const key = coordinates.toString()
    if (this.graph.getNode(key)) {
      this.graph.beginUpdate()
      this.graph.removeNode(key)

      this.graph.forEachLinkedNode(key, (linkedNode, link) => {
        this.graph.removeLink(link)
      })
      this.graph.endUpdate()
    }
  }

  addLink (key, linkKey, linkData) {
    this.graph.addLink(key, linkKey, linkData)
  }

  removeLink (key, linkKey) {
    this.graph.removeLink(key, linkKey)
  }

  /**
   * Find a path between two tiles.
   *
   * @param {CubeCoordinates|String} start - Starting cube coordinates or its string representation @see CubeCoordinates.toString().
   * @param {CubeCoordinates|String} end - Ending cube coordinates or its string representation @see CubeCoordinates.toString().
   * @returns {String[]} - An array of the CubeCoordinates string representation.
   * @usage
   * // If you need the Tiles, use:
   * .findPath(startNodeId, endNodeId).map(nodeId => hexagonalGrid.get(nodeId))
   */
  findPath (start, end) {
    const pathFinder = path.aStar(this.graph)
    return pathFinder.find(start.toString(), end.toString()).map(node => node.id)
  }
}

export default PathFinding
