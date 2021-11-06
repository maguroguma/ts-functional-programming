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
          // 束縛されたpredicateはこの先も恒久的に利用される
          if (predicate(head)) {
            // 条件に合致する場合はheadを含める
            // 合致する場合は、後尾の再帰filterはあくまで遅延評価されるまでは実行されない
            // つまり、filterの再帰は一旦ストップする
            return stream.cons(
              head,
              () => stream.filter(predicate)(tailThunk()) // tailThunkを評価しているのでStreamが生成される
            )
          } else {
            // 合致しない場合は、再帰filterが即時評価される
            return stream.filter(predicate)(tailThunk())
          }
        },
      }),
  remove:
    (predicate: (x: number) => boolean) =>
    (aStream: Stream<number>): Stream<number> =>
      stream.filter(not(predicate))(aStream),
}

// const multipleOf = (n: number) => (m: number) => n % m === 0
const multipleOf =
  (n: number) =>
  (m: number): boolean => {
    console.log(`${n} / ${m}`)
    return n % m === 0
  }

// sieve: cons(head, {{ headで割り切れる数を除外するStream }})
// 再帰関数sieveは、filterの再帰部分の即時評価がなされない、つまりpredicateがtrueになってから評価される
// 実行の様子:
// filter(x, y): 除数xが束縛されたenumFrom(y)ストリームに対するfilter（で生成されるStream）
// sieve(x, S): ???
// (2, sieve(3, filter(2, 4)))
// (3, sieve(5, filter(3, filter(2, 6))))
// (5, sieve(7, filter(5, filter(3, filter(2, 8)))))
// (7, sieve(11, filter(7, filter(5, filter(3, filter(2, 12))))))
export const sieve = (aStream: Stream<number>): Stream<number> =>
  stream.match(aStream, {
    empty: () => null,
    cons: (head: number, tailThunk: Thunk<number>): Stream<number> =>
      stream.cons(head, () =>
        sieve(
          // headを除数として束縛する
          stream.remove((item: number) => multipleOf(item)(head))(tailThunk()) // headで割り切れる数を除外するStream
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

// 継続による反復処理からの脱出
// break文を使わない中断
export const find = (
  aStream: Stream<number>,
  predicate: (e: number) => boolean,
  continuesOnFailure: Function,
  continuesOnSuccess: Function
): number | null =>
  stream.match(aStream, {
    empty: () => continuesOnSuccess(null),
    cons: (head: number, tailThunk: Thunk<number>) => {
      if (predicate(head)) {
        return continuesOnSuccess(head)
      } else {
        return continuesOnFailure(
          tailThunk(),
          predicate,
          continuesOnFailure,
          continuesOnSuccess
        )
      }
    },
  })
export const continuesOnSuccess = (x: number) => x // identity
export const continuesOnFailure = (
  aStream: Stream<number>,
  predicate: (e: number) => boolean,
  continuesOnRecursion: Function,
  escapesFromRecursion: Function
) => find(aStream, predicate, continuesOnRecursion, escapesFromRecursion)
