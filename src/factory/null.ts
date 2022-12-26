import { DOMFactory } from './types'


// TODO: add better error reporting

export const nullFactory: DOMFactory = {
  create: (type) => { throw new Error(`Can't create element with type ${type}`) },
  attribute: (node, name, value) => { throw new Error(`Can't set attribute ${name} to ${value} on ${node}`) },
  append: (node, value) => { throw new Error(`Can't append ${value} to ${node}`) },
  fill: (node, value) => { throw new Error(`Can't fill ${node} with ${value}`) },
}
