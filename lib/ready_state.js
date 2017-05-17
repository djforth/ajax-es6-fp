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
    global.ready_state = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (suc, err, status) {
    return function (xhr) {
      switch (status(xhr.status, xhr.readyState)) {
        case -1:
          err(xhr.responseText, xhr.statusText, xhr.status);
          break;
        case 1:
          suc(xhr.responseText);
          break;
      }
    };
  };

  ;
  /* eslint-enable */
  /* eslint-disable default-case*/
  module.exports = exports["default"];
});