"use strict";

module.exports = function (reject, parse) {
  return function (err, status, statusCode) {
    reject({
      error: parse(err),
      status: status,
      statusCode: statusCode
    });
    // throw(new Error(err));
  };
};
//# sourceMappingURL=create_error.js.map