import { DOMFactoryExt } from '../factory'
import { Recipe } from './recipe'
import { isSlottedParam } from './slot'


export class RecipeExt implements DOMFactoryExt {
  constructor(private readonly recipe: () => Recipe) { }

  attribute(el, name, value, fallback) {
    if (isSlottedParam(value)) {
      const recipe = this.recipe()
      recipe.slot(value.index, el, name)
      fallback(el, name, '?')
    } else {
      fallback()
    }
  }

  append(parent, value, fallback) {
    if (isSlottedParam(value)) {
      const recipe = this.recipe()
      const node = fallback(parent, '?')
      recipe.slot(value.index, node)

      return node
    } else {
      return fallback(parent, value)
    }
  }
}
