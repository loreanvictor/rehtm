<img src="logo-dark.svg#gh-dark-mode-only" height="42px"/>
<img src="logo-light.svg#gh-light-mode-only" height="42px"/>

Create [HTML](https://en.wikipedia.org/wiki/HTML) using [HTM](https://github.com/developit/htm):

```js
import { html } from 'rehtm'

document.body.appendChild(html`
  <div onclick=${() => console.log('HI!')}>
    Hellow World!
  </div>
`)
```

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/rehtm/coverage.yml?color=black&label=tests&style=flat-square)](https://github.com/loreanvictor/rehtm/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/rehtm?color=black&label=version&style=flat-square)](https://www.npmjs.com/package/rehtm)
![npm type definitions](https://img.shields.io/npm/types/rehtm?color=black&style=flat-square)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rehtm?color=black&style=flat-square)](https://bundlephobia.com/package/rehtm@latest)

- 🚀 Cached [HTML templates](https://www.w3schools.com/tags/tag_template.asp) for performance
- 🧬 [Rehydration](https://en.wikipedia.org/wiki/Hydration_(web_development)) for server-rendered content
- ⚡ Event listeners on DOM elements
- 📦 Custom properties for [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
- 🔩 Custom attribute and node types
