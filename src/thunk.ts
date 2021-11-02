import { not } from '@/src/combinator'

export type Stream<T> = (pattern: Pattern<T>) => any
export type Pattern<T> = {
  empty: () => any
  cons: (head: T, tail: Thunk<T>) => any
}
export type Thunk<T> = () => Stream<T>

export const stream = {
  match: (data: Stream<number>, pattern: Pattern<number>) => data(pattern),
  empty: () => (pattern: Pattern<number>) => pattern.empty(),
  cons:
    (head: number, tailThunk: Thunk<number>) => (pattern: Pattern<number>) =>
      pattern.cons(head, tailThunk),
  head: (aStream: Stream<number>) =>
    stream.match(aStream, {
      empty: () => null,
      cons: (value: number, _: Thunk<number>): number => value,
    }),
  tail: (aStream: Stream<number>) =>
    stream.match(aStream, {
      empty: () => null,
      cons: (_: number, tailThunk: Thunk<number>): Stream<number> =>
        tailThunk(),
    }),
  take: (aStream: Stream<number>, n: number): List<number> =>
    stream.match(aStream, {
      empty: () => list.empty(),
      cons: (head: number, tailThunk: Thunk<number>) => {
        if (n === 0) {
          return list.empty()
        } else {
          return list.cons(head, stream.take(tailThunk(), n - 1))
        }
      },
    }),
  filter:
    (predicate: (x: number) => boolean) =>
    (aStream: Stream<number>): Stream<number> =>
      stream.match(aStream, {
        empty: () => stream.empty(),
        cons: (head: number, tailThunk: Thunk<number>) => {
          if (predicate(head)) {
            // 条件に合致する場合はheadを含める
            return stream.cons(head, () =>
              stream.filter(predicate)(tailThunk())
            )
          } else {
            return stream.filter(predicate)(tailThunk())
          }
        },
      }),
  remove:
    (predicate: (x: number) => boolean) =>
    (aStream: Stream<number>): Stream<number> =>
      stream.filter(not(predicate))(aStream),
}

const multipleOf = (n: number) => (m: number) => n % m === 0

// sieveで生成されるStreamの後尾は、関数適用時にさらにsieveでStreamを生成する
// 後続のsieveはheadを束縛している
export const sieve = (aStream: Stream<number>): Stream<number> =>
  stream.match(aStream, {
    empty: () => null,
    cons: (head: number, tailThunk: Thunk<number>): Stream<number> =>
      stream.cons(head, () =>
        sieve(
          stream.remove((item: number) => multipleOf(item)(head))(tailThunk())
        )
      ),
  })

type List<T> = (pattern: Pattern<T>) => any
type ListPattern<T> = {
  empty: () => any
  cons: (head: T, tail: List<T>) => any
}

export const list = {
  match: (data: List<number>, pattern: ListPattern<number>) => data(pattern),
  empty: () => (pattern: ListPattern<number>) => pattern.empty(),
  cons: (head: number, tail: List<number>) => (pattern: ListPattern<number>) =>
    pattern.cons(head, tail),
  toArray: (alist: List<number>) => {
    const toArrayHelper = (
      alist: List<number>,
      accumulator: number[]
    ): number[] =>
      list.match(alist, {
        empty: () => accumulator,
        cons: (head: number, tail: List<number>) =>
          toArrayHelper(tail, accumulator.concat(head)),
      })
    return toArrayHelper(alist, [])
  },
}

export const enumFrom = (n: number): Stream<number> =>
  stream.cons(n, () => enumFrom(n + 1))

export const primes = sieve(enumFrom(2))
