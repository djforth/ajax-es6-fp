const _ = require('lodash/core')

let success_status = [200, 201]
let error_status = [404, 500]


module.exports = function(status, readyState){
  if (!_.includes(success_status, 200) && readyState === 4) return -1;
  if (readyState === 4) return 1;
  return 0;
};