export { build as buildRecipe, Recipe } from './template'
export * from './factory'
export * from './extensions'
export * from './cache'
export * from './build'
export * from './re'

import { re } from './re'

export const {
  html, template,
  recipe, cached
} = re(window.document)
