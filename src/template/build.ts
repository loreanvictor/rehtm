import htm from 'htm/mini'

import { extend, DOMFactory } from '../factory'
import { Recipe } from './recipe'
import { useRecipe } from './extension'
import { makeSlottedParam } from './slot'


export function build(factory: DOMFactory) {
  const ctx: Recipe[] = []
  const fact = extend(factory, useRecipe(() => ctx[ctx.length - 1]!))

  const template = htm.bind(
    (type: unknown, props?: Record<string, unknown>, ...children: unknown[]) =>
      fact.create(type, props, children, fact)
  )

  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const recipe = new Recipe(factory)
    ctx.push(recipe)
    const result = template(strings, ...values.map((_, index) => makeSlottedParam(index)))
    ctx.pop()

    if (Array.isArray(result)) {
      result.forEach((node) => recipe.template.content.appendChild(node))
    } else {
      recipe.template.content.appendChild(result)
    }

    recipe.finalize()

    return recipe
  }
}
