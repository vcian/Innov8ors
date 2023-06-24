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
const bcrypt_1 = require("bcrypt");
const enum_1 = require("../utils/enum");
const enum_2 = require("../utils/enum");
const toJSON_1 = require("../toJSON");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: false,
    },
    mobile: {
        type: String,
        required: false,
    },
    isMobileVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: enum_1.UserType,
        default: enum_1.UserType.User
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
if (EnvironmentConfig_1.EnvironmentConfig.getInstance().AuthStrategy == enum_1.AuthStrategy.PassBased) {
    userSchema.add({
        password: {
            type: String,
            required: false,
        }
    });
    userSchema.method('isPasswordMatch', function (password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this;
            return (0, bcrypt_1.compare)(password, user.password);
        });
    });
    userSchema.pre('save', function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("userrrrrrrrrr", this);
                const user = this;
                if (user.isModified('password')) {
                    user.password = yield (0, bcrypt_1.hash)(user.password, 8);
                }
                next();
            }
            catch (error) {
                // throw new Error('something went wrong');
                next(error); // if you pass any argument in next fun it will take it as a error
            }
        });
    });
}
userSchema.plugin(toJSON_1.toJSON);
// userSchema.virtual('dummy').get(function(){
//   return this.email + " : " + this.role
// })
userSchema.static('ValidateUser', function (value) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield this.findOne({ email: value });
        return !!user;
    });
});
const User = mongoose_1.default.model(enum_2.Collections.UserCollections, userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map