var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/lodash.debounce/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.debounce/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var nativeMax = Math.max;
    var nativeMin = Math.min;
    var now = function() {
      return root.Date.now();
    };
    function debounce3(func, wait, options) {
      var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = toNumber(wait) || 0;
      if (isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
      }
      function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = void 0;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
      }
      function leadingEdge(time) {
        lastInvokeTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? invokeFunc(time) : result;
      }
      function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
        return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
      }
      function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
      }
      function timerExpired() {
        var time = now();
        if (shouldInvoke(time)) {
          return trailingEdge(time);
        }
        timerId = setTimeout(timerExpired, remainingWait(time));
      }
      function trailingEdge(time) {
        timerId = void 0;
        if (trailing && lastArgs) {
          return invokeFunc(time);
        }
        lastArgs = lastThis = void 0;
        return result;
      }
      function cancel() {
        if (timerId !== void 0) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = void 0;
      }
      function flush() {
        return timerId === void 0 ? result : trailingEdge(now());
      }
      function debounced() {
        var time = now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
          if (timerId === void 0) {
            return leadingEdge(lastCallTime);
          }
          if (maxing) {
            timerId = setTimeout(timerExpired, wait);
            return invokeFunc(lastCallTime);
          }
        }
        if (timerId === void 0) {
          timerId = setTimeout(timerExpired, wait);
        }
        return result;
      }
      debounced.cancel = cancel;
      debounced.flush = flush;
      return debounced;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = debounce3;
  }
});

// node_modules/lodash.isnumber/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.isnumber/index.js"(exports, module) {
    var numberTag = "[object Number]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && objectToString.call(value) == numberTag;
    }
    module.exports = isNumber;
  }
});

// src/timeout.js
function AlpineTimeout(el, { value, modifiers, expression }, { evaluateLater, effect, cleanup }) {
  if (!modifiers.length) {
    console.error(`x-timeout: Missing arguments.`);
    return;
  }
  if (modifiers.length > 1) {
    console.error(`x-timeout: One modifier expected but ${modifiers.length} was given. Additional modifiers will be ignored.`);
  }
  const timeout = Number(modifiers[0].split("ms")[0]);
  if (!timeout) {
    console.error(`x-timeout: Invalid timeout value: ${modifiers[0]}.`);
    return;
  }
  let timeout_id = setTimeout(evaluateLater(expression), timeout);
  cleanup(() => clearTimeout(timeout_id));
}

// src/interval.js
function AlpineInterval(el, { value, modifiers, expression }, { evaluateLater, effect, cleanup }) {
  if (!modifiers.length) {
    console.error(`x-interval: Missing arguments.`);
    return;
  }
  if (modifiers.length > 1) {
    console.error(`x-interval: One modifier expected but ${modifiers.length} was given. Additional modifiers will be ignored.`);
  }
  const interval = Number(modifiers[0].split("ms")[0]);
  if (!interval) {
    console.error(`x-interval: Invalid interval value: ${modifiers[0]}.`);
    return;
  }
  let interval_id = setInterval(evaluateLater(expression), interval);
  cleanup(() => clearTimeout(interval_id));
}

// src/log.js
function AlpineLog(el, obj, { evaluateLater, effect, cleanup }) {
  let { value, expression, modifiers } = obj;
  if (modifiers.length > 1) {
    console.error(`x-log: One modifier expected but ${modifiers.length} was given. Additional modifiers will be ignored.`);
    console.log(expression);
    return;
  }
  switch (modifiers[0]) {
    case "":
    case "log":
      console.log(expression);
      break;
    case "info":
      console.info(expression);
      break;
    case "warn":
      console.warn(expression);
      break;
    case "error":
      console.error(expression);
      break;
    case "debug":
      console.debug(expression);
      break;
    default:
      console.error(`x-log: Unkown modifier was given. log will be used.`);
      console.log(expression);
      break;
  }
}

