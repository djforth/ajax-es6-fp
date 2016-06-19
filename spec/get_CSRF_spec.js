var _ = require('lodash');

const createEl = require("@djforth/morse-jasmine/create_elements").create

var getCSRF = require('../src/get_CSRF');

describe('getCSRF', function() {
  let token, param, csrf;
  beforeEach(function() {
    token = createEl("meta")
    token.addId("token")
        .addAttribute({
          name:"csrf-token"
        , content:"token"
        })
        .append();
    param = createEl("meta")
    param.addId("param")
        .addAttribute({
          name:"csrf-param"
        , content:"param"
        })
        .append();

    csrf = getCSRF()
  });

  afterEach(function(){
    token.remove();
    param.remove();
  });

  it('should return correct tokens', function() {
    expect(csrf.token).toEqual("token");
    expect(csrf.param).toEqual("param");
  });
});