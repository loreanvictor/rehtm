/* eslint-disable @typescript-eslint/no-require-imports */
jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import { type } from 'ts-inference-check'

import { HTMLBuilderFn, TemplateBuilderFn, RecipeBuilderFn, CachedBuilder } from '../types'
import { re, ref } from '../index'

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

  test('applies default plugins in correct order.', () => {
    const cb = jest.fn()

    const { html } = re(document)
    const D = ref()

    document.body.appendChild(html`<div oncustomevent=${cb} prop=${{x: 42}} ref=${D}></div>`)
    const div = document.body.querySelector('div')!
    div.dispatchEvent(new CustomEvent('customevent'))

    expect(D.current).toBe(div)
    expect(cb).toHaveBeenCalled()
    expect((div as any).prop.x).toBe(42)
  })
})
