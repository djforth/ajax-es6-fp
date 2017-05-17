import {isUndefined} from 'lodash';

export default function(data){
  if (isUndefined(data)) return;
  let newdata;
  try {
    newdata = JSON.parse(data);
  } catch (e){
    newdata = data;
  }
  return newdata;
};
