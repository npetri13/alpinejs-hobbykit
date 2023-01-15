// x-log{. {log|info|warn|error|debug} }: Log the given expression. This is a console.log|info|warn|error wrapper.
export function AlpineLog(el, obj, { evaluateLater, effect, cleanup }) {

  let { value, expression, modifiers } = obj;

  if (modifiers.length > 1) {
    console.error(`x-log: One modifier expected but ${modifiers.length} was given. Additional modifiers will be ignored.`)
    console.log(expression)
    return
  }

  switch (modifiers[0]) {
    case '':
    case 'log':
      console.log(expression)
      break
    case 'info':
      console.info(expression)
      break
    case 'warn':
      console.warn(expression)
      break
    case 'error':
      console.error(expression)
      break
    case 'debug':
      console.debug(expression)
      break;
    default:
      console.log(expression)
      break
  }

}
