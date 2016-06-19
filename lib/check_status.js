'use strict';

var _ = require('lodash/core');

var success_status = [200, 201];
var error_status = [404, 500];

module.exports = function (status, readyState) {
  if (!_.includes(success_status, 200) && readyState === 4) return -1;
  if (readyState === 4) return 1;
  return 0;
};