import { refExt, ref } from '../ref.ext'
import { extend, domFactory } from '../../factory'


describe('element references', () => {
  afterEach(() => document.body.innerHTML = '')

  test('adds element references.', () => {
    const fact = extend(domFactory(), refExt)
    const r = ref()

    const el = fact.create('div', { ref: r, x: 'y' }, [], fact) as HTMLElement
    document.body.append(el)

    expect(r.current).toBe(el)
    expect(el.getAttribute('x')).toBe('y')
  })

  test('ignores ref attribute if not a ref is passed.', () => {
    const fact = extend(domFactory(), refExt)
    const el = fact.create('div', { ref: 'foo' }, [], fact) as HTMLElement
    document.body.append(el)

    expect(el.getAttribute('ref')).toBe('foo')
  })
})
