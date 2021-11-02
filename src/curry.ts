export const multipleOf = (n: number) => (m: number) => m % n === 0

// 2の倍数かどうかを判定する関数
export const twoFold = multipleOf(2)

const exponential =
  (base: number) =>
  (index: number): number =>
    index === 0 ? 1 : base * exponential(base)(index - 1)

const flip = (fun: (x: number) => (y: number) => number) => {
  return (x: number) => (y: number) => fun(y)(x)
}

export const square = flip(exponential)(2)
export const cube = flip(exponential)(3)
