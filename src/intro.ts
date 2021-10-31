export const succ = (n: number) => n + 1

export const prev = (n: number) => n - 1

// x, yは正の整数
export const add = (x: number, y: number): number => {
  if (y < 1) {
    return x
  } else {
    return add(succ(x), prev(y))
  }
}

// 蓄積変数にcount回演算を行う
const times = (
  count: number,
  fun: (n: number, m: number) => number,
  arg: number,
  memo: number
): number => {
  if (count > 1) {
    return times(count - 1, fun, arg, fun(memo, arg))
  } else {
    return fun(memo, arg)
  }
}

export const multiply = (n: number, m: number): number => {
  return times(m, add, n, 0)
}

export const exponential = (n: number, m: number): number => {
  return times(m, multiply, n, 1)
}
