jest.mock('htm/mini', () => require('htm/mini/index.umd.js'))

import {
  buildRecipe, Recipe,

  CreateFn, AttributeFn, AppendFn, FillFn, DOMFactory,
  CreateFnExt, AttributeFnExt, AppendFnExt, FillFnExt, DOMFactoryExt,
  extend, nullFactory, domFactory,

  functionalEventListenerExt, objectPropsExt, refExt,

  cache, build,

} from '../index'


test('everything is exported properly.', () => {
  expect(buildRecipe).not.toBe(undefined)
  expect(Recipe).not.toBe(undefined)

  expect(<CreateFn>{}).not.toBe(undefined)
  expect(<AttributeFn>{}).not.toBe(undefined)
  expect(<AppendFn>{}).not.toBe(undefined)
  expect(<FillFn>{}).not.toBe(undefined)
  expect(<DOMFactory>{}).not.toBe(undefined)
  expect(<CreateFnExt>{}).not.toBe(undefined)
  expect(<AttributeFnExt>{}).not.toBe(undefined)
  expect(<AppendFnExt>{}).not.toBe(undefined)
  expect(<FillFnExt>{}).not.toBe(undefined)
  expect(<DOMFactoryExt>{}).not.toBe(undefined)
  expect(extend).not.toBe(undefined)
  expect(nullFactory).not.toBe(undefined)
  expect(domFactory).not.toBe(undefined)

  expect(functionalEventListenerExt).not.toBe(undefined)
  expect(objectPropsExt).not.toBe(undefined)
  expect(refExt).not.toBe(undefined)

  expect(cache).not.toBe(undefined)
  expect(build).not.toBe(undefined)
})


