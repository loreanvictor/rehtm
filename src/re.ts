import { build } from './build'
import { extend, domFactory } from './factory'
import { functionalEventListenerExt, objectPropsExt, refExt } from './extensions'


export const re = (document: Document) => {
  return (document as any).__rehtm_tags__ ??= build(
    extend(domFactory(document),
      functionalEventListenerExt,
      objectPropsExt,
      refExt
    )
  )
}
