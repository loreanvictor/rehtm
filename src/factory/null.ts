import { DOMFactory } from './types'


export class UnsupportedElementTypeError extends Error {
  constructor(type: unknown) {
    super(`Can't create element with type ${type}`)
  }
}

export class UnsupportedAttributeError extends Error {
  constructor(node: Node, name: string, value: unknown) {
    super(`Can't set attribute ${name} to ${value} on ${node}`)
  }
}

export class UnsupportedAppendError extends Error {
  constructor(node: Node, value: unknown) {
    super(`Can't append ${value} to ${node}`)
  }
}

export class UnsupportedFillError extends Error {
  constructor(node: Node, value: unknown) {
    super(`Can't fill ${node} with ${value}`)
  }
}


export const nullFactory: (document?: Document) => DOMFactory = (document = window.document) => ({
  document,
  create: (type) => { throw new UnsupportedElementTypeError(type) },
  attribute: (node, name, value) => { throw new UnsupportedAttributeError(node, name, value) },
  append: (node, value) => { throw new UnsupportedAppendError(node, value) },
  fill: (node, value) => { throw new UnsupportedFillError(node, value) },
})

