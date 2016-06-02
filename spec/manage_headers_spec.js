const _ = require('lodash');

var manage_headers = require('../src/manage_headers');

const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , getMod     = require("@djforth/morse-jasmine/get_module")(manage_headers)
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(manage_headers)

describe('manage headers', function() {
  describe('addHeaders', function() {
    let addHeaders;
    beforeEach(function() {
      addHeaders = getMod("addHeaders");
    });

    it('should add to array', function() {
      let headers = addHeaders(["h1"], "h2");
      expect(headers.length).toEqual(2);
      expect(headers).toContain("h1");
      expect(headers).toContain("h2");
    });

    it('should combine array', function() {
      let headers = addHeaders(["h1"], ["h2", "h3"]);
      expect(headers.length).toEqual(3);
      expect(headers).toContain("h3");
      expect(headers).toContain("h2");
    });
  });

  describe('methods', function() {
    let headers;
    beforeEach(function () {
      stubs.addSpy("addHeaders");

      stubs.getSpy("addHeaders").and.callFake((array, token)=>{
        if(_.isArray(token)){
          array = array.concat(token);
        } else {
          array.push(token);
        }
        return array;
      });

      headers = manage_headers();
    });

    afterEach(function () {
      stubs.revertAll();
      spyManager.removeAll();
    });

    it('should return object of methods', function() {
      expect(_.isPlainObject(headers)).toBeTruthy();
    });

    it('should add to Headers', function() {
      headers.add('h1');
      expect(stubs.getSpy("addHeaders")).toHaveBeenCalled()
      expect(headers.all()).toEqual(['h1']);
    });

    it('should add delete headers', function() {
      headers.addDelete();
      expect(stubs.getSpy("addHeaders")).toHaveBeenCalled()
      expect(headers.all()).toContain({header:"X-Http-Method-Override", value:"delete"});
    });

    it('should add CSRF headers', function() {
      headers.addCSRF("token");
      expect(stubs.getSpy("addHeaders")).toHaveBeenCalled()
      expect(headers.all()).toContain({header:"X-CSRF-Token", value:"token"});
    });

    it('should add Rails headers', function() {
      headers.addRails();
      expect(stubs.getSpy("addHeaders")).toHaveBeenCalled()
      expect(headers.all()).toContain({header: "Content-type", value: "application/json"});
      expect(headers.all()).toContain({header: "accept", value: "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"});
    });

    it('should remove headers', function() {
      headers.add([{header:"header1", value:"foo"}]);
      expect(headers.all()).toContain({header:"header1", value:"foo"});
      headers.remove("header1");
      expect(headers.all()).not.toContain({header:"header1", value:"foo"});


    });

    it('should set headers', function() {
      spyManager.addSpy({title:"xhr", opts:["setRequestHeader"]});

      headers.add([{header:'h1', value:"foo"}, {header:'h2', value:"bar"}]);
      let xhr = spyManager.getSpy("xhr");
      headers.set(xhr);

      expect(xhr.setRequestHeader).toHaveBeenCalledTimes(2);
      let calls = xhr.setRequestHeader.calls.argsFor(0)
      expect(calls[0]).toEqual("h1");
      expect(calls[1]).toEqual("foo");
    });
  });
});