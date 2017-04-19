'use strict';

var _ = require('lodash/core');

module.exports = function (data) {
  if (_.isUndefined(data)) return;
  var newdata = void 0;
  try {
    newdata = JSON.parse(data);
  } catch (e) {
    newdata = data;
  }
  return newdata;
};
//# sourceMappingURL=parse.js.map