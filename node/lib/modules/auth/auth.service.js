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
exports.RefreshAuthToken = exports.OtpGenerator = exports.LoginOrRegister = exports.verifyOtp = exports.verifyTokenBasedEmail = exports.logout = void 0;
const httpStatus = require("http-status");
const mongoose_1 = require("mongoose");
const token_model_1 = require("../token/token.model");
const ApiError_1 = require("../errors/ApiError");
const token_types_1 = require("../token/token.types");
const token_service_1 = require("../token/token.service");
const user_service_1 = require("../user/user.service");
const auth_model_1 = require("./auth.model");
const user_1 = require("../user");
const enum_1 = require("../utils/enum");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenDoc = yield token_model_1.default.findOne({ token: refreshToken, type: token_types_1.default.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
        throw new ApiError_1.default(httpStatus.NOT_FOUND, 'Not found');
    }
    yield refreshTokenDoc.deleteOne();
});
exports.logout = logout;
const verifyTokenBasedEmail = (verifyEmailToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyEmailTokenDoc = yield (0, token_service_1.verifyToken)(verifyEmailToken, token_types_1.default.VERIFY_EMAIL);
        const user = yield (0, user_service_1.getUserById)(new mongoose_1.default.Types.ObjectId(verifyEmailTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        yield token_model_1.default.deleteMany({ user: user.id, type: token_types_1.default.VERIFY_EMAIL });
        const updatedUser = yield (0, user_service_1.updateUserById)(user.id, { isEmailVerified: true });
        return updatedUser;
    }
    catch (error) {
        throw new ApiError_1.default(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
});
exports.verifyTokenBasedEmail = verifyTokenBasedEmail;
const verifyOtp = (AuthObj) => __awaiter(void 0, void 0, void 0, function* () {
    const { authType, authValue, otp } = AuthObj;
    const Authresult = yield auth_model_1.default.findOne({ authType, authValue });
    if (!Authresult) {
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, "We have not shared you any otp yet");
    }
    if (Authresult.otp !== otp) {
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, "Invalid Otp");
    }
    console.log("new date ", new Date());
    if (Authresult.expirOn < new Date()) {
        throw new ApiError_1.default(httpStatus.UNAUTHORIZED, "otp expired");
    }
    if (!Authresult.varified) {
        Authresult.varified = true;
        yield Authresult.save();
    }
    return Authresult;
});
exports.verifyOtp = verifyOtp;
const LoginOrRegister = (AuthObj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authType, authValue, password } = AuthObj;
        let user;
        if (authType == enum_1.AuthTypes.Email) {
            user = yield user_1.User.findOne({ email: authValue });
            if (user && EnvironmentConfig_1.EnvironmentConfig.getInstance().AuthStrategy == enum_1.AuthStrategy.PassBased && !user.isPasswordMatch(password)) {
                throw new ApiError_1.default(httpStatus.UNAUTHORIZED, "Wrong Password");
            }
        }
        else if (authType == enum_1.AuthTypes.Mobile) {
            user = yield user_1.User.findOne({ mobile: authValue });
        }
        else {
            throw new Error("Invalid Auth type");
        }
        if (!user) {
            user = yield user_1.userService.registerUser(AuthObj);
        }
        console.log("=============");
        return user;
    }
    catch (error) {
        throw new ApiError_1.default(httpStatus.UNAUTHORIZED, 'Email verification failed');
    }
});
exports.LoginOrRegister = LoginOrRegister;
const OtpGenerator = (AuthObj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authType, authValue } = AuthObj;
        const otp = Math.floor(Math.random() * 10000);
        const AuthResult = yield auth_model_1.default.findOne({ authType, authValue });
        const dateOfExpiration = new Date();
        dateOfExpiration.setMinutes(dateOfExpiration.getMinutes() + 5);
        if (AuthResult) {
            AuthResult.otp = otp;
            AuthResult.expirOn = dateOfExpiration;
            return yield AuthResult.save();
        }
        else {
            return yield auth_model_1.default.create({
                authType,
                authValue,
                otp,
                expirOn: dateOfExpiration
            });
        }
    }
    catch (error) {
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, 'Bad request');
    }
});
exports.OtpGenerator = OtpGenerator;
const RefreshAuthToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshTokenDoc = yield (0, token_service_1.verifyToken)(refreshToken, token_types_1.default.REFRESH);
        const user = yield (0, user_service_1.getUserById)(new mongoose_1.default.Types.ObjectId(refreshTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        yield refreshTokenDoc.deleteOne();
        const tokens = yield (0, token_service_1.generateAuthTokens)(user);
        return tokens;
    }
    catch (error) {
        throw new ApiError_1.default(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
});
exports.RefreshAuthToken = RefreshAuthToken;
//# sourceMappingURL=auth.service.js.map