/**
 * 代数的データ構造のリスト
 * */

export const empty = () => (pattern) => pattern.empty()

export const cons = (value, list) => (pattern) => pattern.cons(value, list)

const match = (data, pattern) => data(pattern)

export const isEmpty = (alist) =>
  match(alist, {
    empty: () => true,
    cons: (_, __) => false,
  })

export const head = (alist) =>
  match(alist, {
    empty: () => null,
    cons: (head, _) => head,
  })

export const tail = (alist) =>
  match(alist, {
    empty: () => null,
    cons: (_, tail) => tail,
  })
