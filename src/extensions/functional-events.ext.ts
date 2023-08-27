import { DOMFactoryExt } from '../factory'


export const functionalEventListenerExt: DOMFactoryExt = {
  attribute(node, name, value, fallback) {
    if (name.startsWith('on') && typeof value === 'function') {
      const eventName = name.slice(2).toLowerCase()
      node.addEventListener(eventName as keyof ElementEventMap, value as EventListener)
      node.removeAttribute(name)
    } else {
      fallback()
    }
  }
}
