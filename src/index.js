import { AlpineTimeout } from './timeout'
import { AlpineInterval } from './interval'
import { AlpineLog } from './log'
import { AlpineScroll } from './scroll'

export default function (Alpine) {
  Alpine.directive('timeout', AlpineTimeout)
  Alpine.directive('interval', AlpineInterval)
  Alpine.directive('log', AlpineLog)
  Alpine.directive('scroll', AlpineScroll)
}

export {
  AlpineTimeout,
  AlpineInterval,
  AlpineLog,
  AlpineScroll
}
