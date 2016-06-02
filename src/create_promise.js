module.exports = function(){
  let promise, res, rej;
  promise = new Promise(function(resolve, reject){
    res = resolve;
    rej = reject;
  });

  return {
    promise: promise
    , reject: rej
    , resolve: res
  };
};
