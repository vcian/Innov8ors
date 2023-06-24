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
exports.updateUserById = exports.getUserByEmail = exports.registerUser = exports.registerEmailPassUser = exports.passwordBasedRegistration = exports.getUserById = exports.createUser = void 0;
const user_model_1 = require("./user.model");
const errors_1 = require("../errors");
const httpStatus = require("http-status");
const enum_1 = require("../utils/enum");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
const createUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.create(userBody);
});
exports.createUser = createUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () { return user_model_1.default.findById(id); });
exports.getUserById = getUserById;
const passwordBasedRegistration = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userBody.email });
    if (!!user) {
        throw new errors_1.ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return user_model_1.default.create(userBody);
});
exports.passwordBasedRegistration = passwordBasedRegistration;
const registerEmailPassUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: userBody.email });
    if (!!user) {
        throw new errors_1.ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return user_model_1.default.create(userBody);
});
exports.registerEmailPassUser = registerEmailPassUser;
const registerUser = (AuthObj) => __awaiter(void 0, void 0, void 0, function* () {
    const { authType, authValue, password } = AuthObj;
    if (authType == enum_1.AuthTypes.Email) {
        if (EnvironmentConfig_1.EnvironmentConfig.getInstance().AuthStrategy == enum_1.AuthStrategy.PassBased) {
            return yield user_model_1.default.create({
                email: authValue,
                password: password,
                isEmailVerified: true
            });
        }
        else {
            return yield user_model_1.default.create({
                email: authValue,
                isEmailVerified: true
            });
        }
    }
    else if (authType == enum_1.AuthTypes.Mobile) {
        return yield user_model_1.default.create({
            mobile: authValue,
            isMobileVerified: true
        });
    }
    else {
        throw new errors_1.ApiError(httpStatus.UNAUTHORIZED, "invalid Auth type");
    }
});
exports.registerUser = registerUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return user_model_1.default.findOne({ email }); });
exports.getUserByEmail = getUserByEmail;
const updateUserById = (userId, updateBody) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.getUserById)(userId);
    if (!user) {
        throw new errors_1.ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (yield user_model_1.default.ValidateUser(updateBody.email))) {
        throw new errors_1.ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    yield user.save();
    return user;
});
exports.updateUserById = updateUserById;
//# sourceMappingURL=user.service.js.map