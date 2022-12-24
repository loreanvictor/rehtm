import { define } from 'minicomp'
import { build } from '../src'


const html = build()

const ogCreateElement = document.createElement
document.createElement = (tagName, options) => {
  if (tagName === 'template') {
    console.log('NEW TEMPLATE')
  }

  return ogCreateElement.call(document, tagName, options)
}

define('say-hi', ({ to }) => html`<div>Hellow ${to}!</div>`)

document.body.innerHTML = `
  <say-hi to="World"></say-hi>
  <say-hi to="Jack"></say-hi>
`
