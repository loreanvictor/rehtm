export type SmartSlot = {
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

  get closed() {
    return this.#closed
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
        while (node && node.parentNode && node.parentNode !== this.template) {
          const index = Array.from(node.parentNode.childNodes).indexOf(node as ChildNode)
          slot.address.unshift(index)
          node = node.parentNode
        }
      }
    })
  }

  render(target: Node, ...values: unknown[]) {
    if (!this.#closed) {
      this.finalize()
    }

    Object.entries(this.slots).forEach(([index, slot]) => {
      const node = slot.address!.reduce((n, i) => n.childNodes[i]!, target)
      if (slot.attribute) {
        (node as Element).setAttribute(slot.attribute, String(values[index]))
      } else {
        node.textContent = String(values[index])
      }
    })
  }

  use(...values: unknown[]) {
    const target = document.importNode(this.template.content, true)
    this.render(target, ...values)

    return target
  }
}
