// x-interval.{Number}: Evaluates every timeinterval given by Number in ms.
export function AlpineInterval(el, { modifiers, expression }, { evaluateLater, cleanup }) {

  if (!modifiers.length) { console.error(`x-interval: Missing arguments.`); return; }

  if (modifiers.length > 1) {
    console.error(`x-interval: One modifier expected but ${modifiers.length} was given. Additional modifiers will be ignored.`)
  }

  const interval = Number(modifiers[0].split('ms')[0])
  if (!interval) {
    console.error(`x-interval: Invalid interval value: ${modifiers[0]}.`)
    return
  }

  let interval_id = setInterval(evaluateLater(expression), interval)

  cleanup(() => clearTimeout(interval_id))

}
