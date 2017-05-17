
export default function(reject, parse){
  return function(err, status, statusCode){
    reject({
      error: parse(err)
      , status
      , statusCode
    });
    // throw(new Error(err));
  };
};
