import { maybe, MAYBE, add } from '@/src/monad/MAYBE'

const JUST_ONE = maybe.just(1)
const JUST_TWO = maybe.just(2)
const JUST_TEN = maybe.just(10)
const NOTHING = maybe.nothing()

describe('MAYBEモナド', () => {
  test('成功パターン', () => {
    const actual = MAYBE.getOrElse(add(JUST_ONE, JUST_TWO))(null)
    expect(actual).toBe(3)
  })
  test('失敗パターン', () => {
    const actual = MAYBE.getOrElse(add(JUST_ONE, NOTHING))(null)
    expect(actual).toBe(null)
  })
  test('やや複雑な成功パターン', () => {
    const result = add(
      JUST_ONE,
      add(add(JUST_TWO, JUST_ONE), add(JUST_ONE, JUST_TEN))
    )
    const actual = MAYBE.getOrElse(result)(null)
    expect(actual).toBe(15)
  })
  test('やや複雑な失敗パターン', () => {
    const result = add(
      JUST_ONE,
      add(add(JUST_TWO, JUST_ONE), add(NOTHING, JUST_TEN))
    )
    const actual = MAYBE.getOrElse(result)(null)
    expect(actual).toBe(null)
  })
})
