/**
 * Maybeモナド
 *
 * 「正常な値が入る場合」と「エラーになる場合」の二者択一であることから、
 * 代数的データ構造であるといえる。
 *
 * type MAYBE = just(x) | nothing()
 * MAYBE型は、patternを引数として適用するとMAYBE型を生成する「関数」
 *
 * コンテキスト: 「正常」か「異常」か
 * */

type MAYBE = (pattern: Pattern<number>) => MAYBE

// getOrElseがあるためanyにしているが、getOrElseがなければMAYBEに置換できる、はず
type Pattern<T> = {
  just: (value: T) => any
  nothing: () => any
}

type Transform = (value: number) => MAYBE

// データ型の名前空間
// maybe.just(x)とmaybe.nothing()はMAYBEモナドを生成する
export const maybe = {
  // match: (exp: MAYBE, pattern: Pattern<number>) => exp.call(pattern, pattern),
  match: (exp: MAYBE, pattern: Pattern<number>) => exp(pattern), // callを使わなくてもよいはず
  just:
    (value: number): MAYBE =>
    (pattern: Pattern<number>) =>
      pattern.just(value),
  nothing: (): MAYBE => (pattern: Pattern<number>) => pattern.nothing(),
}

// Maybeモナドの定義
export const MAYBE = {
  unit: (value: number): MAYBE => maybe.just(value),
  flatMap:
    (instanceM: MAYBE) =>
    (transform: Transform): MAYBE =>
      maybe.match(instanceM, {
        just: (value: number) => transform(value), // 正常な値の場合は、transform関数を計算する
        nothing: () => maybe.nothing(), // エラーの場合は、何もしない
      }),
  // ヘルパー関数
  getOrElse: (instanceM: MAYBE) => (alternate: any) =>
    maybe.match(instanceM, {
      just: (value: number) => value,
      nothing: () => alternate,
    }),
}

// 足し算を定義する
// エラー処理が一切含まれない！（パターンマッチが自動でnothingを扱ってくれる）
// 再帰的に呼ばれるため、どこかの階層でnothingになったら以降はすべてnothingで返る
export const add = (maybeA: MAYBE, maybeB: MAYBE) => {
  // 分割すると下のコメントのようになるが、transform(flatMap)が再帰的に動く様子を認識するためには、
  // ワンライナーのほうがわかりやすいかもしれない
  return MAYBE.flatMap(maybeA)((a: number) =>
    MAYBE.flatMap(maybeB)((b: number) => MAYBE.unit(a + b))
  )

  // const innerTransform = (a: number) => (b: number) => MAYBE.unit(a + b)
  // const transform = (a: number) => MAYBE.flatMap(maybeB)(innerTransform(a))
  // return MAYBE.flatMap(maybeA)(transform)
}
