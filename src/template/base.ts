type SmartSlot = {
  node: Node
  attribute?: string
  address?: number[]
}

export class SmartTemplate {
  slots: { [key: number]: SmartSlot } = {}
  #closed = false
  readonly template: HTMLTemplateElement

  constructor() {
    this.template = document.createElement('template')
  }

  slot(index: number, node: Node, attribute?: string) {
    if (!this.#closed) {
      this.slots[index] = { node, attribute }
    }
  }

  finalize() {
    this.#closed = true
    Object.values(this.slots).forEach((slot) => {
      if (!slot.address) {
        slot.address = []
        let node = slot.node
        while (node.parentNode) {
          const index = Array.from(node.parentNode.childNodes).indexOf(node as ChildNode)
          slot.address.unshift(index)
          node = node.parentNode
        }
      }
    })
  }

  apply(target: Node, ...values: unknown[]) {
    Object.entries(this.slots).forEach(([index, slot]) => {
      const node = slot.address!.reduce((n, i) => n.childNodes[i]!, target)
      if (slot.attribute) {
        // TODO: use processor
        (node as Element).setAttribute(slot.attribute, String(values[index]))
      } else {
        // TODO: use processor
        node.textContent = String(values[index])
      }
    })
  }

  create(...values: unknown[]) {
    const target = document.importNode(this.template.content, true)
    this.apply(target, ...values)

    return target
  }
}
