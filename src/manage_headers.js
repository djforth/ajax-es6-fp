const _  = require('lodash/core');
_.reject = require('lodash/reject');

function addHeaders(headers, token){
  headers = _.clone(headers);
  if (_.isArray(token)){
    headers = headers.concat(token);
  } else {
    headers.push(token);
  }
  return headers;
}

module.exports = function(){
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
      headers = _.reject(headers, (h)=>{
        return h.header === header;
      });
    }
    , set: function(xhr){
      _.forEach(headers, function(h){
        xhr.setRequestHeader(h.header, h.value);
      });
    }
  };

  return obj;
};
