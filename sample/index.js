import { define, onProperty, onAttribute } from 'minicomp'
import { html, template, ref } from '../src'

// --- SIMPLE COUNTER --- \\

// let count = 0
// const span = ref()

// document.body.append(html`
//   <div onclick=${() => span.current.innerHTML = ++count}>
//     Clicked <span ref=${span}>${count}</span> times!
//   </div>
// `)


// --- HYDRATION TEST --- \\

// let count = 0
// const span = ref()

// const tmpl = template`
//   <div onclick=${() => span.current.innerHTML = ++count}>
//     Clicked <span ref=${span}>${count}</span> times!
//   </div>
// `

// const div = document.querySelector('div')
// document.body.appendChild(html`<button onclick=${() => tmpl.hydrate(div)}>HYDRATE</button>`)

// --- COMPONENT TEST --- \\

define('say-hi', () => {
  const _span = ref()
  const counter = ref()
  let _count = 0

  onProperty('to', person => _span.current.innerHTML = person.name)
  onAttribute('to', name => _span.current.innerHTML = name)

  return html`
    <div onclick=${() => counter.current.innerHTML = ++_count}>
      Hellow <span ref=${_span} />!
      (Clicked <span ref=${counter}>${_count}</span> times)
    </div>
  `
})

document.body.appendChild(html`
  <say-hi to="World"></say-hi>
  <say-hi to="${{name: 'Jack'}}"></say-hi>
`)
