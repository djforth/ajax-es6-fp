(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './set_request', './manage_headers', './get_CSRF', './create_promise'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./set_request'), require('./manage_headers'), require('./get_CSRF'), require('./create_promise'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.set_request, global.manage_headers, global.get_CSRF, global.create_promise);
    global.create = mod.exports;
  }
})(this, function (module, exports, _set_request, _manage_headers, _get_CSRF, _create_promise) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (url) {
    var rails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var promise = void 0,
        xhr = void 0,
        headers = void 0,
        csrf = void 0;
    csrf = (0, _get_CSRF2.default)();
    headers = (0, _manage_headers2.default)();
    headers.addCSRF(csrf.token);

    if (rails) {
      headers.addRails();
    }

    promise = (0, _create_promise2.default)();

    xhr = (0, _set_request2.default)(promise.resolve, promise.reject);
    xhr.open('POST', url);
    headers.set(xhr.get());

    return function (data) {
      data[csrf.param] = csrf.token;
      xhr.send(data);
      return promise.promise;
    };
  };

  var _set_request2 = _interopRequireDefault(_set_request);

  var _manage_headers2 = _interopRequireDefault(_manage_headers);

  var _get_CSRF2 = _interopRequireDefault(_get_CSRF);

  var _create_promise2 = _interopRequireDefault(_create_promise);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});