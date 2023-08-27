import { define, onProperty } from 'minicomp'

import { objectPropsExt } from '../object-props.ext'
import { extend, domFactory } from '../../factory'


describe('object properties', () => {
  afterEach(() => document.body.innerHTML = '')

  test('adds object properties to custom elements.', () => {
    const cb = jest.fn()
    const cb2 = jest.fn()

    define('op-ext-test', ({test: t}) => {
      cb2(t)
      onProperty('test', cb)

      return '<div></div>'
    })

    const fact = extend(domFactory(), objectPropsExt)
    const obj = { test: 'test' }
    const el = fact.create('op-ext-test', { test: obj, id: 'foo' }, [], fact) as HTMLElement
    document.body.append(el)

    expect(cb2).toBeCalledTimes(1)
    expect(cb2).toBeCalledWith(obj)
    expect(cb).toBeCalledTimes(1)
    expect(cb).toBeCalledWith(obj)
    expect(el.id).toBe('foo')
  })

  test('adds properties to native elements too.', () => {
    const fact = extend(domFactory(), objectPropsExt)
    const obj = { test: 'test' }
    const el = fact.create('div', { test: obj, id: 'foo' }, [], fact) as HTMLElement

    expect(el['test']).toBe(obj)
    expect(el.id).toBe('foo')
  })
})
