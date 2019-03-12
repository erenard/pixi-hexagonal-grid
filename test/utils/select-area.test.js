/* global it, describe */
import CubeCoordinates from '../../src/cube-coordinates'
import selectArea from '../../src/utils/select-area'

import { expect } from 'chai'

function executeTest (testCase) {
  it('for a ' + testCase.name, () => {
    const iterator = selectArea(testCase.area)
    expect(iterator).to.not.equal(null)
    let index = 0
    for (let coordinate of iterator) {
      const expected = CubeCoordinates.parseCoordinates(testCase.expecteds[index])
      expect(coordinate.toString()).to.equal(expected.toString())
      index++
    }
  })
}

describe('select-area', () => {
  executeTest({
    name: '1,1,1 area',
    area: { x: 1, y: 1, z: 1 },
    expecteds: ['0_0_0']
  })

  executeTest({
    name: '2,1,1 area',
    area: { x: 2, y: 1, z: 1 },
    expecteds: ['0_0_0', '1_0_-1']
  })

  executeTest({
    name: '2,2,2 area',
    expecteds: [
      '0_0_0',
      '-1_1_0',
      '1_0_-1',
      '0_1_-1',
      '0_-1_1',
      '-1_0_1',
      '1_-1_0'
    ],
    area: { x: 2, y: 2, z: 2 }
  })
})
