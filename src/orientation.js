const FLAT_TOP = 'FLAT_TOP'
const POINTY_TOP = 'POINTY_TOP'

export default {
  check (o) {
    if (o !== FLAT_TOP && o !== POINTY_TOP) {
      throw new Error(`Invalid orientation: ${o}`)
    }
  },
  FLAT_TOP,
  POINTY_TOP
}
