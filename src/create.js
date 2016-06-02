const xhrRequest = require('./set_request')
    , addHeaders = require('./manage_headers')
    , getCSRF = require('./get_CSRF')
    , createPromise = require('./create_promise');

module.exports = function(url, rails = true){
  var promise, xhr, headers, csrf;
  csrf = getCSRF();
  headers = addHeaders();
  headers.addCSRF(csrf.token);

  if (rails){
    headers.addRails();
  }

  promise = createPromise();

  xhr = xhrRequest(promise.resolve, promise.reject);
  headers.set(xhr.get());
  xhr.open('POST', url);

  return function(data){
    xhr.send(data);
    return promise.promise;
  };
};
