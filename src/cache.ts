import { DOMFactory } from './factory'
import { build, Recipe } from './template'


export function cache(factory: DOMFactory) {
  const create = build(factory)
  const store = new Map<string, Recipe>()

  const get = (strings: TemplateStringsArray, ...values: unknown[]) => {
    const key = strings.join('&')
    if (store.has(key)) {
      return store.get(key)!
    } else {
      const recipe = create(strings, ...values)
      store.set(key, recipe)

      return recipe
    }
  }

  const clear = () => store.clear()

  return { get, clear }
}
