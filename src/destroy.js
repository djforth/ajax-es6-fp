const add_id = require('./add_id')
    , addMethod = require('./add_method')
    , addHeaders = require('./manage_headers')
    , getCSRF = require('./get_CSRF')
    , createPromise = require('./create_promise')
    , xhrRequest = require('./set_request');

module.exports = function(url, rails = true){
  var csrf, data_set, headers, promise, xhr, url_id;
  csrf = getCSRF();
  headers = addHeaders();

  headers.addCSRF(csrf.token);
  url_id = add_id(url);
  data_set = addMethod(csrf, 'delete');
  if (rails){
    headers.addRails();
  }

  promise = createPromise();

  xhr = xhrRequest(promise.resolve, promise.reject);


  return function(id){
    xhr.open('POST', url_id(id));
    // data[csrf.param] = csrf.token;
    headers.set(xhr.get());
    xhr.send(data_set());
    return promise.promise;
  };
};
