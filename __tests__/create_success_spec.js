import _ from 'lodash';
import suc from '../src/create_success';
import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();
import checkMulti from '@djforth/morse-jasmine-wp/check_multiple_calls';

describe('creates success function', function(){
  let spy, resolve;
  afterEach(()=>{
    spyManager.removeAll();
  });

  beforeEach(function(){
    spyManager.addSpy(['resolve', 'parse']);
    spyManager.addReturn('parse')('returnValue', 'parsed data');

    resolve = suc(spyManager.getSpy('resolve'), spyManager.getSpy('parse'));
    resolve('data');
  });

  afterEach(function(){
    spyManager.removeAll();
  });

  it('should return a function', function(){
    expect(_.isFunction(resolve)).toBeTruthy();
  });

  let calls = {
    parse: [()=>spyManager.getSpy('parse')
    , ()=>['data']
    ]
   , resolve: [()=>spyManager.getSpy('resolve')
    , ()=>['parsed data']
   ]
  };
  checkMulti(calls);
});
