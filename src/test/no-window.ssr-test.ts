jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import { JSDOM } from 'jsdom'

import { html, template, recipe, cached, re } from '../index'


describe('no window', () => {
  test('default functions should throw error.', () => {
    expect(() => html`<div>hello</div>`).toThrow()
    expect(() => template`<div>hello</div>`).toThrow()
    expect(() => recipe`<div>hello</div>`).toThrow()
    expect(() => cached.get`<div>hello</div>`).toThrow()
    expect(() => cached.clear()).toThrow()
  })

  test('re should return functions that do not throw.', () => {
    const document = new JSDOM().window.document
    const { html: h, template: t, recipe: r, cached: c } = re(document)

    expect(() => h`<div>hello</div>`).not.toThrow()
    expect(() => t`<div>hello</div>`).not.toThrow()
    expect(() => r`<div>hello</div>`).not.toThrow()
    expect(() => c.get`<div>hello</div>`).not.toThrow()
    expect(() => c.clear()).not.toThrow()
  })

  test('creates an element with given stuff.', () => {
    const document = new JSDOM().window.document
    const { html: h } = re(document)
    const comp = (name: string) => h`<div>hello ${name}</div>`
    document.body.appendChild(comp('world'))

    const div$ = document.querySelector('div')
    expect(div$).not.toBeNull()
    expect(div$!.textContent).toBe('hello world')
  })

  test('can hydrate other elements.', () => {
    const cb = jest.fn()
    const document = new JSDOM().window.document

    const { template: t } = re(document)

    const tmpl = t`<div onclick=${cb}>hello <i>${'world'}</i></div>`
    document.body.innerHTML = '<div>hi <i></i></div>'
    const div$ = document.querySelector('div')!
    tmpl.hydrate(div$)

    expect(div$.textContent).toBe('hi world')
    expect(div$.querySelector('i')!.textContent).toBe('world')
    div$.click()
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
