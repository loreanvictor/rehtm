import { DOMFactoryExt } from '../factory'
import { Recipe } from './recipe'
import { isSlottedParam } from './slot'


/**
 * Creates a DOM factory extension that allows using slotted parameters. It will
 * slot given parameters to the recipe returned by the accessor function, adding a fallback node / attribute
 * on the element instead.
 *
 * Template builders will treat arguments passed to the template string as slotted parameters. This extension
 * supports treating them properly when rendering a template string.
 *
 * @param getRecipe A function that returns the recipe to slot the parameters to.
 * @returns A DOM factory extension.
 */
export function useRecipe(getRecipe: () => Recipe): DOMFactoryExt {
  return {
    attribute(el, name, value, fallback) {
      if (isSlottedParam(value)) {
        const recipe = getRecipe()
        recipe.slot(value.index, el, name)
        fallback(el, name, '?')
      } else {
        fallback()
      }
    },

    append(parent, value, fallback) {
      if (isSlottedParam(value)) {
        const recipe = getRecipe()
        const node = fallback(parent, '?')
        recipe.slot(value.index, node)

        return node
      } else {
        return fallback(parent, value)
      }
    }
  }
}
