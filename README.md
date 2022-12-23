<img src="logo-dark.svg#gh-dark-mode-only" height="42px"/>
<img src="logo-light.svg#gh-light-mode-only" height="42px"/>

Create [HTML](https://en.wikipedia.org/wiki/HTML) using [HTM](https://github.com/developit/htm):

```js
import { html } from 'rehtm'

document.body.appendChild(
  html`<div>Hellow World!</div>`
)
```

- Supports event listeners
- Supports object properties
- Supports object attributes through processors
- Supports object embedding in HTML through processors
- Supports SSR and re-hydration when combined with [**minicomp**](https://github.com/loreanvictor/minicomp) (Experimental, via [declarative shadow DOM](https://github.com/mfreed7/declarative-shadow-dom))
