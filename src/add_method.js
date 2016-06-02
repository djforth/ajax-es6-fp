const _ = require('lodash/core');

module.exports = function(csrf, method){
  let hidden = {_method: method};
  hidden[csrf.param] = csrf.token;

  return function(data){
    if (_.isUndefined(data)) return hidden;

    return Object.assign(data, hidden);
  };
};
