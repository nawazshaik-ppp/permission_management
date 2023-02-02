const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {
ac.grant("basic")
 .readOwn("profile")
 .updateOwn("profile")
 
ac.grant("developer")
 .extend("basic")
 .readAny("profile")
 
ac.grant("admin")
 .extend("basic")  // --> inheretence
 .extend("developer")
 .updateAny("profile")
 .deleteAny("profile")
 
return ac;
})();