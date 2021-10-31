import { succ, prev, multiply, exponential } from '@/src/intro'

describe('succ', () => {
  test('0 -> 1', () => {
    expect(succ(0)).toBe(1)
  })

  test('1 -> 0', () => {
    expect(prev(1)).toBe(0)
  })

  test('7 * 5', () => {
    expect(multiply(7, 5)).toBe(35)
  })

  test('2の10乗', () => {
    expect(exponential(2, 10)).toBe(1024)
  })
})
