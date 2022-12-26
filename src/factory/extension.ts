import { DOMFactory } from './types'


export type CreateFnExt = (
  type: unknown,
  props: Record<string, unknown> | undefined,
  children: unknown[] | undefined,
  fallback: (t?: unknown, p?: Record<string, unknown>, c?: unknown[], s?: DOMFactory) => Node,
  self: DOMFactory,
) => Node

export type AttributeFnExt = (
  node: Element,
  name: string,
  value: unknown,
  fallback: (n?: Element, a?: string, v?: unknown, s?: DOMFactory) => void,
  self: DOMFactory,
) => void

export type AppendFnExt = (
  node: Node,
  value: unknown,
  fallback: (n?: Node, v?: unknown, s?: DOMFactory) => Node,
  self: DOMFactory,
) => Node

export type FillFnExt = (
  node: Node,
  value: unknown,
  fallback: (n?: Node, v?: unknown, s?: DOMFactory) => void,
  self: DOMFactory,
) => void

export interface DOMFactoryExt {
  create?: CreateFnExt
  attribute?: AttributeFnExt
  append?: AppendFnExt
  fill?: FillFnExt
}

export function extend(factory: DOMFactory, ...exts: DOMFactoryExt[]): DOMFactory {
  if (exts.length > 1) {
    return exts.reduce((f, ext) => extend(f, ext), factory)
  } else if (exts.length === 0) {
    return factory
  }

  const ext = exts[0]!

  return {
    create: (type, props, children, self) => ext.create ?
      ext.create(type, props, children,
        (t, p, c, s) => factory.create(t ?? type, p ?? props, c ?? children, s ?? self),
        self)
      : factory.create(type, props, children, self),
    attribute: (node, name, value, self) => ext.attribute ?
      ext.attribute(node, name, value,
        (n, a, v, s) => factory.attribute(n ?? node, a ?? name, v ?? value, s ?? self)
        , self)
      : factory.attribute(node, name, value, self),
    append: (node, value, self) => ext.append ?
      ext.append(node, value,
        (n, v, s) => factory.append(n ?? node, v ?? value, s ?? self)
        , self)
      : factory.append(node, value, self),
    fill: (node, value, self) => ext.fill ?
      ext.fill(node, value,
        (n, v, s) => factory.fill(n ?? node, v ?? value, s ?? self)
        , self)
      : factory.fill(node, value, self),
  }
}
