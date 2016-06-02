'use strict';

var _ = require('lodash/core');

function getPercent(loaded, total, computable) {
  if (!computable) return 100;
  return loaded / total * 100;
}

module.exports = function (progress) {
  if (!_.isFunction(progress)) return;

  return function (loaded, total, lengthComputable) {
    progress({
      percent: getPercent(loaded, total, lengthComputable),
      loaded: loaded,
      total: total
    });
  };
};