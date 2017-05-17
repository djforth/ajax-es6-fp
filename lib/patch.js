(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './add_id', './add_method', './manage_headers', './get_CSRF', './create_promise', './set_request'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./add_id'), require('./add_method'), require('./manage_headers'), require('./get_CSRF'), require('./create_promise'), require('./set_request'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.add_id, global.add_method, global.manage_headers, global.get_CSRF, global.create_promise, global.set_request);
    global.patch = mod.exports;
  }
})(this, function (module, exports, _add_id, _add_method, _manage_headers, _get_CSRF, _create_promise, _set_request) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (url) {
    var rails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var csrf = void 0,
        data_set = void 0,
        headers = void 0,
        promise = void 0,
        xhr = void 0,
        url_id = void 0;
    csrf = (0, _get_CSRF2.default)();
    headers = (0, _manage_headers2.default)();

    headers.addCSRF(csrf.token);
    url_id = (0, _add_id2.default)(url);
    data_set = (0, _add_method2.default)(csrf, 'patch');

    if (rails) {
      headers.addRails();
    }

    promise = (0, _create_promise2.default)();
    xhr = (0, _set_request2.default)(promise.resolve, promise.reject);

    return function (data, id) {
      var api = id ? url_id(id) : url;
      xhr.open('PUT', api);
      headers.set(xhr.get());
      data[csrf.param] = csrf.token;
      xhr.send(data_set(data));
      return promise.promise;
    };
  };

  var _add_id2 = _interopRequireDefault(_add_id);

  var _add_method2 = _interopRequireDefault(_add_method);

  var _manage_headers2 = _interopRequireDefault(_manage_headers);

  var _get_CSRF2 = _interopRequireDefault(_get_CSRF);

  var _create_promise2 = _interopRequireDefault(_create_promise);

  var _set_request2 = _interopRequireDefault(_set_request);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  ;
  module.exports = exports['default'];
});