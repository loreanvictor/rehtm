import { DOMFactory } from './factory'
import { cache } from './cache'


export function build(factory: DOMFactory) {
  const { get } = cache(factory)

  return {
    html: (strings: TemplateStringsArray, ...values: unknown[]) => get(strings, ...values).create(...values),
    template: (strings: TemplateStringsArray, ...values: unknown[]) => {
      const recipe = get(strings, ...values)

      return {
        hydrate: (node: Node) => recipe.apply([node], ...values),
        hydrateRoot: (root: Node) => recipe.apply(root.childNodes, ...values),
        create: () => recipe.create(...values),
      }
    },
    recipe: get,
  }
}
