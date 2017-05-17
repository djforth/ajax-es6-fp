import {isFunction} from 'lodash';

function getPercent(loaded, total, computable){
  if (!computable) return 100;
  return ((loaded / total) * 100);
}

export default function(progress){
  if (!isFunction(progress)) return;

  return function(loaded, total, lengthComputable){
    progress({
      percent: getPercent(loaded, total, lengthComputable)
      , loaded: loaded
      , total: total
    });
  };
};
