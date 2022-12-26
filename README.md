<div align="right">

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/rehtm/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/rehtm/actions/workflows/coverage.yml)
[![npm](https://img.shields.io/npm/v/rehtm?color=black&label=&style=flat-square)](https://www.npmjs.com/package/rehtm)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rehtm?color=black&label=&style=flat-square)](https://bundlephobia.com/package/rehtm@latest)

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

<br>

- 🧬 [Hydration](https://en.wikipedia.org/wiki/Hydration_(web_development)) for pre-rendered content (e.g. SSR)
- ⚡ Functions as Event Listeners
- 🔗 Element references
- 📦 Object properties for [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
- 🚀 Cached [HTML templates](https://www.w3schools.com/tags/tag_template.asp) for performance
- 🧩 Extensions for custom attribute and node types
