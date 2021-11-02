type UnaryFunc = (arg: any) => any

export const compose = (f: UnaryFunc, g: UnaryFunc) => (arg: any) => f(g(arg))

type Predicate = (x: number) => boolean
export const not =
  (p: Predicate): Predicate =>
  (x: number) =>
    !p(x)
