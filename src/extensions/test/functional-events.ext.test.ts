import { functionalEventListenerExt } from '../functional-events.ext'
import { extend, domFactory } from '../../factory'


describe('functional event listeners', () => {
  afterEach(() => document.body.innerHTML = '')

  test('adds event listener.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory, functionalEventListenerExt)
    const el = fact.create('div', { onclick: cb, 'aria-label': 'test' }, [], fact) as HTMLElement
    document.body.append(el)

    el.click()
    expect(cb).toBeCalledTimes(1)
    expect(el.getAttribute('aria-label')).toBe('test')
  })
})
