(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.get_CSRF = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    var token = document.querySelector('meta[name=csrf-token]');
    var param = document.querySelector('meta[name=csrf-param]');
    return { token: token.content, param: param.content };
  };

  ; // For Rails Authentication
  module.exports = exports['default'];
});