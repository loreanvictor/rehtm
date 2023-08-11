import { extend, DOMFactoryExt } from './extension'
import { nullFactory } from './null'


export const domFactoryExt: (document: Document) => DOMFactoryExt = (document) => ({
  create: (type, props, children, fallback, self) => {
    if (typeof type === 'string') {
      const node = document.createElement(type)
      if (props) {
        for (const name in props) {
          self.attribute(node, name, props[name], self)
        }
      }
      if (children) {
        for (const child of children) {
          self.append(node, child, self)
        }
      }

      return node
    } else {
      return fallback()
    }
  },

  attribute: (node, name, value, fallback) => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      node.setAttribute(name, value.toString())
    } else {
      fallback()
    }
  },

  append: (node, value, fallback) => {
    if (value instanceof document.defaultView!.Node) {
      node.appendChild(value)

      return value
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      const child = document.createTextNode(value.toString())
      node.appendChild(child)

      return child
    } else {
      return fallback()
    }
  },

  fill: (node, value, fallback) => {
    if (value instanceof document.defaultView!.Node) {
      node.childNodes.forEach((child) => node.removeChild(child))
      node.appendChild(value)
    } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      node.textContent = value.toString()
    } else {
      fallback()
    }
  }
})


export const domFactory = (document = window.document) => extend(nullFactory(document), domFactoryExt(document))
