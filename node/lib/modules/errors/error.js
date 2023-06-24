"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const mongoose_1 = require("mongoose");
const httpStatus = require("http-status");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
const ApiError_1 = require("./ApiError");
const errorConverter = (err, _req, _res, next) => {
    let error = err;
    console.log(err.stack);
    if (!(error instanceof ApiError_1.default)) {
        const statusCode = error.statusCode || error instanceof mongoose_1.default.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || `${httpStatus[statusCode]}`;
        error = new ApiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
    let { statusCode, message } = err;
    if (EnvironmentConfig_1.EnvironmentConfig.getInstance().Environment === 'Prod' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
    }
    // used to set local variable which can be used for that request only
    // res.locals['errorMessage'] = err.message;
    console.log("data:: ", EnvironmentConfig_1.EnvironmentConfig.getInstance().Environment == 'Dev', { stack: err.stack }, Object.assign({}, (EnvironmentConfig_1.EnvironmentConfig.getInstance().Environment === 'Dev' && { stack: err.stack })));
    const response = Object.assign({ code: statusCode, message }, (EnvironmentConfig_1.EnvironmentConfig.getInstance().Environment === 'Dev' && { stack: err.stack }));
    if (EnvironmentConfig_1.EnvironmentConfig.getInstance().Environment === 'Dev') {
        // logger.error(err);
        console.log(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map