const _ = require('lodash/core');

module.exports = function(data){
  if (_.isUndefined(data)) return;

  return JSON.parse(data);
};
