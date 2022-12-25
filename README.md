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

- Template caching
- SSR and re-hydration
- Event listeners
- Custom attribute and node types
