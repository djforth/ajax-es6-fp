
import xhrRequest from './set_request';
import createPromise from './create_promise';

export default function(url){
  let promise, xhr;

  promise = createPromise();

  xhr = xhrRequest(promise.resolve, promise.reject);
  xhr.open('GET', url);
  xhr.send();

  return function(){
    return promise.promise;
  };
};
