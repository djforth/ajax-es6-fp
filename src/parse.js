const _ = require('lodash/core');

module.exports = function(data){
  if (_.isUndefined(data)) return;
  let newdata;
  try {
    newdata = JSON.parse(data);
  } catch (e){
    newdata = data;
  }
  return newdata;
};
