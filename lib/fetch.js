(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './set_request', './create_promise'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./set_request'), require('./create_promise'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.set_request, global.create_promise);
    global.fetch = mod.exports;
  }
})(this, function (module, exports, _set_request, _create_promise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (url) {
    var promise = void 0,
        xhr = void 0;

    promise = (0, _create_promise2.default)();

    xhr = (0, _set_request2.default)(promise.resolve, promise.reject);
    xhr.open('GET', url);
    xhr.send();

    return function () {
      return promise.promise;
    };
  };

  var _set_request2 = _interopRequireDefault(_set_request);

  var _create_promise2 = _interopRequireDefault(_create_promise);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});