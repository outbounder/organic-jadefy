var Organel = require("organic").Organel;
var jade = require("jade");
var fs = require('fs');
var _ = require("underscore");

module.exports = Organel.extend(function Jadefy(plasma, config){
  Organel.call(this, plasma);

  if(config.cwd)
    for(var key in config.cwd)
      config[key] = process.cwd()+config.cwd[key];
  
  this.config = config;

  if(this.config.disposeOn)
    this.on(this.config.disposeOn, this.unregisterExtension)

  if(this.config.reactOn)
    this.on(this.config.reactOn, this.registerExtension)
  else
    this.registerExtension()

  if(this.config.reaction)
    this.reaction = require(this.config.reaction)
},{
  registerExtension: function(c){
    var self = this;
    var loader = function(module) {
      if(typeof module === "string")
        module = {filename: module, exports: null}
      var contents = fs.readFileSync(module.filename);
      var template = jade.compile(contents,_.extend(self.config.jadeConfig || {}, {
        filename: module.filename
      }));
      module.exports = function(data){
        if(!self.reaction) {
          return template(_.extend({}, c, data));
        } else {
          return template(self.reaction(_.extend({}, c, data)))
        }
      }
      return module.exports
    }
    if(this.config.useRequireExteions)
      require.extensions['.jade'] = loader
    if(this.config.exportsGlobal)
      global[this.config.exportsGlobal] = loader
    return false;
  },
  unregisterExtension: function(c){
    if(this.config.useRequireExteions)
      delete require.extensions[".jade"]
    if(this.config.exportsGlobal)
      delete global[this.config.exportsGlobal]
  }
})
