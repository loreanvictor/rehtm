import { DOMFactoryExt } from '../factory'


const refSymbol = Symbol()
export type Ref<T = HTMLElement> = {
  current?: T
  [refSymbol]: typeof refSymbol
}

export const ref = <T extends HTMLElement>(): Ref<T> => ({ [refSymbol]: refSymbol })

export function isRef(param: unknown): param is Ref {
  return typeof param === 'object' && (param as Ref)[refSymbol] === refSymbol
}

export const refExt: DOMFactoryExt = {
  attribute(el, name, value, fallback) {
    if (name === 'ref' && isRef(value)) {
      value.current = el as any
    } else {
      fallback()
    }
  }
}
