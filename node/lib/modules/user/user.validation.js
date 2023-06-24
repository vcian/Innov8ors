"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const Joi = require("joi");
exports.getUser = {
    params: Joi.object().keys({
        userId: Joi.string(),
    }),
};
//# sourceMappingURL=user.validation.js.map