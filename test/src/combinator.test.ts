import { compose } from '@/src/combinator'
import { cons, empty, sum, curriedMap } from '@/src/algebraticDataType'

describe('function combinator', () => {
  test('mapとsumでlength', () => {
    const alwaysOne = (_: number) => 1
    const alist = cons(5, cons(5, cons(5, empty())))
    const length = compose(sum, curriedMap(alist))(alwaysOne)
    expect(length).toBe(3)
  })
})
