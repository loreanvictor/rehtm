import { DOMFactoryExt } from '../factory'


export const objectPropsExt: DOMFactoryExt = {
  attribute(node, name, value, fallback) {
    if (typeof value !== 'number' && typeof value !== 'string' && typeof value !== 'boolean') {
      if ((node as any).setProperty) {
        (node as any).setProperty(name, value)
      } else {
        node[name] = value
      }
    } else {
      fallback()
    }
  }
}
