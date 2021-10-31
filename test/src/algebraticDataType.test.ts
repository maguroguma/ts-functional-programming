import {
  empty,
  cons,
  isEmpty,
  head,
  tail,
  map,
  toArray,
  compoundInterest,
} from '@/src/algebraticDataType'

describe('代数的データ構造 - リスト', () => {
  test('基本', () => {
    expect(isEmpty(empty())).toBeTruthy()
    expect(isEmpty(cons(1, empty()))).toBeFalsy()
    expect(head(cons(1, empty()))).toBe(1)
    expect(head(tail(cons(1, cons(2, empty()))))).toBe(2)
  })

  test('map, toArray', () => {
    const list = cons(1, cons(2, cons(3, empty())))
    const arr = toArray(map(list, (x: number) => 100 * x))
    expect(arr).toStrictEqual([100, 200, 300])
  })

  test('複利', () => {
    expect(compoundInterest(100000, 0.02, 2)).toBe(104040)
  })
})
