"use strict";

module.exports = function () {
  var promise = void 0,
      res = void 0,
      rej = void 0;
  promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });

  return {
    promise: promise,
    reject: rej,
    resolve: res
  };
};
//# sourceMappingURL=create_promise.js.map