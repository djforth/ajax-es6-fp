import {isUndefined} from 'lodash';

export default function(csrf, method){
  let hidden = {_method: method};
  hidden[csrf.param] = csrf.token;

  return function(data){
    if (isUndefined(data)) return hidden;

    return Object.assign(data, hidden);
  };
};
