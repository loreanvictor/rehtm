import { build } from './build'
import { extend, domFactory, DOMFactory } from './factory'
import { functionalEventListenerExt, objectPropsExt, refExt } from './extensions'
import { BuildSuite } from './types'


export const stdFactory = (document: Document): DOMFactory => extend(
  domFactory(document),
  objectPropsExt,
  functionalEventListenerExt,
  refExt
)


export const re: (document: Document) => BuildSuite = (document: Document) => {
  return (document as any).__rehtm_tags__ ??= build(stdFactory(document))
}
