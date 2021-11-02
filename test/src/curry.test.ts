import { twoFold, square, cube } from '@/src/curry'

describe('カリー化', () => {
  test('basic', () => {
    expect(twoFold(4)).toBeTruthy()
    expect(square(10)).toBe(100)
    expect(cube(10)).toBe(1000)
  })
})
