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

Render DOM:

```js
import { html } from 'rehtm'

const name = 'World'
document.body.append(html`<div>Hellow ${name}!</div>`)
```

Add event listeners:

```js
document.body.append(html`
  <button onclick=${() => alert('CLICKED!')}>
    Click ME!
  </button>
`)
```

Use `ref()` to get references to created elements:

```js
import { ref, html } from 'rehtm'

const el = ref()
document.body.append(html`<div ref=${el}>Hellow World!</div>`)

console.log(el.current)
// <div>Hellow World!</div>
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

[**re**htm](.) can also breath life into content already rendered (for example, when it is rendered on the server):

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
