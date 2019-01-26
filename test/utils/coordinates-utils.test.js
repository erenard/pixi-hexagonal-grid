/* global it, describe */

import checkCoordinates from '../../src/utils/check-coordinates'

import { expect } from 'chai'

const noMissingDataSet = [
  [{ x: 1, y: 0, z: -1 }, { x: 1, y: 0, z: -1 }],
  [{ x: -1, y: 0, z: 1 }, { x: -1, y: 0, z: 1 }],
  [{ x: -1, y: 1, z: 0 }, { x: -1, y: 1, z: 0 }],
  [{ x: 1, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }],
  [{ x: 0, y: -1, z: 1 }, { x: 0, y: -1, z: 1 }],
  [{ x: 0, y: 1, z: -1 }, { x: 0, y: 1, z: -1 }]
]

const oneMissingDataSet = [
  [{ y: 0, z: -1 }, { x: 1, y: 0, z: -1 }],
  [{ y: 0, z: 1 }, { x: -1, y: 0, z: 1 }],
  [{ x: -1, z: 0 }, { x: -1, y: 1, z: 0 }],
  [{ x: 1, z: 0 }, { x: 1, y: -1, z: 0 }],
  [{ x: 0, y: -1 }, { x: 0, y: -1, z: 1 }],
  [{ x: 0, y: 1 }, { x: 0, y: 1, z: -1 }]
]

const twoMissingDataSet = [
  [{ x: 1 }, { x: 1, y: 0, z: -1 }],
  [{ x: -1 }, { x: -1, y: 0, z: 1 }],
  [{ y: 1 }, { x: -1, y: 1, z: 0 }],
  [{ y: -1 }, { x: 1, y: -1, z: 0 }],
  [{ z: 1 }, { x: 0, y: -1, z: 1 }],
  [{ z: -1 }, { x: 0, y: 1, z: -1 }]
]

function executeTest (dataSet) {
  dataSet.forEach(data => {
    const input = data[0]
    const output = data[1]
    it(`${JSON.stringify(input)} => ${JSON.stringify(output)}`, () => {
      const result = checkCoordinates(input)
      expect(result).to.deep.equal(output)
    })
  })
}

describe('check-coordinates', () => {
  describe('checkCoordinates', () => {
    describe('for no missing element', () => {
      executeTest(noMissingDataSet)
    })
    describe('for one missing element', () => {
      executeTest(oneMissingDataSet)
    })
    describe('for two missing elements', () => {
      executeTest(twoMissingDataSet)
    })
    describe('coordinate validity', () => {
      it('should throw when invalid coordinates are passed', () => {
        const fn = function () { checkCoordinates({ x: 1, y: 1, z: 1 }) }
        expect(fn).to.throw('Invalid coordinates')
      })
      it('should not throw when valid coordinates are passed', () => {
        const fn = function () { checkCoordinates({ x: 1, y: -1, z: 0 }) }
        expect(fn).to.not.throw()
      })
    })
  })
})
