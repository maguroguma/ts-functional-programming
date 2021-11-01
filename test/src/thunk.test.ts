import { stream, list, enumFrom } from '@/src/thunk'

describe('Thunkによる無限のStream', () => {
  test('1からなる無限のストリーム', () => {
    const ones = stream.cons(1, () => ones)
    const actual = list.toArray(stream.take(ones, 5))
    expect(actual).toStrictEqual([1, 1, 1, 1, 1])
  })

  test('1,2,3...', () => {
    const actual = list.toArray(stream.take(enumFrom(1), 5))
    expect(actual).toStrictEqual([1, 2, 3, 4, 5])
  })
})
