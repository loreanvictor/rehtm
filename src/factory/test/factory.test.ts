import { domFactory, extend } from '../index'


describe('factory', () => {
  afterEach(() => document.body.innerHTML = '')

  test('creates DOM elements.', () => {
    const factory = domFactory()
    document.body.appendChild(factory.create('div', { id: 'test' }, ['hellow world'], factory))
    expect(document.getElementById('test')).not.toBeNull()
    expect(document.getElementById('test')!.textContent).toBe('hellow world')
  })

  test('can fill DOM elements with other elements.', () => {
    const factory = domFactory()
    const b = document.createElement('b')
    factory.fill(b, 'hellow world', factory)
    expect(b.textContent).toBe('hellow world')

    const span = document.createElement('span')
    factory.fill(span, 'Hi Hi!', factory)
    factory.fill(b, span, factory)
    expect(b.textContent).toBe('Hi Hi!')
  })

  test('can fill DOM elements with arrays of stuff.', () => {
    const factory = domFactory()
    const b = document.createElement('b')
    factory.fill(b, 'Hellow Hellow', factory)
    factory.fill(b, ['hellow', 'world'], factory)
    expect(b.textContent).toBe('hellowworld')
  })

  test('throws error for unsupported tags.', () => {
    const factory = domFactory()
    expect(() => factory.create(42, {}, [], factory)).toThrowError()
  })

  test('throws errors when setting unsupported attributes', () => {
    const factory = domFactory()
    expect(() => factory.create('div', {x: [42]}, [], factory)).toThrowError()
  })

  test('throws error for unsupported childs.', () => {
    const factory = domFactory()
    expect(() => factory.create('div', {}, [[42]], factory)).toThrowError()
  })

  test('throws error for unsupported content to fill.', () => {
    const factory = domFactory()
    const b = document.createElement('b')
    expect(() => factory.fill(b, () => {}, factory)).toThrowError()
  })

  test('can be extended to support new tag types.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory(), {
      create(type, _, __, fallback) {
        if (type === 42) {
          cb()

          return fallback('b')
        } else {
          return fallback()
        }
      }
    })

    document.body.append(fact.create(42, {}, [], fact))
    document.body.append(fact.create('div', {}, ['Halo'], fact))

    expect(cb).toBeCalledTimes(1)
    expect(document.body.innerHTML).toBe('<b></b><div>Halo</div>')
  })

  test('extended factories fallback properly on other methods.', () => {
    const fact = extend(domFactory(), {
      create(type, _, __, fallback) {
        if (type === 42) {
          return fallback('b')
        } else {
          return fallback()
        }
      }
    })

    const el = fact.create(42, {}, [], fact) as HTMLElement
    fact.attribute(el, 'x', 43, fact)

    expect(el.outerHTML).toBe('<b x="43"></b>')
  })

  test('can be extended to support new attribute types.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory(), {
      attribute(el, name, __, fallback) {
        if (name === 'x') {
          cb()
          fallback(el, 'y')
        } else {
          fallback()
        }
      }
    })

    const div = fact.create('div', {}, [], fact) as HTMLElement
    fact.attribute(div, 'x', 42, fact)
    document.body.append(div)
    expect(cb).toBeCalledTimes(1)
    expect(document.body.innerHTML).toBe('<div y="42"></div>')
  })

  test('can be extended to support new child types.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory(), {
      append(el, child, fallback) {
        if (Array.isArray(child)) {
          cb()

          return fallback(el, '42')
        } else {
          return fallback()
        }
      }
    })

    document.body.append(fact.create('div', {}, [[41]], fact))
    expect(cb).toBeCalledTimes(1)
    expect(document.body.innerHTML).toBe('<div>42</div>')
  })

  test('can be extended to support new fill types.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory(), {
      fill(el, child, fallback) {
        if (typeof child === 'function') {
          cb()

          return fallback(el, '42')
        } else {
          return fallback()
        }
      }
    })

    const b = document.createElement('b')
    fact.fill(b, () => {}, fact)
    expect(cb).toBeCalledTimes(1)
    expect(b.textContent).toBe('42')
  })

  test('extension of factory without any extensions should be itself.', () => {
    const factory = domFactory()
    expect(extend(factory)).toBe(factory)
  })
})
