import xhrRequest from './set_request';
import addHeaders from './manage_headers';
import getCSRF from './get_CSRF';
import createPromise from './create_promise';

export default function(url, rails = true){
  let promise, xhr, headers, csrf;
  csrf = getCSRF();
  headers = addHeaders();
  headers.addCSRF(csrf.token);

  if (rails){
    headers.addRails();
  }

  promise = createPromise();

  xhr = xhrRequest(promise.resolve, promise.reject);
  xhr.open('POST', url);
  headers.set(xhr.get());

  return function(data){
    data[csrf.param] = csrf.token;
    xhr.send(data);
    return promise.promise;
  };
};
