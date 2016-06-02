'use strict';

var _ = require('lodash/core');
_.reject = require('lodash/reject');

function addHeaders(headers, token) {
  headers = _.clone(headers);
  if (_.isArray(token)) {
    headers = headers.concat(token);
  } else {
    headers.push(token);
  }
  return headers;
}

module.exports = function () {
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
      headers = _.reject(headers, function (h) {
        return h.header === header;
      });
    },
    set: function set(xhr) {
      _.forEach(headers, function (h) {
        xhr.setRequestHeader(h.header, h.value);
      });
    }
  };

  return obj;
};