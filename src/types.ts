import { Recipe } from './template'


export type HTMLBuilderFn = (strings: TemplateStringsArray, ...values: unknown[]) => DocumentFragment
export type TemplateBuilderFn = (strings: TemplateStringsArray, ...values: unknown[]) => {
  hydrate: (node: Node) => void
  hydrateRoot: (root: Node) => void
  create: () => DocumentFragment
}
export type RecipeBuilderFn = (strings: TemplateStringsArray, ...values: unknown[]) => Recipe
export type CachedBuilder = {
  get: RecipeBuilderFn,
  clear: () => void,
}

export type BuildSuite = {
  html: HTMLBuilderFn,
  template: TemplateBuilderFn,
  recipe: RecipeBuilderFn,
  cached: CachedBuilder,
}
