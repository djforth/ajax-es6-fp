import {clone, isArray, reject} from 'lodash';
// _.reject = require('lodash/reject');

const addHeaders = (headers, token)=>{
  headers = clone(headers);
  if (isArray(token)){
    headers = headers.concat(token);
  } else {
    headers.push(token);
  }
  return headers;
};

export default function(){
  let headers = [];

  const obj = {
    add: function(token){
      headers = addHeaders(headers, token);
      return obj;
    }
    , addDelete: function(){
      headers = addHeaders(headers
        , {header: 'X-Http-Method-Override', value: 'delete'}
      );
      return obj;
    }
    , addCSRF: function(token){
      headers = addHeaders(headers, {header: 'X-CSRF-Token', value: token});

      return obj;
    }
    , addRails: function(){
      /* eslint-disable max-len */
      headers = addHeaders(headers, [
        {header: 'Content-type', value: 'application/json'}
        , {header: 'accept', value: '*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'}]);
      /* eslint-enable */
      return obj;
    }
    , all: ()=>headers
    , clear: function(){
      headers = [];
    }
    , remove: function(header){
      headers = reject(headers, (h)=>{
        return h.header === header;
      });
    }
    , set: function(xhr){
      headers.forEach(function(h){
        xhr.setRequestHeader(h.header, h.value);
      });
    }
  };

  return obj;
};
