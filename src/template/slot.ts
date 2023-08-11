export type Slot = {
  node: Node
  attribute?: string
  address?: number[]
}


export function elementify(slot: Slot) {
  if (slot.node.nodeType === slot.node.TEXT_NODE) {
    const element = slot.node.ownerDocument!.createElement('_')
    slot.node.parentNode?.replaceChild(element, slot.node)
    slot.node = element
  }

  return slot
}


export function address(slot: Slot) {
  if (!slot.address) {
    slot.address = []
    let node = slot.node

    while (node.parentNode) {
      const index = Array.from(node.parentNode.childNodes).indexOf(node as ChildNode)
      slot.address.unshift(index)
      node = node.parentNode
    }
  }

  return slot
}

export function locate(slot: Slot, host: Node | Node[] | NodeList, document: Document) {
  const addr = slot.address!
  const first = (
    (host instanceof document.defaultView!.NodeList || Array.isArray(host)) ?
      host[addr[0]!]
      : host.childNodes[addr[0]!]
  )!
  let node = first
  const matched: number[] = [addr[0]!]

  for (let i = 1; i < addr.length; i++) {
    const step = addr[i]!
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
export type SlottedParam = { [slottedParamSymbol]: typeof slottedParamSymbol, index: number }

export function makeSlottedParam(index: number): SlottedParam {
  return { [slottedParamSymbol]: slottedParamSymbol, index }
}

export function isSlottedParam(value: unknown): value is SlottedParam {
  return typeof value === 'object' && (value as SlottedParam)[slottedParamSymbol] === slottedParamSymbol
}
