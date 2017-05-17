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
    global.create_error = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (reject, parse) {
    return function (err, status, statusCode) {
      reject({
        error: parse(err),
        status: status,
        statusCode: statusCode
      });
      // throw(new Error(err));
    };
  };

  ;
  module.exports = exports["default"];
});