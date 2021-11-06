import { ID } from '@/src/monad/ID'

const succ = (x: number) => x + 1
const double = (x: number) => x * 2
const compose =
  (f: (x: number) => number, g: (x: number) => number) => (x: number) =>
    f(g(x))

describe('恒等モナド', () => {
  test('unit', () => {
    const actual = ID.unit(1)
    expect(actual).toBe(1)
  })

  test('flatMap', () => {
    const transform = (one: number) => ID.unit(succ(one))
    const actual = ID.flatMap(ID.unit(1))(transform)
    expect(actual).toBe(succ(1))
  })

  test('flatMapと関数合成の類似性', () => {
    const innerTransform = (two: number) => ID.unit(double(two))
    const transform = (one: number) =>
      ID.flatMap(ID.unit(succ(one)))(innerTransform)
    const actual = ID.flatMap(ID.unit(1))(transform)
    expect(actual).toBe(4)
    expect(actual).toBe(compose(double, succ)(1))
  })

  describe('モナド則', () => {
    const instanceM = ID.unit(1)
    const f = (n: number) => ID.unit(n + 1)
    const g = (n: number) => ID.unit(-n)
    test('右単位元則', () => {
      expect(ID.flatMap(instanceM)(ID.unit)).toBe(instanceM)
    })
    test('左単位元則', () => {
      expect(ID.flatMap(ID.unit(100))(f)).toBe(f(100))
    })
    test('結合法則', () => {
      expect(ID.flatMap(ID.flatMap(instanceM)(f))(g)).toBe(
        ID.flatMap(instanceM)((x: number) => ID.flatMap(f(x))(g))
      )
    })
  })
})
