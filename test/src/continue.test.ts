import {
  enumFrom,
  find,
  continuesOnSuccess,
  continuesOnFailure,
} from '@/src/thunk'

describe('継続渡し', () => {
  test('find', () => {
    const integers = enumFrom(0)
    const target = 1000
    const actual = find(
      integers,
      (item: number) => item === target,
      continuesOnFailure,
      continuesOnSuccess
    )
    expect(actual).toBe(target)
  })
})
