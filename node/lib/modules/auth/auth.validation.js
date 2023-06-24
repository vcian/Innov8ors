"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenEmail = exports.OtpRequest = exports.AuthUser = void 0;
const Joi = require("joi");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
const enum_1 = require("../utils/enum");
const UserAuthBody = {
    authValue: Joi.string().required(),
    authType: Joi.string().required().valid(enum_1.AuthTypes.Email, enum_1.AuthTypes.Mobile),
};
if (EnvironmentConfig_1.EnvironmentConfig.getInstance().AuthStrategy == enum_1.AuthStrategy.PassBased) {
    Object.assign(UserAuthBody, {
        password: Joi.any().when('authType', { is: enum_1.AuthTypes.Email, then: Joi.required(), otherwise: Joi.optional() }),
        otp: Joi.any().when('authType', { is: enum_1.AuthTypes.Mobile, then: Joi.required(), otherwise: Joi.optional() })
    });
}
else if (EnvironmentConfig_1.EnvironmentConfig.getInstance().AuthStrategy == enum_1.AuthStrategy.OtpBased) {
    Object.assign(UserAuthBody, {
        otp: Joi.number().required()
    });
}
exports.AuthUser = {
    body: Joi.object(UserAuthBody)
};
const OtpService = {
    authValue: Joi.string().required(),
    authType: Joi.string().required().valid(enum_1.AuthTypes.Email, enum_1.AuthTypes.Mobile)
};
exports.OtpRequest = {
    body: Joi.object().keys(OtpService),
};
exports.verifyTokenEmail = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
};
//# sourceMappingURL=auth.validation.js.map