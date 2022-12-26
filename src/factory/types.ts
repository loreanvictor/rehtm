export type CreateFn = (
  type: unknown,
  props: Record<string, unknown> | undefined,
  children: unknown[] | undefined,
  self: DOMFactory,
) => Node

export type AttributeFn = (
  node: Element,
  name: string,
  value: unknown,
  self: DOMFactory,
) => void

export type AppendFn = (
  node: Node,
  value: unknown,
  self: DOMFactory,
) => Node

export type FillFn = (
  node: Node,
  value: unknown,
  self: DOMFactory,
) => void

export interface DOMFactory {
  create: CreateFn
  attribute: AttributeFn
  append: AppendFn
  fill: FillFn
}
