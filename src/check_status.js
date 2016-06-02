
module.exports = function(status, readyState){
  if (status !== 200 && readyState === 4) return -1;
  if (readyState === 4) return 1;
  return 0;
};
