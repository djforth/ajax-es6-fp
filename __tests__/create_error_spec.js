import _ from 'lodash';
import err from '../src/create_error';

import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();

describe('creates error method', function(){
  afterEach(()=>{
    spyManager.removeAll();
  });

  let spy, reject;
  beforeEach(function(){
    spyManager.addSpy(['reject', 'parse']);
    spyManager.addReturn('parse')('returnValue', 'error');
    reject = err(spyManager.getSpy('reject'), spyManager.getSpy('parse'));
  });

  afterEach(function(){
    spyManager.removeAll();
  });

  it('should return function', function(){
    expect(_.isFunction(reject)).toBeTruthy();
  });

  it('should call spy and throw error', function(){
    reject('error', 'can\'t be found', 404);

    expect(spyManager.getSpy('reject')).toHaveBeenCalledWith({error: 'error', status: 'can\'t be found', statusCode: 404});
    expect(spyManager.getSpy('parse')).toHaveBeenCalledWith('error');
  });
});
