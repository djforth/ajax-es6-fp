import {includes} from 'lodash';

let success_status = [200, 201, 204];
// let error_status = [404, 500];

export default function(status, readyState){
  if (!includes(success_status, status) && readyState === 4) return -1;
  if (readyState === 4) return 1;
  return 0;
};
