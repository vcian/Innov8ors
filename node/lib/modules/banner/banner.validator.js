"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBannerSchema = void 0;
const Joi = require("joi");
const validate_1 = require("../validate");
const CreateBanner = {
    BannerTitle: Joi.string().required().min(10).max(20),
    BannerDescription: Joi.string().required().min(20).max(100),
    BannerImage: Joi.string().required(),
    BannerRefId: Joi.string().custom(validate_1.objectId)
};
exports.CreateBannerSchema = {
    body: Joi.object().keys(CreateBanner)
};
//# sourceMappingURL=banner.validator.js.map