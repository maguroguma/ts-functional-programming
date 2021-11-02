import { generate } from '@/src/generator'
import { enumFrom, primes } from '@/src/thunk'

describe('generator', () => {
  test('enumFromストリームによるジェネレータ', () => {
    const intGenerator = generate(enumFrom(0))
    expect(intGenerator()).toBe(0)
    expect(intGenerator()).toBe(1)
    expect(intGenerator()).toBe(2)
  })

  test('素数ジェネレータ', () => {
    const primeGenerator = generate(primes)
    expect(primeGenerator()).toBe(2)
    expect(primeGenerator()).toBe(3)
    expect(primeGenerator()).toBe(5)
    expect(primeGenerator()).toBe(7)
    expect(primeGenerator()).toBe(11)
  })
})
