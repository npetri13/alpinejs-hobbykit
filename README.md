# AlpineJS Hobby Kit
![License](https://img.shields.io/npm/l/@npetri/alpinejs-hobbykit?style=for-the-badge) ![Version](https://img.shields.io/npm/v/@npetri/alpinejs-hobbykit?style=for-the-badge)

An **AlpineJS Plugin** with some useful extension.

## Installation

### Via CDN
```html
<!-- Alpine Plugins -->
<script src="https://unpkg.com/@npetri/alpinejs-hobbykit@1.0.0/dist/plugin.min.js" defer></script>
<!-- Alpine Core -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Via NPM

```bash
npm i @npetri/alpinejs-hobbykit
```
#### As Plugin
```javascript
import Alpine from 'alpinejs'
import hobbykit from '@npetri/alpinejs-hobbykit'
Alpine.plugin(hobbykit)

window.Alpine = Alpine
window.Alpine.start()
```
##### As Single Function
All directives were available as single exports. You can use them to reduce code. Available functions:
- AlpineTimeout
- AlpineInterval
- AlpineLog
- AlpineScroll

```javascript
import Alpine from 'alpinejs'
import { AlpineInterval, AlpineLog } from '@npetri/alpinejs-hobbykit'

Alpine.directive('interval', AlpineInterval)
Alpine.directive('log', AlpineLog)

window.Alpine = Alpine
window.Alpine.start()
```

### x-interval
Evaluate the given expression at every given time-interval.
```html
<section x-data="{ counter: 0 }">
    <span x-text="counter" x-interval.1000="counter++"></span>
</section>
```
### x-timeout
Evaluate the given expression after the given time.
```html
<section x-data="{ show: false }">
    <span x-show="show" x-timeout.2000="show = true">Hidden Message</span>
</section>
```
### x-log
Logs the given expression. You can use the well known log levels warn error etcpp.
```html
<section x-data="{
    log: 'A log message via x-log.',
    error: 'An error message via x-log.',
    info: 'An info message via x-log.',
    def: 'A message via x-log invoked as fallback.'
    }">
    <span x-log="log"></span>
    <span x-log.warn="() => { return 'A warn message via x-log.' }"></span>
    <span x-log.error="error"></span>
    <span x-log.info="info"></span>
    <span x-log.jhkj="def"></span>
</section>
```
### x-scroll
Detects the browser scrolling and evaluates the given expression. A debounce or throttle modifier can be added. Remember, the scroll event is never triggered if a height of 100% or 100vh on the body tag was applied.
```html
<section>
    <style>
        .fixed-scroll-indicator {
            display: inline-block;
            position: fixed;
            bottom: 0px;
            right: 0px;
            padding: 5px;
            background-color: cadetblue;
            color: white;
            font-weight: 900;
        }
    </style>
    <script>
        const compScroll = () => { return {
            isScrollUp: false,
            isScrollDown: false
        }}
    </script>

    <div class="fixed-scroll-indicator" x-data="compScroll">
        <span x-show="isScrollUp" x-scroll:up.debounce.750="isScrollUp=true; isScrollDown=false;">Up</span>
        <span x-show="isScrollDown" x-scroll:down.throttle.750="isScrollDown=true; isScrollUp=false;">Down</span>
    </div>
</section>
```
