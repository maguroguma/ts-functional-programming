import {
  naturals,
  evenStream,
  evenStreamByFilter,
  elemAt,
  all,
  take,
  map,
  enumFrom,
  proposition,
} from '@/src/stream'

describe('stream', () => {
  test('naturals', () => {
    expect(naturals[0]).toBe(1)
    const tail = naturals[1]()
    expect(tail[0]).toBe(2)
    const tailtail = tail[1]()
    expect(tailtail[0]).toBe(3)
  })

  test('evens', () => {
    expect(evenStream[0]).toBe(2)
    expect(evenStream[1]()[0]).toBe(4)
    expect(evenStream[1]()[1]()[0]).toBe(6)
  })

  test('evensByFilter', () => {
    expect(evenStreamByFilter[0]).toBe(2)
    expect(evenStreamByFilter[1]()[0]).toBe(4)
    expect(evenStreamByFilter[1]()[1]()[0]).toBe(6)
  })

  test('elemAt', () => {
    expect(elemAt(3)(evenStreamByFilter)).toBe(6)
    expect(elemAt(100)(naturals)).toBe(100)
  })

  test('property test example', () => {
    const a = map(proposition)(enumFrom(0))
    expect(all(take(100)(a))).toBeTruthy()
  })
})
