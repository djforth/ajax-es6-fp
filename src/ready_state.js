/* eslint-disable default-case*/
export default (suc, err, status)=>(xhr)=>{
  switch (status(xhr.status, xhr.readyState)){
    case -1:
      err(xhr.responseText, xhr.statusText, xhr.status);
      break;
    case 1:
      suc(xhr.responseText);
      break;
  }
};
/* eslint-enable */
