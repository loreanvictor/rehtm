import { SmartTemplate } from '../src'


const template = new SmartTemplate()
template.template.innerHTML = '<div>Hellow <span><i></i>!</span></div>'
const slot0 = template.template.content.querySelector('i')
const slot1 = template.template.content.querySelector('span')
template.slot(0, slot0)
template.slot(1, slot1, 'style')

document.body.appendChild(template.use('World', 'color: red;'))
document.body.appendChild(template.use('Jack', 'color: blue;'))
