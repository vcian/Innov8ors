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
exports.logout = exports.RefreshAuthToken = exports.verifyAndLogin = exports.sendOtpVerification = exports.verifyTokenBasedEmail = exports.sendTokenVerificationEmail = void 0;
const httpStatus = require("http-status");
const catchAsync_1 = require("../utils/catchAsync");
const token_1 = require("../token");
const authService = require("./auth.service");
const errors_1 = require("../errors");
const email_1 = require("../email");
const enum_1 = require("../utils/enum");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
exports.sendTokenVerificationEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyEmailToken = yield token_1.tokenService.generateVerifyEmailToken(req.user);
    yield email_1.emailService.sendTokenVerificationEmail(req.user.email, verifyEmailToken, req.user.name);
    res.status(httpStatus.NO_CONTENT).send();
}));
exports.verifyTokenBasedEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield authService.verifyTokenBasedEmail(req.query['token']);
    res.status(httpStatus.OK).send({ result: "Email varified successfully" });
}));
exports.sendOtpVerification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AuthObj = yield authService.OtpGenerator(req.body);
    if (AuthObj.authType == enum_1.AuthTypes.Email) {
        yield email_1.emailService.sendOtpVerificationEmail(AuthObj.authValue, AuthObj.otp);
        res.status(httpStatus.OK).send({ result: "Email sent successfully" });
    }
    else if (AuthObj.authType == enum_1.AuthTypes.Mobile) {
        yield email_1.emailService.sendOtpVerificationEmail(AuthObj.authValue, AuthObj.otp);
        res.status(httpStatus.OK).send({ result: "Email sent successfully" });
    }
    else {
        res.status(httpStatus.BAD_REQUEST).send({ result: "Invalid Authtype" });
    }
}));
exports.verifyAndLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (EnvironmentConfig_1.EnvironmentConfig.getInstance().AuthStrategy == enum_1.AuthStrategy.OtpBased || req.body.authType == enum_1.AuthTypes.Mobile) {
        yield authService.verifyOtp(req.body);
    }
    const user = yield authService.LoginOrRegister(req.body);
    const tokens = yield token_1.tokenService.generateAuthTokens(user);
    res.cookie("refresh_token", tokens.refresh, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
        secure: false,
        sameSite: 'lax' // used to prevent cross site request forgery 
    });
    delete tokens.refresh;
    res.send({ tokens, user });
}));
exports.RefreshAuthToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = req.Cookies.refresh_token;
    if (!refresh_token) {
        throw new errors_1.ApiError(httpStatus.UNAUTHORIZED, "Refresh Token Not Found");
    }
    const tokens = yield authService.RefreshAuthToken(refresh_token);
    res.cookie("refresh_token", tokens.refresh, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
        secure: false,
        sameSite: 'lax' // used to prevent cross site request forgery 
    });
    delete tokens.refresh;
    res.send({ tokens });
}));
exports.logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh = req.Cookies.refresh_token;
    if (!refresh) {
        throw new errors_1.ApiError(httpStatus.UNAUTHORIZED, 'Refresh Token Not Found');
    }
    yield authService.logout(refresh);
    res.clearCookie("refresh_token");
    res.status(httpStatus.NO_CONTENT).send();
}));
//# sourceMappingURL=auth.controller.js.map