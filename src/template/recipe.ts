import { DOMFactory } from '../factory'
import { WrongAddressError } from './errors'
import { locate, map, Slot } from './slot'


export class Recipe {
  slots: { [key: number]: Slot } = {}
  #closed = false
  readonly template: HTMLTemplateElement

  constructor(readonly factory: DOMFactory) {
    this.template = factory.document.createElement('template')
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

  apply(target: Node | Node[] | NodeList, ...values: unknown[]) {
    Object.entries(this.slots).forEach(([index, slot]) => {
      const { node, matched } = locate(slot, target)
      if (matched.length !== slot.address!.length) {
        if (!slot.attribute && matched.length === slot.address!.length - 1 && node.childNodes.length === 0) {
          this.factory.append(node, values[index], this.factory)
        } else {
          throw new WrongAddressError(slot.address!, matched, target)
        }
      } else {
        if (slot.attribute) {
          this.factory.attribute(node as Element, slot.attribute, values[index], this.factory)
        } else {
          this.factory.fill(node, values[index], this.factory)
        }
      }
    })
  }

  create(...values: unknown[]) {
    const target = this.factory.document.importNode(this.template.content, true)
    this.apply(target, ...values)

    return target
  }
}
