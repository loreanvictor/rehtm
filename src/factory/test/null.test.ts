import { nullFactory, UnsupportedAppendError, UnsupportedAttributeError, UnsupportedElementTypeError, UnsupportedFillError } from '../null'


describe(nullFactory, () => {
  test('throws error for unsupported tags.', () => {
    const factory = nullFactory()
    expect(() => factory.create(42, {}, undefined, factory)).toThrow(UnsupportedElementTypeError)
  })

  test('throws errors for unsupported attributes.', () => {
    const factory = nullFactory()
    expect(
      () => factory.attribute(document.createElement('div'), 'x', 42, factory)
    ).toThrow(UnsupportedAttributeError)
  })

  test('throws error for unsupported childs.', () => {
    const factory = nullFactory()
    expect(() => factory.append(document.createElement('div'), 42, factory)).toThrow(
      UnsupportedAppendError
    )
  })

  test('throws error for unsupported element fillings.', () => {
    const factory = nullFactory()
    expect(() => factory.fill(document.createElement('div'), 42, factory)).toThrow(
      UnsupportedFillError
    )
  })
})
