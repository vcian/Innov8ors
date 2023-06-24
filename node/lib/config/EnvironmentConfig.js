"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentConfig = void 0;
const dotenv_1 = require("dotenv");
const path = require("path");
class EnvironmentConfig {
    static getInstance() {
        if (!EnvironmentConfig.instance) {
            EnvironmentConfig.instance = new EnvironmentConfig();
        }
        return EnvironmentConfig.instance;
    }
    constructor() {
        const ENV_FILE = path.join(__dirname, "../..", ".env");
        (0, dotenv_1.config)({ path: ENV_FILE });
        this.Email = process.env.Email;
        this.EmailPassword = process.env.Emailpassword;
        this.Mailbox_SourcePath = process.env.Mailbox_SourcePath;
        this.Domain = process.env.Domain;
        this.cryptokey = process.env.cryptokey;
        this.algorithm = process.env.algorithm;
        this.Refresh_Token_Secret = process.env.Refresh_Token_Secret;
        this.JWT_Token_Secret = process.env.JWT_Token_Secret;
        console.log("tokn secret: ", this.JWT_Token_Secret);
        this.Enable_Encryption = process.env.Enable_Encryption;
        this.Environment = process.env.Environment;
        this.AuthStrategy = process.env.AuthStrategy;
        this.AuthTypes = process.env.AuthenticationMethods.split(",");
    }
}
exports.EnvironmentConfig = EnvironmentConfig;
//# sourceMappingURL=EnvironmentConfig.js.map