// src/scroll.js
var import_lodash = __toModule(require_lodash());
var import_lodash2 = __toModule(require_lodash2());
function AlpineScroll(el, { value, expression, modifiers }, { evaluateLater, effect, cleanup }) {
  let evaluate = evaluateLater(expression);
  const dir_up = value && value.includes("up");
  const dir_down = value && value.includes("down");
  if (!(value && (dir_down || dir_up))) {
    console.error(`x-scroll: Unkonwn value: '${value}' given.`);
    return;
  }
  let time = 0;
  if (modifiers.includes("debounce")) {
    let idx = modifiers.indexOf("debounce");
    time = Number(modifiers[idx + 1].split("ms"));
    if (!(0, import_lodash2.isNumeric)(time)) {
      console.error(`x-scroll: Invalid debounce value: ${modifiers[idx + 1]}.`);
      return;
    }
  }
  let old_y_pos = void 0;
  let new_y_pos = void 0;
  let handler = () => {
    if (!value) {
      evaluate();
    } else {
      if (old_y_pos === void 0) {
        old_y_pos = window.pageYOffset;
      }
      new_y_pos = window.pageYOffset;
      if (dir_up && old_y_pos - new_y_pos > 1) {
        evaluate();
      } else if (dir_down && new_y_pos - old_y_pos > 1) {
        evaluate();
      }
      old_y_pos = new_y_pos;
    }
  };
  window.addEventListener("scroll", (0, import_lodash.debounce)(handler, time));
  cleanup(() => window.removeEventListener("scroll", handler));
}

// src/wrap.js
var import_lodash3 = __toModule(require_lodash());
var import_lodash4 = __toModule(require_lodash2());
function AlpineWrap(el, { value, modifiers, expression }, { evaluateLater, effect, cleanup }) {
  console.info("%cx-wrap: This derective is still experimental. Checkout documentation on github.", "color: white;background-color: #FFBF00; font-weight: bold; padding-left: 5px; padding-right: 5px;");
  let styles = window.getComputedStyle(el);
  if (!styles.getPropertyValue("display").includes("flex") || styles.getPropertyValue("flex-direction") !== "row") {
    console.error("x-wrap: The wrap directive only applies to flex-row elements, otherwise results are unexpected.");
  }
  if (value.includes("leave")) {
    el._x_wrap_evaluate_unwrap = expression && evaluateLater(expression);
  } else if (value.includes("enter")) {
    el._x_wrap_evaluate_wrap = expression && evaluateLater(expression);
  } else {
    el._x_wrap_evaluate_wrap = expression && evaluateLater(expression);
  }
  let wait = 10;
  if (modifiers.includes("debounce")) {
    let nextModifier = modifiers[modifiers.indexOf("debounce") + 1];
    if (nextModifier && (0, import_lodash4.isNumeric)(nextModifier.split("ms")[0])) {
      wait = Number(nextModifier.split("ms")[0]);
    } else {
      wait = 10;
      console.error(`x-wrap: Unexpected debounce value. ${wait}ms will be applied.`);
    }
  }
  let wrapped_x_val = null;
  console.log(wait);
  let resize_handler = (0, import_lodash3.debounce)(() => {
    let last_x_pos = 0;
    let just_wrapped = false;
    if (wrapped_x_val && wrapped_x_val > window.innerWidth) {
      return;
    } else if (wrapped_x_val && wrapped_x_val < window.innerWidth) {
      el._x_wrap_evaluate_unwrap();
      wrapped_x_val = null;
    }
    for (let sib = el.firstElementChild; sib; sib = sib.nextElementSibling) {
      let rect = sib.getBoundingClientRect();
      just_wrapped = rect.left < last_x_pos;
      last_x_pos = rect.left;
      if (just_wrapped) {
        wrapped_x_val = window.innerWidth;
        break;
      }
    }
    if (just_wrapped) {
      el._x_wrap_evaluate_wrap();
    }
  }, wait);
  resize_handler();
  if (!el._x_wrap_listener) {
    el._x_wrap_listener = true;
    window.addEventListener("resize", resize_handler);
  }
  cleanup(() => window.removeEventListener("resize", resize_handler));
}

// src/index.js
function src_default(Alpine) {
  Alpine.directive("timeout", AlpineTimeout);
  Alpine.directive("interval", AlpineInterval);
  Alpine.directive("log", AlpineLog);
  Alpine.directive("scroll", AlpineScroll);
  Alpine.directive("wrap", AlpineWrap);
}

// builds/module.js
var module_default = src_default;
export {
  module_default as default
};
