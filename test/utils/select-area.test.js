import CubeCoordinates from '../../src/cube-coordinates'
import selectArea from '../../src/utils/select-area'

function executeTest (testCase) {
  it('for a ' + testCase.name, () => {
    const iterator = selectArea(testCase.area, testCase.origin)
    expect(iterator).not.toEqual(null)
    let index = 0
    for (let coordinate of iterator) {
      const expected = CubeCoordinates.parseCoordinates(testCase.expecteds[index])
      expect(coordinate.toString()).toEqual(expected.toString())
      index++
    }
  })
}

describe('select-area', () => {
  executeTest({
    name: 'empty area',
    area: { x: 0, y: 0, z: 0 },
    expecteds: []
  })

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

  executeTest({
    name: '2,2,2 area, y=5 origin', // translate: -5 5 0
    expecteds: [
      '-5_5_0',
      '-6_6_0',
      '-4_5_-1',
      '-5_6_-1',
      '-5_4_1',
      '-6_5_1',
      '-4_4_0'
    ],
    area: { x: 2, y: 2, z: 2 },
    origin: { x: 0, y: 5, z: 0 }
  })
})
