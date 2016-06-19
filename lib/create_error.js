"use strict";

module.exports = function (reject) {
  return function (err) {
    reject(err);
    // throw(new Error(err));
  };
};