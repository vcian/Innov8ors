"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConfig = void 0;
const mongoose_1 = require("mongoose");
var util = require('util');
class MongoConfig {
    static DBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mongoose_1.default.connect(MongoConfig.primaryurl);
            }
            catch (error) {
                console.log(`Fetching records failed!`);
                console.log(error);
                return error;
            }
        });
    }
}
exports.MongoConfig = MongoConfig;
MongoConfig.primaryurl = "mongodb://0.0.0.0:27017/Bolierplat";
//# sourceMappingURL=MongoConfig.js.map