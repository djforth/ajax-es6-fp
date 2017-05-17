(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isFunction'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isFunction'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isFunction);
    global.set_progress = mod.exports;
  }
})(this, function (module, exports, _isFunction2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (progress) {
    if (!(0, _isFunction3.default)(progress)) return;

    return function (loaded, total, lengthComputable) {
      progress({
        percent: getPercent(loaded, total, lengthComputable),
        loaded: loaded,
        total: total
      });
    };
  };

  var _isFunction3 = _interopRequireDefault(_isFunction2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function getPercent(loaded, total, computable) {
    if (!computable) return 100;
    return loaded / total * 100;
  }

  ;
  module.exports = exports['default'];
});