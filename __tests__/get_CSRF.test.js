// import {create as createEl} from'@djforth/morse-jasmine-wp/create_elements';
import {readFileSync} from 'fs';
import {join} from 'path';
import getCSRF from '../src/get_CSRF';

const htmlPath = join(__dirname, '../__markup__/token.html');
const markup = readFileSync(htmlPath);

describe('getCSRF', function(){
  let token, param, csrf;
  beforeEach(function(){
    document.body.innerHTML = markup.toString();
    csrf = getCSRF();
  });

  it('should return correct tokens', function(){
    expect(csrf.token).toEqual('token');
    expect(csrf.param).toEqual('param');
  });
});
