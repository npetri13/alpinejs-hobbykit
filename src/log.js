// x-log{. {log|info|warn|error|debug} }: Log the given expression. This is a console.log|info|warn|error wrapper.
export function AlpineLog(el, { expression, modifiers }, { evaluateLater, effect }) {

  let logThis = evaluateLater(expression)

  if (modifiers.length > 1) {
    console.error(`x-log: One modifier expected but ${modifiers.length} was given. Additional modifiers will be ignored.`)
    console.log(expression)
    return
  }

  effect(() => {
    logThis(ex => {
      switch (modifiers[0]) {
          case '':
          case 'log':
          console.log(ex)
          break
          case 'info':
          console.info(ex)
          break
          case 'warn':
          console.warn(ex)
          break
          case 'error':
          console.error(ex)
          break
          case 'debug':
          console.debug(ex)
          break;
          default:
          console.log(ex)
          break
      }
    })
  })
}
