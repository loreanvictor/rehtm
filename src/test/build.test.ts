jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import { build } from '../index'


describe('html', () => {
  afterEach(() => document.body.innerHTML = '')

  test('creates an element with given stuff.', () => {
    const html = build()
    const comp = (name: string) => html`<div>hello ${name}</div>`
    document.body.appendChild(comp('world'))

    const div$ = document.querySelector('div')
    expect(div$).not.toBeNull()
    expect(div$!.textContent).toBe('hello world')
  })

  test('caches templates and re-uses them.', () => {
    const ogCreateElement = document.createElement
    const cb = jest.fn()
    document.createElement = (tag, options) => {
      if (tag === 'template') {
        cb()
      }

      return ogCreateElement.call(document, tag, options)
    }

    const html = build()

    const comp = (name: string) => html`<div>hello ${name}</div>`

    document.body.appendChild(comp('world'))
    document.body.appendChild(comp('jack'))

    expect(cb).toHaveBeenCalledTimes(1)
    const div$ = document.querySelectorAll('div').item(0)
    const div2$ = document.querySelectorAll('div').item(1)

    expect(div$).not.toBeNull()
    expect(div2$).not.toBeNull()
    expect(div$!.textContent).toBe('hello world')
    expect(div2$!.textContent).toBe('hello jack')

    document.createElement = ogCreateElement
  })
})
