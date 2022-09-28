import { debounce } from "lodash.debounce"
import { isNumeric } from "lodash.isnumber"

// x-scroll:{up|down}{.debounce.{Int} } Evaluates every time the user scroll. It can distinguish between up or don scroll depending on the given modifiers. You can also add a debounce modifier which takes a timespan in milliseconds.
export function AlpineScroll(el, { value, expression, modifiers }, { evaluateLater, effect, cleanup }) {

  let evaluate = evaluateLater(expression)
  const dir_up = value && value.includes('up')
  const dir_down = value && value.includes('down')

  if ( !(value && (dir_down || dir_up)) ) {
    console.error(`x-scroll: Unkonwn value: '${value}' given.`)
    return
  }

  let time = 0
  if (modifiers.includes('debounce'))
  {
    let idx = modifiers.indexOf('debounce')
    time = Number(modifiers[idx+1].split('ms'))
    if (!isNumeric(time)) {
      console.error(`x-scroll: Invalid debounce value: ${modifiers[idx+1]}.`)
      return
    }
  }

  let old_y_pos = undefined;
  let new_y_pos = undefined;

  let handler = () => {

    if (!value) { evaluate() }
    else {

      if (old_y_pos === undefined) { old_y_pos = window.pageYOffset }
      new_y_pos = window.pageYOffset

      if (dir_up && ( (old_y_pos - new_y_pos) > 1) ) { evaluate() }
      else if (dir_down && ( (new_y_pos - old_y_pos) > 1) ) { evaluate() }

      old_y_pos = new_y_pos
    }
  }

  window.addEventListener("scroll", debounce(handler, time))

  cleanup(() => window.removeEventListener("scroll", handler))
}
