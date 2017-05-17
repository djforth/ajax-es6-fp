(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash/isFunction', './check_status', './create_error', './parse', './set_progress', './create_success', './ready_state'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash/isFunction'), require('./check_status'), require('./create_error'), require('./parse'), require('./set_progress'), require('./create_success'), require('./ready_state'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.isFunction, global.check_status, global.create_error, global.parse, global.set_progress, global.create_success, global.ready_state);
    global.set_request = mod.exports;
  }
})(this, function (module, exports, _isFunction2, _check_status, _create_error, _parse, _set_progress, _create_success, _ready_state) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (resolve, reject) {
    var err = void 0,
        stateChange = void 0,
        suc = void 0;
    var xhr = new XMLHttpRequest();
    err = (0, _create_error2.default)(reject, _parse2.default);
    suc = (0, _create_success2.default)(resolve, _parse2.default);
    stateChange = (0, _ready_state2.default)(suc, err, _check_status2.default);

    addError(xhr, err);
    addReadyState(xhr, stateChange);

    var obj = {
      progress: function progress(prog) {
        if (!(0, _isFunction3.default)(prog)) return obj;
        addProgress(xhr, prog);
        return obj;
      },
      get: function get() {
        return xhr;
      },
      open: function open(state, url) {
        xhr.open(state, url, true);
        return obj;
      },
      send: function send(_send) {
        var data = _send ? JSON.stringify(_send) : null;
        xhr.send(data);
      }
    };

    return obj;
  };

  var _isFunction3 = _interopRequireDefault(_isFunction2);

  var _check_status2 = _interopRequireDefault(_check_status);

  var _create_error2 = _interopRequireDefault(_create_error);

  var _parse2 = _interopRequireDefault(_parse);

  var _set_progress2 = _interopRequireDefault(_set_progress);

  var _create_success2 = _interopRequireDefault(_create_success);

  var _ready_state2 = _interopRequireDefault(_ready_state);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function addError(xhr, err) {
    xhr.addEventListener('error', function (evt) {
      err('Network Error: ' + evt.error.message);
    });

    xhr.addEventListener('abort', function (evt) {
      err('Network Abort: ' + evt.error.message);
    });
  }

  function addProgress(xhr, prog) {
    var check_prog = (0, _set_progress2.default)(prog);
    xhr.addEventListener('progress', function (evt) {
      check_prog(evt.loaded, evt.total, evt.lengthComputable);
    });
  }

  function addReadyState(xhr, stateChange) {
    xhr.addEventListener('readystatechange', function () {
      stateChange(xhr);
    });
  }

  ;
  module.exports = exports['default'];
});