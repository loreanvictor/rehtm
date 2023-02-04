jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import { re } from '../index'

describe(re, () => {
  test('uses the same cache for the same document object.', () => {
    const { cached } = re(document)
    const { cached: cached2 } = re(document)

    expect(cached.get`<div>hello</div>`).toBe(cached2.get`<div>hello</div>`)
  })
})
