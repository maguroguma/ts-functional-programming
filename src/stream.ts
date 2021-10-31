import { succ } from '@/src/intro'

// ストリームは後尾が関数で表現される2要素の配列（タプル？）
// type Stream = [number, Function]
type Stream<T> = [T, Function]

// 先頭と後尾で分けて考える、後尾は遅延評価
const iterate =
  (init: number) =>
  (step: (before: number) => number): Stream<number> =>
    [init, (_: any) => iterate(step(init))(step)]

export const enumFrom = (n: number) => iterate(n)(succ)
export const naturals = enumFrom(1)
const twoStep = (n: number) => n + 2
export const evenStream = iterate(2)(twoStep)

// ストリームのfilter関数
const filter =
  (predicate: (x: number) => boolean) =>
  (aStream: Stream<number>): Stream<number> => {
    const head = aStream[0]
    if (predicate(head) === true) {
      // 先頭要素が条件に合致する場合
      return [head, (_: number) => filter(predicate)(aStream[1]())]
    } else {
      return filter(predicate)(aStream[1]())
    }
  }

export const evenStreamByFilter = filter((n) => n % 2 === 0)(naturals)

// ストリームのelemAt関数
export const elemAt =
  (n: number) =>
  (aStream: Stream<number>): number => {
    if (n === 1) {
      return aStream[0]
    } else {
      return elemAt(n - 1)(aStream[1]())
    }
  }

// ストリームのmap関数
export const map =
  <U>(transform: (x: number) => U) =>
  (aStream: Stream<number>): Stream<U> => {
    const head = aStream[0]
    return [transform(head), () => map(transform)(aStream[1]())]
  }

// ストリームの先頭から引数n個分だけ取り出すtake関数
export const take =
  (n: number) =>
  <T>(aStream: Stream<T>): Stream<T> | null => {
    if (n === 0) {
      return null
    } else {
      return [aStream[0], () => take(n - 1)(aStream[1]())]
    }
  }

// ストリームのすべての要素がtrueであるかを判定するall関数
export const all = <T>(aStream: Stream<T> | null) => {
  const allHelper = (
    aStream: Stream<T> | null,
    accumulator: boolean
  ): boolean => {
    if (!aStream) {
      return accumulator
    }
    const head = aStream[0]
    const newAccumulator = accumulator && Boolean(head)
    if (aStream[1]() === null) {
      return newAccumulator
    } else {
      return allHelper(aStream[1](), newAccumulator)
    }
  }
  return allHelper(aStream, true)
}

// 検証の対象となる命題
export const proposition = (n: number): boolean =>
  succ(0) + succ(n) === succ(succ(n))
