(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/includes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/includes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.includes);
    global.check_status = mod.exports;
  }
})(this, function (module, exports, _includes2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (status, readyState) {
    if (!(0, _includes3.default)(success_status, status) && readyState === 4) return -1;
    if (readyState === 4) return 1;
    return 0;
  };

  var _includes3 = _interopRequireDefault(_includes2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var success_status = [200, 201, 204];
  // let error_status = [404, 500];

  ;
  module.exports = exports['default'];
});