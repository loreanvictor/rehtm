export { build as buildRecipe, Recipe } from './template'
export * from './factory'
export * from './extensions'
export * from './cache'
export * from './build'

import { build } from './build'
import { extend, domFactory } from './factory'
import { functionalEventListenerExt, objectPropsExt, refExt } from './extensions'


export const {
  html, template,
  recipe, cached
} = build(extend(domFactory, functionalEventListenerExt, objectPropsExt, refExt))
