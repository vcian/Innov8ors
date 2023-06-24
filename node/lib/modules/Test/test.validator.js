"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const ObjectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]+$/)) {
        return helpers.message({ custom: '"{{#label}}" must be a valid mongo id' });
    }
    return value;
};
const CreateTest = {
    TestName: Joi.string().required(),
    TestDescription: Joi.string().required(),
    TestNo: Joi.number().required().max(10).min(1),
    TestTitle: Joi.string().required(),
    SubTest: Joi.array().items(Joi.object({
        TestAddressId: Joi.string().custom(ObjectId).required(),
        TestLocation: Joi.string().required(),
        TestPrice: Joi.number().required().max(999).min(10)
    })),
    TestAddress: Joi.string()
};
//# sourceMappingURL=test.validator.js.map