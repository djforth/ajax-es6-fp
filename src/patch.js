import add_id from './add_id';
import addMethod from './add_method';
import addHeaders from './manage_headers';
import getCSRF from './get_CSRF';
import createPromise from './create_promise';
import xhrRequest from './set_request';

export default function(url, rails = true){
  let csrf, data_set, headers, promise, xhr, url_id;
  csrf = getCSRF();
  headers = addHeaders();

  headers.addCSRF(csrf.token);
  url_id = add_id(url);
  data_set = addMethod(csrf, 'patch');

  if (rails){
    headers.addRails();
  }

  promise = createPromise();
  xhr = xhrRequest(promise.resolve, promise.reject);

  return function(data, id){
    let api = (id) ? url_id(id) : url;
    xhr.open('PUT', api);
    headers.set(xhr.get());
    data[csrf.param] = csrf.token;
    xhr.send(data_set(data));
    return promise.promise;
  };
};
