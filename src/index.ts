export { build as buildRecipe, Recipe } from './template'
export * from './factory'
export * from './extensions'
export * from './cache'
export * from './build'
export * from './re'

import { re } from './re'
import { BuildSuite } from './types'


const wrongFn = name => (..._: any[]) => {
  throw new Error(
    `No global window object found, which means you cannot call ${name}. \n`
    + 'Create a custom `document` object and use the following syntax instead:\n\n'
    + "import { re } from 'rehtm'\n"
    + `const { ${name} } = re(document)\n`
  )
}

const result: BuildSuite = globalThis.window ? re(globalThis.window.document) : {
  html: wrongFn('html'),
  template: wrongFn('template'),
  recipe: wrongFn('recipe'),
  cached: {
    get: wrongFn('cached.get'),
    clear: wrongFn('cached.clear'),
  },
} as any

export const {
  html, template,
  recipe, cached
} = result
