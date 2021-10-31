/**
 * 代数的データ構造による数式表現
 */

type Expression = (pattern: Pattern) => any
type Pattern = {
  num: (n: number) => any
  add: (exp1: Expression, exp2: Expression) => any
  mul: (exp1: Expression, exp2: Expression) => any
}

// num, add, mulを1回関数適用したものは、それぞれ数式を表す
// 数式: (pattern) => pattern.Xxx
export const num = (n: number) => (pattern: Pattern) => pattern.num(n)
export const add = (exp1: Expression, exp2: Expression) => (pattern: Pattern) =>
  pattern.add(exp1, exp2)
export const mul = (exp1: Expression, exp2: Expression) => (pattern: Pattern) =>
  pattern.mul(exp1, exp2)

const match = (data: Expression, pattern: Pattern) => data(pattern)

export const calculate = (exp: Expression): number =>
  match(exp, {
    // パターンマッチを実行する
    num: (n: number) => n,
    add: (expL: Expression, expR: Expression) =>
      calculate(expL) + calculate(expR),
    mul: (expL: Expression, expR: Expression) =>
      calculate(expL) * calculate(expR),
  })
