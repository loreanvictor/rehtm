jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import { domFactory } from '../../factory'
import { build } from '../index'


describe('template', () => {
  afterEach(() => document.body.innerHTML = '')

  test('it creates a template that can be re-used.', () => {
    const template = build(domFactory)
    const tmpl = template`<div>hello</div>`

    document.body.appendChild(tmpl.create())

    const div$ = document.querySelector('div')
    expect(div$).not.toBeNull()
    expect(div$!.textContent).toBe('hello')
  })

  test('it creates a template with slots and stuff.', () => {
    const template = build(domFactory)
    const tmpl = template`<div class=${0} aria-role=button>hello <b>${1}</b></div>`

    document.body.appendChild(tmpl.create('foo', 'world'))

    const div$ = document.querySelector('div')
    expect(div$).not.toBeNull()
    expect(div$!.className).toBe('foo')
    expect(div$!.getAttribute('aria-role')).toBe('button')
    expect(div$!.textContent).toBe('hello world')
  })

  test('it also works for lists of elements.', () => {
    const template = build(domFactory)
    const tmpl = template`<b>${0}</b><i>${1}</i>`

    document.body.appendChild(tmpl.create('foo', 'bar'))

    const b$ = document.querySelector('b')
    expect(b$).not.toBeNull()
    expect(b$!.textContent).toBe('foo')

    const i$ = document.querySelector('i')
    expect(i$).not.toBeNull()
    expect(i$!.textContent).toBe('bar')
  })
})
