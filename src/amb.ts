/**
 * WIP: 非決定性計算機
 * */

import { List } from '@/src/algebraticDataType'

type Expression = (pattern: Pattern) => any
type Pattern = {
  num: (n: number) => any
  add: (exp1: Expression, exp2: Expression) => any
  amb: (alist: List) => (pattern: Pattern) => any
}

export const expression = {
  match: (data: Expression, pattern: Pattern) => data(pattern),
  num: (n: number) => (pattern: Pattern) => pattern.num(n),
  add: (exp1: Expression, exp2: Expression) => (pattern: Pattern) =>
    pattern.add(exp1, exp2),
  amb: (alist: List) => (pattern: Pattern) => pattern.amb(alist),
}

// 非決定性計算では継続渡しを用いる
// export const calculate = (
//   exp: Expression,
//   continuesOnSuccess: Function,
//   continuesOnFailure: Function
// ): number =>
//   expression.match(exp, {
//     // パターンマッチを実行する
//     num: (n: number) => n,
//     add: (expL: Expression, expR: Expression) =>
//       calculate(expL) + calculate(expR),
//     amb: (choices) => {},
//   })
