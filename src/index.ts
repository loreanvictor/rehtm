export { build as buildTemplate, Recipe as SmartTemplate } from './template'
export * from './factory'
export * from './cache'
export * from './extensions'
export * from './build'

import { build } from './build'
import { extend, domFactory } from './factory'
import { functionalEventListenerExt, objectPropsExt, refExt } from './extensions'


export const {
  html, template,
  recipe, cached
} = build(extend(domFactory, functionalEventListenerExt, objectPropsExt, refExt))
