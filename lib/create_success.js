"use strict";

module.exports = function (resolve, parse) {
  return function (response) {
    resolve(parse(response));
  };
};