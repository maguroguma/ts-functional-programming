import { add, sum, product, map, compose, length } from '@/src/set'

describe('set', () => {
  test('add', () => {
    expect(add(5, 10)).toBe(15)
  })

  test('sum', () => {
    expect(sum([1, 2, 3, 4])).toBe(10)
  })

  test('product', () => {
    expect(product([1, 2, 3, 4])).toBe(24)
  })

  test('map', () => {
    expect(map((x: number) => x + 1)([1, 3, 5])).toStrictEqual([2, 4, 6])
  })

  test('map(constant)', () => {
    const constant = (any: number) => (_: number) => any // 戻り値の引数はなぜかなくても良い
    expect(map<number, number>(constant(1))([1, 2, 3])).toStrictEqual([1, 1, 1])
    expect(map<number, number>(constant(100))([1, 2, 3])).toStrictEqual([
      100, 100, 100,
    ])
  })

  test('length(by composition)', () => {
    expect(length([5, 4, 3, 2, 1, 0])).toBe(6)
    expect(length([1, (_: any) => 1 + 1])).toBe(2)
  })
})
