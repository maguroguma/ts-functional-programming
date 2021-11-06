/**
 * 恒等モナド
 * */
type ID = number
export const ID = {
  // 単なるidentity関数と同じ
  unit: (value: number): ID => value,
  // 単なる関数適用と同じ
  // 中身を取り出して、変換関数を適用した後に、再度梱包するイメージ（？）
  flatMap:
    (instanceM: ID) =>
    (transform: (value: number) => ID): ID =>
      transform(instanceM),
}
