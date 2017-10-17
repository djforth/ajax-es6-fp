import {isFunction} from 'lodash';

import checkStatus from './check_status';
import errorFn from './create_error';
import parseData from './parse';
import progressFn from './set_progress';
import successFn from './create_success';
import readyState from './ready_state';

function addError(xhr, err){
  xhr.addEventListener('error', function(evt){
    err(`Network Error: ${evt.error.message}`);
  });

  xhr.addEventListener('abort', function(evt){
    err(`Network Abort: ${evt.error.message}`);
  });
}

function addProgress(xhr, prog){
  let check_prog = progressFn(prog);
  xhr.addEventListener('progress', function(evt){
    check_prog(evt.loaded, evt.total, evt.lengthComputable);
  });
}

function addReadyState(xhr, stateChange){
  // console.log()
  xhr.addEventListener('readystatechange', function(){
    stateChange(xhr);
  });
}

export default function(resolve, reject){
  let err, stateChange, suc;
  const xhr = new XMLHttpRequest();
  err = errorFn(reject, parseData);
  suc = successFn(resolve, parseData);
  stateChange = readyState(suc, err, checkStatus);
  addError(xhr, err);
  addReadyState(xhr, stateChange);

  const obj = {
    progress: function(prog){
      if (!isFunction(prog)) return obj;
      addProgress(xhr, prog);
      return obj;
    }
    , get: ()=>xhr
    , open: function(state, url){
      xhr.open(state, url, true);
      return obj;
    }
    , send: function(send){
      let data = (send) ? JSON.stringify(send) : null;
      xhr.send(data);
    }
  };

  return obj;
};
