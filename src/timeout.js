// x-timeout.{Number}: Evaluates after a timeout of the given number in ms.
export function AlpineTimeout(el, { modifiers, expression }, { evaluateLater, cleanup }) {

  if (!modifiers.length) { console.error(`x-timeout: Missing arguments.`); return; }

  if (modifiers.length > 1) {
    console.error(`x-timeout: One modifier expected but ${modifiers.length} was given. Additional modifiers will be ignored.`)
  }

  const timeout = Number(modifiers[0].split('ms')[0])
  if (!timeout) {
    console.error(`x-timeout: Invalid timeout value: ${modifiers[0]}.`)
    return
  }

  let timeout_id = setTimeout(evaluateLater(expression), timeout)

  cleanup(() => clearTimeout(timeout_id))
}
