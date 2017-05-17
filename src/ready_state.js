/* eslint-disable default-case*/
export default function(suc, err, status){
  return function(xhr){
    switch (status(xhr.status, xhr.readyState)){
      case -1:
        err(xhr.responseText, xhr.statusText, xhr.status);
        break;
      case 1:
        suc(xhr.responseText);
        break;
    }
  };
};
/* eslint-enable */
