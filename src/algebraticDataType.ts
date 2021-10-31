/**
 * 代数的データ構造のリスト
 * */

type List = Function
type Pattern = {
  empty: () => boolean | null
  cons: (head: number, tail: List) => boolean | number | List
}

export const empty = () => (pattern: Pattern) => pattern.empty()

export const cons = (value: number, list: List) => (pattern: Pattern) =>
  pattern.cons(value, list)

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
