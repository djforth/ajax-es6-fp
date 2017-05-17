(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isUndefined'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isUndefined'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isUndefined);
    global.add_method = mod.exports;
  }
})(this, function (module, exports, _isUndefined2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (csrf, method) {
    var hidden = { _method: method };
    hidden[csrf.param] = csrf.token;

    return function (data) {
      if ((0, _isUndefined3.default)(data)) return hidden;

      return Object.assign(data, hidden);
    };
  };

  var _isUndefined3 = _interopRequireDefault(_isUndefined2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});