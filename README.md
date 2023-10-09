<div align="right">

[![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/rehtm?style=flat-square&label=%20&color=black)](https://bundlejs.com/?q=rehtm)
[![npm](https://img.shields.io/npm/v/rehtm?color=black&label=&style=flat-square)](https://www.npmjs.com/package/rehtm)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/rehtm/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/rehtm/actions/workflows/coverage.yml)

</div>

<img src="./logo-dark.svg#gh-dark-mode-only" height="42px"/>
<img src="./logo-light.svg#gh-light-mode-only" height="42px"/>

Create and hydrate [HTML](https://en.wikipedia.org/wiki/HTML) using [HTM](https://github.com/developit/htm):

```js
import { html, ref } from 'rehtm'

let count = 0
const span = ref()

document.body.append(html`
  <div onclick=${() => span.current.innerHTML = ++count}>
    Clicked <span ref=${span}>${count}</span> times!
  </div>
`)
```
<div align="right">

[**▷ TRY IT**](https://codepen.io/lorean_victor/pen/wvxKJyq?editors=0010)

</div>

- 🧬 [Hydration](https://en.wikipedia.org/wiki/Hydration_(web_development)) for pre-rendered content (e.g. SSR)
- 🪝 Functions as Event Listeners
- 🔗 Element references (instead of element IDs)
- 📦 Object properties for [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
- 🚀 Cached [HTML templates](https://www.w3schools.com/tags/tag_template.asp) for performance
- 🧩 Extensions for custom attribute and node types

<br>

# Contents

- [Contents](#contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Hydration](#hydration)
  - [Global Document Object](#global-document-object)
  - [Extension](#extension)
- [Contribution](#contribution)

<br>

# Installation

[Node](https://nodejs.org/en/):

```bash
npm i rehtm
```

Browser / [Deno](https://deno.land):

```js
import { html } from 'https://esm.sh/rehtm'
```

<br>

# Usage

👉 Render DOM:

```js
import { html } from 'rehtm'

const name = 'World'
document.body.append(html`<div>Hellow ${name}!</div>`)
```
<br>
👉 Add event listeners:

```js
document.body.append(html`
  <button onclick=${() => alert('CLICKED!')}>
    Click ME!
  </button>
`)
```
<br>

👉 Use `ref()` to get references to created elements:

```js
import { ref, html } from 'rehtm'

const el = ref()
document.body.append(html`<div ref=${el}>Hellow World!</div>`)

console.log(el.current)
// <div>Hellow World!</div>
```
<br>

👉 Set object properties:
```js
const div = ref()
html`<div ref=${div} prop=${{x: 2}}>Some content</div>`

console.log(div.current.prop)
// > { x: 2 }
```
If the object properties are set on a custom element with a `.setProperty()` method, then that method will be called instead:
```js
import { define, onProperty } from 'minicomp'
import { html, ref } from 'rehtm'


define('say-hi', () => {
  const target = ref()
  onProperty('to', person => target.current.textContent = person.name)

  return html`<div>Hellow <span ref=${target} /></div>`
})


const jack = { name: 'Jack', ... }
const jill = { name: 'Jill', ... }

document.body.append(html`
  <say-hi to=${jack} />
  <say-hi to=${jill} />
`)
```

<br>

> **NOTE**
> 
> [**re**htm](.) creates [HTML templates](https://www.w3schools.com/tags/tag_template.asp) for any string literal and reuses them
> when possible. The following elements are all constructed from the same template:
> ```js
> html`<div class=${'foo'}>Hellow ${'World'}</div>`
> html`<div class=${'bar'}>Hellow ${'Welt'}</div>`
> html`<div class=${'baz'}>Hellow ${'Universe'}</div>`
> ```

<br>

## Hydration

👉 Use `template`s to breath life into content already rendered (for example, when it is rendered on the server):

```js
import { template, ref } from 'rehtm'

const span = ref()
let count = 0

// 👇 create a template to hydrate existing DOM:
const tmpl = template`
  <div onclick=${() => span.current.textContent = ++count}>
    Clicked <span ref=${span}>${count}</span> times!
  </div>
`

// 👇 hydrate existing DOM:
tmpl.hydrate(document.querySelector('div'))
```
```html
<div>
  Clicked <span>0</span> times.
</div>
```

<div align="right">

[**▷ TRY IT**](https://codepen.io/lorean_victor/pen/vYaNqPw?editors=1010)

</div>

👉 Use `.hydateRoot()` to hydrate children of an element instead of the element itself:

```js
const tmpl = template`
  <i>${'some stuff'}</i>
  <b>${'other stuff'}</b>
`

tmpl.hydrateRoot(document.querySelector('#root'))
```
```html
<div id="root">
  <i>This will be reset.</i>
  <b>This also.</b>
</div>
```

<br>

> 💡 [**re**htm](.) can hydrate DOM that is minorly different (for example, elements have different attributes). However it requires the same tree-structure to be able to hydrate pre-rendered DOM. This can be particularly tricky with the presence of text nodes that contain whitespace (e.g. newlines, tabs, etc.). To avoid this, make sure you are hydrating DOM that was created using the same template string with [**rehtm**](.).

<br>

👉 Use `.create()` for using a template to create elements with different values:
```js
const tmpl = template`<div>Hellow ${'World'}</div>`

tmpl.create('Jack')
// > <div>Hellow Jack</div>
```

<br>

> 💡 `html` template tag also creates templates and uses `.create()` method to generate elements. It caches each template based on its string parts, and reloads the same template the next time it comes upon the same string bits.

<br>

## Global Document Object

You might want to use [**rehtm**](.) in an environment where there is no global `document` object present (for example, during server side rendering). For such situations, use the `re()` helper function to create `html` and `template` tags for a specific document object:

```js
import { re } from 'rehtm'

const { html, template } = re(document)
document.body.append(html`<div>Hellow World!</div>`)
```

<br>

> `re()` reuses same build for same document object, all templates remain cached.

<br>

## Extension

You can create your own `html` and `template` tags with extended behavior. For that, you need a baseline DOM factory, extended with some extensions, passed to the `build()` function. For example, this is ([roughly](https://github.com/loreanvictor/rehtm/blob/412b87ad36f204491e56429291a339443dd978f5/src/index.ts#L12-L15)) how the default `html` and `template` tags are generated:

```js
import {
  build,         // 👉 builds template tags from given DOM factory, with caching enabled.
  extend,        // 👉 extends given DOM factory with given extensions.
  domFactory,    // 👉 this creates a baseline DOM factory.
  
  // 👉 this extension allows using functions as event listeners
  functionalEventListenersExt,
  
  // 👉 this extension allows setting object properties
  objectPropsExt,
  
  // 👉 this extension enables references
  refExt,
} from 'rehtm'


const { html, template } = build(
  extend(
    domFactory(),
    functionalEventListenersExt,
    objectPropsExt,
    refExt,
  )
)
```

<br>

An extension can extend any of these four core functionalities:

- `create(type, props, children, fallback, self)` \
  Is used when creating a new element. `children` is an already processed array of values. Should return the created node.
  <br>
  
- `attribute(node, name, value, fallback, self)` \
  Is used when setting an attribute on an element (a `create()` extension might bypass this).
  <br>

- `append(node, value, fallback, self)` \
  Is used when appending a child to a node (a `create()` extension might bypass this). Should return the appended node (or its analouge).
  <br>

- `fill(node, value, fallback, self)` \
  Is used when hydrating a node with some content.
  <br>
  
<br>
  
👉  Each method is given a `fallback()`, which it can invoke to invoke prior extensions (or the original factory): 

```js
const myExt = {
  attribute(node, name, value, fallback) {
    if (name === 'some-attr') {
      // do the magic 
    } else {
      // not our thing, let others set this
      // particular attribute
      fallback()
    }
  }
}
```

You can also call `fallback()` with modified arguments:

```js
fallback(node, modify(name), value.prop)
```

<br>

👉 Each method is also given a `self` object, which represents the final DOM factory. It can be used when you need to
invoke other methods of the host factory:

```js
const myExt = {
  create(tag, props, children, fallback, self) {
    if (tag === 'my-custom-thing') {
      const node = fallback('div')
      self.attribute(node, 'class', 'my-custom-thingy', self)

      if (props) {
        for (const name in props) {
          self.attribute(node, name, props[name], self)
        }
      }
      
      // ...
    } else {
      return fallback()
    }
  }
}
```

<br>

You can see some extension examples [here](https://github.com/loreanvictor/rehtm/tree/main/src/extensions). For examle, this is how the functional event listeners extension works:

```js
export const functionalEventListenerExt = {
  attribute(node, name, value, fallback) {
    if (name.startsWith('on') && typeof value === 'function') {
      const eventName = name.slice(2).toLowerCase()
      node.addEventListener(eventName, value)
    } else {
      fallback()
    }
  }
}
```

<br>

# Contribution

You need [node](https://nodejs.org/en/), [NPM](https://www.npmjs.com) to start and [git](https://git-scm.com) to start.

```bash
# clone the code
git clone git@github.com:loreanvictor/minicomp.git
```
```bash
# install stuff
npm i
```

Make sure all checks are successful on your PRs. This includes all tests passing, high code coverage, correct typings and abiding all [the linting rules](https://github.com/loreanvictor/quel/blob/main/.eslintrc). The code is typed with [TypeScript](https://www.typescriptlang.org), [Jest](https://jestjs.io) is used for testing and coverage reports, [ESLint](https://eslint.org) and [TypeScript ESLint](https://typescript-eslint.io) are used for linting. Subsequently, IDE integrations for TypeScript and ESLint would make your life much easier (for example, [VSCode](https://code.visualstudio.com) supports TypeScript out of the box and has [this nice ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)), but you could also use the following commands:

```bash
# run tests
npm test
```
```bash
# check code coverage
npm run coverage
```
```bash
# run linter
npm run lint
```
```bash
# run type checker
npm run typecheck
```
