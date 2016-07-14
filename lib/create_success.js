"use strict";

module.exports = function (resolve, parse) {
  return function (response) {
    response = response ? parse(response) : response;
    resolve(response);
  };
};