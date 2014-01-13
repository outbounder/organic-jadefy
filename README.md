# organic-jadefy

The organelle provides support for jade compiler

## DNA structure and defaults

    {
      "disposeOn": String, /* optional */
      "reactOn": String, /* optional */
      "reaction": String, /* optional */
      "jadeConfig": {}, /* optional */
      "useRequireExteions": Boolean,
      "exportsGlobal": Boolean
    }

- `disposeOn` - Type of chemical
- `reactOn` - Type of chemical
- `jadeConfig` - jade compiler configuration
- `useRequireExtensions` - when set to `true` anywhere in the current process one can do

        var mytemplate = require("./template.jade", module)
        var myhtml = mytemplate({
          value: "test",
          property: false
        })

    
- `exportsGlobal` - when set to `true` anywhere in the current process once can do

        var mytemplate = jadefy("./template.jade")
        var myhtml = mytemplate({
          value: "test",
          property: false
        })
