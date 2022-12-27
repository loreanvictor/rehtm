<div align="right">

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rehtm@latest?color=black&label=&style=flat-square)](https://bundlephobia.com/package/rehtm@latest)
[![npm](https://img.shields.io/npm/v/rehtm?color=black&label=&style=flat-square)](https://www.npmjs.com/package/rehtm)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/rehtm/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/rehtm/actions/workflows/coverage.yml)

</div>

<img src="logo-dark.svg#gh-dark-mode-only" height="42px"/>
<img src="logo-light.svg#gh-light-mode-only" height="42px"/>

Create [HTML](https://en.wikipedia.org/wiki/HTML) using [HTM](https://github.com/developit/htm):

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
- ⚡ Functions as Event Listeners
- 🔗 Element references
- 📦 Object properties for [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
- 🚀 Cached [HTML templates](https://www.w3schools.com/tags/tag_template.asp) for performance
- 🧩 Extensions for custom attribute and node types

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

  return html`<div>Hellow <span ref=${target} /></div>
})


const jack = { name: 'Jack', ... }
const jill = { name: 'Jill', ... }

document.body.append(html`
  <say-hi to=${jack} />
  <say-hi to=${jill} />
`)
```

<br>

> 💡 [**re**htm](.) creates [HTML templates](https://www.w3schools.com/tags/tag_template.asp) for any string literal and reuses them
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

> 💡 [**re**htm](.) can hydrate DOM that is minorly different (for example, elements have different attributes). However it requires the same tree-structure to be able to hydrate pre-rendered DOM.

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
