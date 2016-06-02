var _ = require('lodash');
var add_method = require('../src/add_method');

describe('add_method', function(){
  let method;
  beforeEach(function(){
    method = add_method({param: 'param', token: 'token'}, 'some-method');
  });

  it('should just return method and csrf', function(){
    let data = method();
    expect(data._method).toEqual('some-method');
    expect(data.param).toEqual('token');
    expect(_.keys(data)).toEqual(['_method', 'param']);
  });

  it('should merge data with method and csrf', function(){
    let data = method({content: 'some-data'});
    expect(data._method).toEqual('some-method');
    expect(data.param).toEqual('token');
    expect(data.content).toEqual('some-data');
    expect(_.keys(data)).toEqual(['content', '_method', 'param']);
  });
});
