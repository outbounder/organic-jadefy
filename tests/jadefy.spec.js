var Jadefy = require("../index");
var Plasma = require("organic").Plasma;
var Chemical = require("organic").Chemical;

describe("Jadefy", function(){
  
  var plasma = new Plasma();
  var config = {
    jadeConfig: {
      pretty: true,
      debug: false
    },
    exportsGlobal: "jadefy",
    useRequireExteions: true
  };

  var instance = new Jadefy(plasma, config);
  
  it("should get template from require jade file", function(next){
    var template = jadefy(__dirname+"/data/index.jade")
    expect(typeof template).toBe("function")
    var html = template()
    expect(html).toContain("<div>index")
    next()
  });  

  it("should work as part of require.extensions", function(next){
    var template = require(__dirname+"/data/index.jade")
    expect(typeof template).toBe("function")
    var html = template()
    expect(html).toContain("<div>index")
    next()
  })

  it("should unregister require extension", function(next){
    instance.unregisterExtension()
    try {
      var template = jadefy(__dirname+"/data/index.jade")
    } catch(err){
      expect(err).toBeDefined()
      next()
    }
  })

});