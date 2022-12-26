import { DOMFactory } from '../factory'
import { locate, map, Slot } from './slot'


export class Recipe {
  slots: { [key: number]: Slot } = {}
  #closed = false
  readonly template: HTMLTemplateElement

  constructor(readonly factory: DOMFactory) {
    this.template = document.createElement('template')
  }

  slot(index: number, node: Node, attribute?: string) {
    if (!this.#closed) {
      this.slots[index] = { node, attribute }
    }
  }

  finalize() {
    this.#closed = true
    Object.values(this.slots).forEach(map)
  }

  apply(target: DocumentFragment | Node[] | NodeList, ...values: unknown[]) {
    Object.entries(this.slots).forEach(([index, slot]) => {
      const node = locate(slot, target)
      if (slot.attribute) {
        this.factory.attribute(node as Element, slot.attribute, values[index], this.factory)
      } else {
        this.factory.fill(node, values[index], this.factory)
      }
    })
  }

  create(...values: unknown[]) {
    const target = document.importNode(this.template.content, true)
    this.apply(target, ...values)

    return target
  }
}
