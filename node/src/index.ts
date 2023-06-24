// const app=require("./Testing")
const data = {"name":"pratik"}
console.log(typeof data["name"])
import { WebAppConfig } from "./config/WebAppConfig";

// app.listen(3000, () => {
//     console.log("listning to port 3000 ..")
// })

WebAppConfig.getInstance().initApp();

