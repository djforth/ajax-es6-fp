// For Rails Authentication
export default function(){
  let token = document.querySelector('meta[name=csrf-token]');
  let param = document.querySelector('meta[name=csrf-param]');
  return {token: token.content, param: param.content};
};
