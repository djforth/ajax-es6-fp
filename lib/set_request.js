'use strict';

var _ = require('lodash/core');

var checkStatus = require('./check_status'),
    errorFn = require('./create_error'),
    parseData = require('./parse'),
    progressFn = require('./set_progress'),
    successFn = require('./create_success'),
    readyState = require('./ready_state');

function addError(xhr, err) {
  xhr.addEventListener('error', function (evt) {
    err('Network Error: ' + evt.error.message);
  });

  xhr.addEventListener('abort', function (evt) {
    err('Network Abort: ' + evt.error.message);
  });
}

function addProgress(xhr, prog) {
  var check_prog = progressFn(prog);
  xhr.addEventListener('progress', function (evt) {
    check_prog(evt.loaded, evt.total, evt.lengthComputable);
  });
}

function addReadyState(xhr, stateChange) {
  xhr.addEventListener('readystatechange', function () {
    stateChange(xhr);
  });
}

module.exports = function (resolve, reject) {
  var err = void 0,
      stateChange = void 0,
      suc = void 0;
  var xhr = new XMLHttpRequest();
  err = errorFn(reject, parseData);
  suc = successFn(resolve, parseData);
  stateChange = readyState(suc, err, checkStatus);

  addError(xhr, err);
  addReadyState(xhr, stateChange);

  var obj = {
    progress: function progress(prog) {
      if (!_.isFunction(prog)) return obj;
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