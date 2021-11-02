import { Stream, Thunk, stream } from '@/src/thunk'

export const generate = (aStream: Stream<number>) => {
  // ローカル変数にストリームを保持する
  let _stream = aStream
  // ジェネレータ関数を返す
  return () =>
    stream.match(_stream, {
      empty: () => null,
      cons: (head: number, tailThunk: Thunk<number>) => {
        _stream = tailThunk() // 保持しているストリームを後尾で更新
        return head
      },
    })
}
