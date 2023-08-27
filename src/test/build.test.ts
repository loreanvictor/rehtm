jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import { build, domFactory, extend, functionalEventListenerExt } from '../index'


describe(build, () => {
  afterEach(() => document.body.innerHTML = '')

  test('creates an element with given stuff.', () => {
    const { html } = build(domFactory())
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

    const { html } = build(domFactory())

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

  test('the cache can be cleaned.', () => {
    const ogCreateElement = document.createElement
    const cb = jest.fn()
    document.createElement = (tag, options) => {
      if (tag === 'template') {
        cb()
      }

      return ogCreateElement.call(document, tag, options)
    }

    const { html, cached } = build(domFactory())

    document.body.append(html`<div>Hellow!</div>`)
    document.body.append(html`<div>Hellow!</div>`)

    expect(cb).toHaveBeenCalledTimes(1)

    cached.clear()

    document.body.append(html`<div>Hellow!</div>`)

    expect(cb).toHaveBeenCalledTimes(2)
  })

  test('creates a template that can create elements.', () => {
    const { template } = build(domFactory())

    const tmpl = template`<div>hello ${'world'}</div>`
    document.body.append(tmpl.create())

    const div$ = document.querySelector('div')
    expect(div$).not.toBeNull()
    expect(div$!.textContent).toBe('hello world')
  })

  test('can hydrate other elements.', () => {
    const cb = jest.fn()

    const { template } = build(extend(domFactory(), functionalEventListenerExt))

    const tmpl = template`<div onclick=${cb}>hello <i>${'world'}</i></div>`
    document.body.innerHTML = '<div>hi <i></i></div>'
    const div$ = document.querySelector('div')!
    tmpl.hydrate(div$)

    expect(div$.textContent).toBe('hi world')
    expect(div$.querySelector('i')!.textContent).toBe('world')
    div$.click()
    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('can hydrate other elements from their root too', () => {
    const cb = jest.fn()

    const { template } = build(extend(domFactory(), functionalEventListenerExt))

    const tmpl = template`<b onclick=${cb}>CLICK ME!</b><i>${'World'}</i>`

    document.body.innerHTML = '<div><b>CLICK ME!</b><i>jack</i></div>'
    const div$ = document.querySelector('div')!
    tmpl.hydrateRoot(div$)

    expect(div$.textContent).toBe('CLICK ME!World')
    expect(div$.querySelector('i')!.textContent).toBe('World')
    div$.querySelector('b')!.click()
    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('can embed elements in each other.', () => {
    const { html } = build(domFactory())

    const c1 = html`<div>World!</div>`
    const c2 = html`<div>halo ${c1}</div>`

    document.body.appendChild(c2)

    const div$ = document.querySelector('div')
    expect(div$).not.toBeNull()
    expect(div$!.textContent).toBe('halo World!')
  })

  test('can embed arrays in elements.', () => {
    const { html } = build(domFactory())

    const c1 = html`<span>World</span>`
    const c2 = html`<div>halo ${[c1, '!']}</div>`

    document.body.appendChild(c2)

    const div$ = document.querySelector('div')
    expect(div$).not.toBeNull()
    expect(div$!.textContent).toBe('halo World!')
  })
})
