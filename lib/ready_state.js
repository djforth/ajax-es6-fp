"use strict";

/* eslint-disable default-case*/
module.exports = function (suc, err, status) {
  return function (xhr) {
    switch (status(xhr.status, xhr.readyState)) {
      case -1:
        err(xhr.statusText);
        break;
      case 1:
        suc(xhr.responseText);
        break;
    }
  };
};
/* eslint-enable */