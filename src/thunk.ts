type Stream<T> = (pattern: Pattern<T>) => any
type Pattern<T> = {
  empty: () => any
  cons: (head: T, tail: Thunk<T>) => any
}
type Thunk<T> = () => Stream<T>

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
}

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
