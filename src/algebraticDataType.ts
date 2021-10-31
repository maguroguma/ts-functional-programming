/**
 * 代数的データ構造によるリスト表現
 * */

// Listはpatternオブジェクトを引数に取る関数
// (pattern) => pattern.Xxx
type List = (pattern: Pattern) => any

type Pattern = {
  empty: () => any
  cons: (head: number, tail: List) => any
}

// empty()の戻り値が空のリスト
export const empty = () => (pattern: Pattern) => pattern.empty()

// cons(value, list)の戻り値が空でないリスト
export const cons = (value: number, list: List) => (pattern: Pattern) =>
  pattern.cons(value, list)

// 関数で表されたリストに対してpatternオブジェクトを適用する
// パターンマッチによって、空 or 非空のリストそれぞれのメソッドが自動的に実行される
// パターンマッチはif文やswitch文の条件分岐に相当する
const match = (data: List, pattern: Pattern) => data(pattern)

export const isEmpty = (alist: List) =>
  match(alist, {
    empty: () => true,
    cons: (_, __) => false,
  })

export const head = (alist: List) =>
  match(alist, {
    empty: () => null,
    cons: (head, _) => head,
  })

export const tail = (alist: List) =>
  match(alist, {
    empty: () => null,
    cons: (_, tail) => tail,
  })

// 再帰によるmap
export const map = (alist: List, transform: (x: number) => number): List =>
  match(alist, {
    empty: () => empty(), // 終了条件
    cons: (head: number, tail: List) =>
      cons(transform(head), map(tail, transform)),
  })

export const toArray = (alist: List): number[] => {
  const toArrayHelper = (alist: List, accumulator: number[]): number[] =>
    match(alist, {
      empty: () => accumulator, // 空のリストの場合は終了
      cons: (head, tail) => toArrayHelper(tail, accumulator.concat(head)),
    })
  return toArrayHelper(alist, [])
}

// 複利計算を再帰で行う
// 再帰では常に蓄積変数の存在を意識したいが、
// 再帰関数の出力値が蓄積変数として機能するケースもある
// 再帰はfor文の反復処理に相当する
export const compoundInterest = (
  init: number,
  rate: number,
  year: number
): number => {
  if (year === 0) {
    return init
  } else {
    return compoundInterest(init, rate, year - 1) * (1 + rate)
  }
}
