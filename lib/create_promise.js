(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.create_promise = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    var promise = void 0,
        res = void 0,
        rej = void 0;
    promise = new Promise(function (resolve, reject) {
      res = resolve;
      rej = reject;
    });

    return {
      promise: promise,
      reject: rej,
      resolve: res
    };
  };

  ;
  module.exports = exports["default"];
});