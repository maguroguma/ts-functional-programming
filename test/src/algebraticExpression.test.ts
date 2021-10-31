import { num, add, mul, calculate } from '@/src/algebraticExpression'

describe('代数的データ構造による数式表現', () => {
  test('値と加算と乗算', () => {
    const expression = add(num(1), mul(num(2), num(3)))
    expect(calculate(expression)).toBe(7)
  })
})
