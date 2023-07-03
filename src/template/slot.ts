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

export function locate(slot: Slot, host: Node | Node[] | NodeList, document: Document) {
  const address = slot.address!
  const first = (
    (host instanceof document.defaultView!.NodeList || Array.isArray(host)) ?
      host[address[0]!]
      : host.childNodes[address[0]!]
  )!
  let node = first
  const matched: number[] = [address[0]!]

  for (let i = 1; i < address.length; i++) {
    const step = address[i]!
    const candidate = node.childNodes[step]

    if (candidate) {
      node = candidate
      matched.push(step)
    } else {
      break
    }
  }

  return { node, matched }
}


const slottedParamSymbol = Symbol()
export type SlottedParam = { [slottedParamSymbol]: typeof slottedParamSymbol, value: unknown, index: number }

export function makeSlottedParam(value: unknown, index: number): SlottedParam {
  return { [slottedParamSymbol]: slottedParamSymbol, value, index }
}

export function isSlottedParam(value: unknown): value is SlottedParam {
  return typeof value === 'object' && (value as SlottedParam)[slottedParamSymbol] === slottedParamSymbol
}
