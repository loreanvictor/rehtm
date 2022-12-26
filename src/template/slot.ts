export type Slot = {
  node: Node
  attribute?: string
  address?: number[]
}

export function map(slot: Slot) {
  if (!slot.address) {
    slot.address = []
    let node = slot.node
    while (node.parentNode) {
      const index = Array.from(node.parentNode.childNodes).indexOf(node as ChildNode)
      slot.address.unshift(index)
      node = node.parentNode
    }
  }
}


export class WrongAddressError extends Error {
  constructor(public readonly address: number[], public readonly host: Node | Node[] | NodeList) {
    super(`Address ${address.join('->')} not found on ${host}`)
  }
}


export function locate(slot: Slot, host: DocumentFragment | Node[] | NodeList) {
  const address = slot.address!
  const first = ((host instanceof NodeList || Array.isArray(host)) ? host[address[0]!] : host.childNodes[address[0]!])!

  return address.slice(1).reduce((node: Node, index) => {
    const candidate = node.childNodes[index]

    if (!candidate) {
      throw new WrongAddressError(slot.address!, host)
    }

    return candidate
  }, first)
}


const slottedParamSymbol = Symbol()
export type SlottedParam = { [slottedParamSymbol]: typeof slottedParamSymbol, value: unknown, index: number }

export function makeSlottedParam(value: unknown, index: number): SlottedParam {
  return { [slottedParamSymbol]: slottedParamSymbol, value, index }
}

export function isSlottedParam(value: unknown): value is SlottedParam {
  return typeof value === 'object' && (value as SlottedParam)[slottedParamSymbol] === slottedParamSymbol
}
