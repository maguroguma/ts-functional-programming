import { empty, cons, foldr } from '@/src/algebraticDataType'

describe('foldr', () => {
  test('sum', () => {
    const alist = cons(1, cons(2, cons(3, cons(4, cons(5, empty())))))
    const actual = foldr(alist)(0)((n: number) => (m: number) => n + m)
    const expected = 15
    expect(actual).toBe(expected)
  })

  test('length', () => {
    const alist = cons(1, cons(2, cons(3, cons(4, cons(5, empty())))))
    const actual = foldr(alist)(0)((_) => (m: number) => 1 + m)
    const expected = 5
    expect(actual).toBe(expected)
  })

  test('product', () => {
    const alist = cons(1, cons(2, cons(3, cons(4, cons(5, empty())))))
    const actual = foldr(alist)(1)((n: number) => (m: number) => n * m)
    const expected = 120
    expect(actual).toBe(expected)
  })
})
