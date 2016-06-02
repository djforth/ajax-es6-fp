'use strict';

var xhrRequest = require('./set_request'),
    addHeaders = require('./manage_headers'),
    getCSRF = require('./get_CSRF'),
    createPromise = require('./create_promise');

module.exports = function (url) {
  var rails = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  var promise, xhr, headers, csrf;
  csrf = getCSRF();
  headers = addHeaders();
  headers.addCSRF(csrf.token);

  if (rails) {
    headers.addRails();
  }

  promise = createPromise();

  xhr = xhrRequest(promise.resolve, promise.reject);
  headers.set(xhr.get());
  xhr.open('POST', url);

  return function (data) {
    xhr.send(data);
    return promise.promise;
  };
};