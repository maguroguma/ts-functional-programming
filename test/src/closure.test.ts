import { compose } from '@/src/combinator'
import { object } from '@/src/closure'

describe('closure', () => {
  test('クロージャによるオブジェクト', () => {
    const obj = object.set('C3P0', 100)(object.empty)
    expect(object.get('C3P0')(obj)).toBe(100)
    expect(object.get('non')(obj)).toBeNull()
    const newObj = object.set('non', 1000)(obj)
    expect(object.get('C3P0')(obj)).toBe(100)
    expect(object.get('non')(obj)).toBeNull()
    expect(object.get('C3P0')(newObj)).toBe(100)
    expect(object.get('non')(newObj)).toBe(1000)
  })

  test('関数合成で一度に2つセットする', () => {
    const obj = compose(
      object.set('C3P0', 100),
      object.set('non', 1000)
    )(object.empty)
    expect(object.get('C3P0')(obj)).toBe(100)
    expect(object.get('non')(obj)).toBe(1000)
  })
})
