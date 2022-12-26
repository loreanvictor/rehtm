import { domFactory, extend } from '../index'


describe('factory', () => {
  afterEach(() => document.body.innerHTML = '')

  test('creates DOM elements.', () => {
    document.body.appendChild(domFactory.create('div', { id: 'test' }, ['hellow world'], domFactory))
    expect(document.getElementById('test')).not.toBeNull()
    expect(document.getElementById('test')!.textContent).toBe('hellow world')
  })

  test('throws error for unsupported tags.', () => {
    expect(() => domFactory.create(42, {}, [], domFactory)).toThrowError()
  })

  test('throws errors when setting unsupported attributes', () => {
    expect(() => domFactory.create('div', {x: [42]}, [], domFactory)).toThrowError()
  })

  test('throws error for unsupported childs.', () => {
    expect(() => domFactory.create('div', {}, [[42]], domFactory)).toThrowError()
  })

  test('throws error for unsupported content to fill.', () => {
    const b = document.createElement('b')
    expect(() => domFactory.fill(b, [42], domFactory)).toThrowError()
  })

  test('can be extended to support new tag types.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory, {
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

  test('can be extended to support new attribute types.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory, {
      attribute(el, name, __, fallback) {
        if (name === 'x') {
          cb()
          fallback(el, 'y')
        } else {
          fallback()
        }
      }
    })

    document.body.append(fact.create('div', {x: 42}, [], fact))
    expect(cb).toBeCalledTimes(1)
    expect(document.body.innerHTML).toBe('<div y="42"></div>')
  })

  test('can be extended to support new child types.', () => {
    const cb = jest.fn()

    const fact = extend(domFactory, {
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

    const fact = extend(domFactory, {
      fill(el, child, fallback) {
        if (Array.isArray(child)) {
          cb()

          return fallback(el, '42')
        } else {
          return fallback()
        }
      }
    })

    const b = document.createElement('b')
    fact.fill(b, [41], fact)
    expect(cb).toBeCalledTimes(1)
    expect(b.textContent).toBe('42')
  })

  test('extension of factory without any extensions should be itself.', () => {
    expect(extend(domFactory)).toBe(domFactory)
  })
})
