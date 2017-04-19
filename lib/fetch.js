'use strict';

var xhrRequest = require('./set_request'),
    createPromise = require('./create_promise');

module.exports = function (url) {
  var promise = void 0,
      xhr = void 0;

  promise = createPromise();

  xhr = xhrRequest(promise.resolve, promise.reject);
  xhr.open('GET', url);
  xhr.send();

  return function () {
    return promise.promise;
  };
};
//# sourceMappingURL=fetch.js.map