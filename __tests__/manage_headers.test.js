import _ from 'lodash';

import manage_headers from '../src/manage_headers';

import SpyManager from '@djforth/stubs-spy-manager-jest';
import CallHelper from '@djforth/jest-call-helpers';

describe('manage headers', function(){
  const stubsSpies = SpyManager(manage_headers);
  const callHelper = CallHelper(stubsSpies);
  afterEach(()=>{
    stubsSpies.reset();
  });
  describe('addHeaders', function(){
    let addHeaders;
    beforeEach(function(){
      addHeaders = stubsSpies.getFn('addHeaders');
    });

    it('should add to array', function(){
      let headers = addHeaders(['h1'], 'h2');
      expect(headers.length).toEqual(2);
      expect(headers).toContain('h1');
      expect(headers).toContain('h2');
    });

    it('should combine array', function(){
      let headers = addHeaders(['h1'], ['h2', 'h3']);
      expect(headers.length).toEqual(3);
      expect(headers).toContain('h3');
      expect(headers).toContain('h2');
    });
  });

  describe('methods', function(){
    let headers;
    beforeEach(function(){
      stubsSpies.add([{
        stub: 'addHeaders'
        , callback: (array, token)=>{
          if (_.isArray(token)){
            array = array.concat(token);
          } else {
            array.push(token);
          }
          return array;
        }
      }]);
      stubsSpies.make();
      headers = manage_headers();
    });

    it('should return object of methods', function(){
      expect(_.isPlainObject(headers)).toBeTruthy();
    });

    it('should add to Headers', function(){
      headers.add('h1');
      expect(stubsSpies.get('addHeaders')).toHaveBeenCalled();
      expect(headers.all()).toEqual(['h1']);
    });

    it('should add delete headers', function(){
      headers.addDelete();
      expect(stubsSpies.get('addHeaders')).toHaveBeenCalled();
      expect(headers.all()).toEqual([{header: 'X-Http-Method-Override', value: 'delete'}]);
    });

    it('should add CSRF headers', function(){
      headers.addCSRF('token');
      expect(stubsSpies.get('addHeaders')).toHaveBeenCalled();
      expect(headers.all()).toEqual([{header: 'X-CSRF-Token', value: 'token'}]);
    });

    it('should add Rails headers', function(){
      headers.addRails();
      expect(stubsSpies.get('addHeaders')).toHaveBeenCalled();
      expect(headers.all()[0]).toEqual(expect.objectContaining({header: 'Content-type', value: 'application/json'}));
    });

    it('should remove headers', function(){
      headers.add([{header: 'header1', value: 'foo'}]);
      expect(headers.all()[0]).toEqual(expect.objectContaining({header: 'header1', value: 'foo'}));
      headers.remove('header1');
      expect(headers.all()[0]).not.toEqual(expect.objectContaining({header: 'header1', value: 'foo'}));
    });

    it('should set headers', function(){
      stubsSpies.add([
        {
          spy: 'xhr.setRequestHeader'
        }
      ]);
      stubsSpies.make();

      headers.add([{header: 'h1', value: 'foo'}, {header: 'h2', value: 'bar'}]);
      let xhr = stubsSpies.get('xhr');
      headers.set(xhr);

      expect(xhr.setRequestHeader).toHaveBeenCalledTimes(2);
      let calls = xhr.setRequestHeader.mock.calls[0];
      expect(calls[0]).toEqual('h1');
      expect(calls[1]).toEqual('foo');
    });
  });
});
