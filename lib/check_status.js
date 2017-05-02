'use strict';

var _ = require('lodash/core');
_.includes = require('lodash/includes');

var success_status = [200, 201, 204];
// let error_status = [404, 500];

module.exports = function (status, readyState) {
  if (!_.includes(success_status, status) && readyState === 4) return -1;
  if (readyState === 4) return 1;
  return 0;
};