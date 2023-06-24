"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError_1 = require("../errors/ApiError");
const utils_1 = require("../utils");
const validate = (schema) => (req, _res, next) => {
    const validSchema = (0, utils_1.pick)(schema, ['params', 'query', 'body']);
    const object = (0, utils_1.pick)(req, Object.keys(validSchema));
    console.log("schema:: ", validSchema, object);
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError_1.default(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
//# sourceMappingURL=validate.middleware.js.map