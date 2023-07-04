import { build } from './build'
import { extend, domFactory } from './factory'
import { functionalEventListenerExt, objectPropsExt, refExt } from './extensions'
import { BuildSuite } from './types'


export const re: (document: Document) => BuildSuite = (document: Document) => {
  return (document as any).__rehtm_tags__ ??= build(
    extend(domFactory(document),
      objectPropsExt,
      functionalEventListenerExt,
      refExt
    )
  )
}
