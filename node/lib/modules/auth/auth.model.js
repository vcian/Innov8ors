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
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
const AuthSchema = new mongoose_1.default.Schema({
    authType: {
        type: String,
        required: true,
        enum: [enum_1.AuthTypes.Email, enum_1.AuthTypes.Mobile],
    },
    authValue: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expirOn: {
        type: Date,
        required: true
    },
    varified: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});
AuthSchema.static("isEmailVarified", function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        const AuthObj = yield this.findOne({ authValue: value });
        if (!AuthObj) {
            return false;
        }
        return AuthObj.varified;
    });
});
const AuthModel = mongoose_1.default.model("AuthTable", AuthSchema);
exports.default = AuthModel;
//# sourceMappingURL=auth.model.js.map