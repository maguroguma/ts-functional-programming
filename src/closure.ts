// 生成されるデータの実体は、クロージャという名の「関数」
type ClosureObject = (queryKey: string) => number | null

// objectモジュール
// データはクロージャが捕捉した変数（引数）に格納されている
export const object = {
  // emptyはそれ自体が空のオブジェクト
  empty: (
    (): ClosureObject => (_: string) =>
      null
  )(),
  // setの引数が束縛され続ける
  set:
    (key: string, value: number) =>
    (obj: ClosureObject) =>
    (queryKey: string) => {
      if (key === queryKey) {
        return value
      } else {
        return object.get(queryKey)(obj)
      }
    },
  get: (key: string) => (obj: ClosureObject) => obj(key),
}
