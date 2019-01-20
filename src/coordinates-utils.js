function check ({ x, y, z }) {
  const isXNumber = typeof x === 'number'
  const isYNumber = typeof y === 'number'
  const isZNumber = typeof z === 'number'
  return {
    isXNumber,
    isYNumber,
    isZNumber,
    numberCount: isXNumber + isYNumber + isZNumber
  }
}

export function checkAndComplete ({ x, y, z }) {
  const coordinateState = check({ x, y, z })
  if (coordinateState.numberCount === 3 && verifyCoordinates({ x, y, z })) {
    return { x, y, z }
  } else if (coordinateState.numberCount === 2) {
    return completeOneMissing({ x, y, z }, coordinateState)
  } else if (coordinateState.numberCount === 1) {
    return completeTwoMissing({ x, y, z }, coordinateState)
  } else {
    throw new Error('Invalid coordinates')
  }
}

function verifyCoordinates({ x, y, z }) {
  return x + y + z === 0  
}

function completeTwoMissing ({ x, y, z }, { isXNumber, isYNumber, isZNumber }) {
  if (isXNumber) {
    y = 0
    z = -x
  } else if (isYNumber) {
    x = -y
    z = 0
  } else if (isZNumber) {
    x = 0
    y = -z
  }
  return { x, y, z }
}

function completeOneMissing ({ x, y, z }, { isXNumber, isYNumber, isZNumber }) {
  if (!isXNumber) {
    const _y = y || 0
    const _z = z || 0
    const sum = _y + _z
    x = -1 * sum || 0
  } else if (!isYNumber) {
    const _x = x || 0
    const _z = z || 0
    const sum = _x + _z
    y = -1 * sum || 0
  } else if (!isZNumber) {
    const _x = x || 0
    const _y = y || 0
    const sum = _x + _y
    z = -1 * sum || 0
  }
  return { x, y, z }
}
