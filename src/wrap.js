import { debounce } from 'lodash.debounce'
import { isNumeric } from 'lodash.isnumber'
// x-wrap -> evaluate when a flex container is wrapped
// x-wrap:class apply a class when a flex container is wrapped
export function AlpineWrap(el, { value, modifiers, expression }, { evaluateLater, effect, cleanup }) {

  console.info('%cx-wrap: This derective is still experimental. Checkout documentation on github.', 'color: white;background-color: #FFBF00; font-weight: bold; padding-left: 5px; padding-right: 5px;')

  // directive only makes sence on flex flex-row tags
  let styles = window.getComputedStyle(el)
  if (!styles.getPropertyValue('display').includes('flex') || styles.getPropertyValue('flex-direction') !== 'row') {
    console.error('x-wrap: The wrap directive only applies to flex-row elements, otherwise results are unexpected.')
  }

  // check for values enter or leave; use expression as default for enter
  if (value.includes('leave')) {
    el._x_wrap_evaluate_unwrap = expression && evaluateLater(expression)
  } else if (value.includes('enter')) {
    el._x_wrap_evaluate_wrap = expression && evaluateLater(expression)
  }
  else {
    el._x_wrap_evaluate_wrap = expression && evaluateLater(expression)
  }

  let wait = 10
  if (modifiers.includes('debounce')) {
    let nextModifier = modifiers[modifiers.indexOf('debounce')+1]
    if (nextModifier && isNumeric(nextModifier.split('ms')[0])) {
      wait = Number(nextModifier.split('ms')[0])
    }
    else {
      wait = 10
      console.error(`x-wrap: Unexpected debounce value. ${wait}ms will be applied.`)
    }
  }

  let wrapped_x_val = null

  console.log(wait)
  let resize_handler = debounce(() => {
    let last_x_pos = 0
    let just_wrapped = false

    // console.log(`wrapped_x_val: ${wrapped_x_val} -> innerWidth: ${window.innerWidth}`)

    if (wrapped_x_val && (wrapped_x_val > window.innerWidth)) {
      return
    }
    else if (wrapped_x_val && (wrapped_x_val < window.innerWidth)) {
      //console.log(`x-wrap: unwrap at: ${window.innerWidth}px.`)
      el._x_wrap_evaluate_unwrap()
      wrapped_x_val = null
    }

    for (let sib = el.firstElementChild; sib; sib = sib.nextElementSibling) {
      let rect = sib.getBoundingClientRect();

      just_wrapped = rect.left < last_x_pos
      last_x_pos = rect.left

      if (just_wrapped) {
        wrapped_x_val = window.innerWidth
        break
      }
    }

    if (just_wrapped) { el._x_wrap_evaluate_wrap() }
  }, wait)

  resize_handler() // initial state run at first time

  if (!el._x_wrap_listener) {
    el._x_wrap_listener = true
    window.addEventListener('resize', resize_handler ); // run on demand
  }

  cleanup(() => window.removeEventListener('resize', resize_handler))
}
