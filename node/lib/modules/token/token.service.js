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
exports.generateVerifyEmailToken = exports.generateAuthTokens = exports.verifyToken = exports.saveToken = exports.generateToken = void 0;
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
const ApiError_1 = require("../errors/ApiError");
const token_model_1 = require("./token.model");
const token_types_1 = require("./token.types");
const generateToken = (userId, expires, type, secret = EnvironmentConfig_1.EnvironmentConfig.getInstance().JWT_Token_Secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};
exports.generateToken = generateToken;
const saveToken = (token, userId, expires, type, blacklisted = false) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenDoc = yield token_model_1.default.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
});
exports.saveToken = saveToken;
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jwt.verify(token, EnvironmentConfig_1.EnvironmentConfig.getInstance().JWT_Token_Secret);
    if (typeof payload.sub !== 'string') {
        throw new ApiError_1.default(httpStatus.BAD_REQUEST, 'bad user');
    }
    const tokenDoc = yield token_model_1.default.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
});
exports.verifyToken = verifyToken;
const generateAuthTokens = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = moment().add(50, 'minutes');
    const accessToken = (0, exports.generateToken)(user.id, accessTokenExpires, token_types_1.default.ACCESS);
    const refreshTokenExpires = moment().add(1, 'days');
    const refreshToken = (0, exports.generateToken)(user.id, refreshTokenExpires, token_types_1.default.REFRESH);
    yield (0, exports.saveToken)(refreshToken, user.id, refreshTokenExpires, token_types_1.default.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
});
exports.generateAuthTokens = generateAuthTokens;
const generateVerifyEmailToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const TokenExpires = moment().add(1, 'minutes');
    const VarifyEmailToken = (0, exports.generateToken)(user.id, TokenExpires, token_types_1.default.VERIFY_EMAIL);
    yield (0, exports.saveToken)(VarifyEmailToken, user.id, TokenExpires, token_types_1.default.VERIFY_EMAIL);
    return VarifyEmailToken;
});
exports.generateVerifyEmailToken = generateVerifyEmailToken;
//# sourceMappingURL=token.service.js.map