"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const app=require("./Testing")
const data = { "name": "pratik" };
console.log(typeof data["name"]);
const WebAppConfig_1 = require("./config/WebAppConfig");
// app.listen(3000, () => {
//     console.log("listning to port 3000 ..")
// })
WebAppConfig_1.WebAppConfig.getInstance().initApp();
//# sourceMappingURL=index.js.map