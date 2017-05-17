(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/reject', 'lodash/isArray', 'lodash/clone'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/reject'), require('lodash/isArray'), require('lodash/clone'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.reject, global.isArray, global.clone);
    global.manage_headers = mod.exports;
  }
})(this, function (module, exports, _reject2, _isArray2, _clone2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    var headers = [];

    var obj = {
      add: function add(token) {
        headers = addHeaders(headers, token);
        return obj;
      },
      addDelete: function addDelete() {
        headers = addHeaders(headers, { header: 'X-Http-Method-Override', value: 'delete' });
        return obj;
      },
      addCSRF: function addCSRF(token) {
        headers = addHeaders(headers, { header: 'X-CSRF-Token', value: token });

        return obj;
      },
      addRails: function addRails() {
        /* eslint-disable max-len */
        headers = addHeaders(headers, [{ header: 'Content-type', value: 'application/json' }, { header: 'accept', value: '*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' }]);
        /* eslint-enable */
        return obj;
      },
      all: function all() {
        return headers;
      },
      clear: function clear() {
        headers = [];
      },
      remove: function remove(header) {
        headers = (0, _reject3.default)(headers, function (h) {
          return h.header === header;
        });
      },
      set: function set(xhr) {
        headers.forEach(function (h) {
          xhr.setRequestHeader(h.header, h.value);
        });
      }
    };

    return obj;
  };

  var _reject3 = _interopRequireDefault(_reject2);

  var _isArray3 = _interopRequireDefault(_isArray2);

  var _clone3 = _interopRequireDefault(_clone2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // _.reject = require('lodash/reject');

  function addHeaders(headers, token) {
    headers = (0, _clone3.default)(headers);
    if ((0, _isArray3.default)(token)) {
      headers = headers.concat(token);
    } else {
      headers.push(token);
    }
    return headers;
  }

  ;
  module.exports = exports['default'];
});