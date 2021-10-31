// TODO: テストをする
export const empty = (_: any) => {
  return null
}

export const get = (key: string, obj: Function) => {
  return obj(key)
}

export const set = (key: string, value: number, obj: Function) => {
  return (key2: string) => {
    if (key === key2) {
      return value
    } else {
      return get(key2, obj)
    }
  }
}

// x, yは正の整数
export const add = (x: number, y: number): number => {
  if (y < 1) {
    return x
  } else {
    return add(x + 1, y - 1)
  }
}

// reduceメソッドによるsum関数の定義
export const sum = (array: number[]) => {
  return array.reduce((accumulator, item) => accumulator + item, 0)
}

// reduceメソッドによるproduct関数の定義
export const product = (array: number[]) => {
  return array.reduce((accumulator, item) => accumulator * item, 1)
}

export const map =
  <T, U>(transform: (before: T) => U) =>
  (array: T[]) =>
    array.reduce(
      (accumulator: U[], item: T) => accumulator.concat(transform(item)),
      []
    )

// 関数合成: f(g(x))
export const compose = (f: Function, g: Function) => {
  return <T, U>(arg: T): U => f(g(arg))
}

const constant = (any: any) => (_: any) => any
const alwaysOne = constant(1)
export const length = (array: any[]) => compose(sum, map(alwaysOne))(array)
