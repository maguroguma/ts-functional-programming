import { empty, cons, isEmpty, head, tail } from '@/src/algebraticDataType'

describe('代数的データ構造', () => {
  test('リスト', () => {
    expect(isEmpty(empty())).toBeTruthy()
    expect(isEmpty(cons(1, empty()))).toBeFalsy()
    expect(head(cons(1, empty()))).toBe(1)
    expect(head(tail(cons(1, cons(2, empty()))))).toBe(2)
  })
})
