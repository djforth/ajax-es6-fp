
const xhrRequest = require('./set_request')
    , createPromise = require('./create_promise');

module.exports = function(url){
  let promise, xhr;

  promise = createPromise();

  xhr = xhrRequest(promise.resolve, promise.reject);
  xhr.open('GET', url);
  xhr.send();

  return function(){
    return promise.promise;
  };
};
