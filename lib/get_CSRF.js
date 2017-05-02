'use strict';

// For Rails Authentication
module.exports = function () {
  var token = document.querySelector('meta[name=csrf-token]');
  var param = document.querySelector('meta[name=csrf-param]');
  return { token: token.content, param: param.content };
};