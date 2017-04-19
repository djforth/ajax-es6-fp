'use strict';

var _ = require('lodash/core');

module.exports = function (csrf, method) {
  var hidden = { _method: method };
  hidden[csrf.param] = csrf.token;

  return function (data) {
    if (_.isUndefined(data)) return hidden;

    return Object.assign(data, hidden);
  };
};
//# sourceMappingURL=add_method.js.map