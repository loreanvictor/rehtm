import htm from 'htm/mini'

import { SmartTemplate } from './base'


const slot = Symbol()
type SlottedParam = { slot: typeof slot, value: unknown, index: number }

const isSlottedParam = (value: unknown): value is SlottedParam => {
  return typeof value === 'object' && (value as any)?.slot === slot
}

export function build() {
  const ctx: SmartTemplate[] = []

  const template = htm.bind((type: unknown, props?: Record<string, unknown>, ...children: unknown[]) => {
    const el = document.createElement(type as string)
    const host = ctx[ctx.length - 1]!

    props && Object.entries(props).forEach(([key, prop]) => {
      if (isSlottedParam(prop)) {
        host.slot(prop.index, el, key)
        // TODO: use processor
        el.setAttribute(key, String(prop.value))
      } else {
        // TODO: use processor
        el.setAttribute(key, String(prop))
      }
    })

    children.forEach((child) => {
      if (child instanceof Node) {
        el.appendChild(child)
      } else {
        // TODO: use processor
        const ch = document.createTextNode('')
        el.appendChild(ch)

        if (isSlottedParam(child)) {
          host.slot(child.index, ch)
          ch.textContent = String(child.value)
        } else {
          ch.textContent = String(child)
        }
      }
    })

    return el
  })

  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const host = new SmartTemplate()
    ctx.push(host)
    const result = template(strings, ...values.map((value, index) => ({slot, value, index})))
    ctx.pop()

    if (Array.isArray(result)) {
      result.forEach((node) => host.template.content.appendChild(node))
    } else {
      host.template.content.appendChild(result)
    }

    host.finalize()

    return host
  }
}
