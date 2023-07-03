jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import { type } from 'ts-inference-check'

import { HTMLBuilderFn, TemplateBuilderFn, RecipeBuilderFn, CachedBuilder } from '../types'
import { re } from '../index'

describe(re, () => {
  test('uses the same cache for the same document object.', () => {
    const { cached } = re(document)
    const { cached: cached2 } = re(document)

    expect(cached.get`<div>hello</div>`).toBe(cached2.get`<div>hello</div>`)
  })

  test('re has correct typing.', () => {
    const { cached, template, html, recipe } = re(document)

    expect(type(html).is<HTMLBuilderFn>(true)).toBe(true)
    expect(type(template).is<TemplateBuilderFn>(true)).toBe(true)
    expect(type(recipe).is<RecipeBuilderFn>(true)).toBe(true)
    expect(type(cached).is<CachedBuilder>(true)).toBe(true)

    expect(type(html).is<string>(false)).toBe(false)
    expect(type(template).is<string>(false)).toBe(false)
    expect(type(recipe).is<string>(false)).toBe(false)
    expect(type(cached).is<string>(false)).toBe(false)
  })
})
