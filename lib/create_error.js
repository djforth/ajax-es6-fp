"use strict";

module.exports = function (reject, parse) {
  return function (err, status) {
    reject(parse(err), status);
    // throw(new Error(err));
  };
};