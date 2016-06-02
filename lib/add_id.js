"use strict";

module.exports = function add_id(url) {
  return function (id) {
    return url + "/" + id;
  };
};