"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BannerSchema = new mongoose_1.default.Schema({
    BannerTitle: {
        type: String,
        required: true
    },
    BannerDescription: {
        type: String,
        required: true
    },
    BannerImage: {
        type: String,
        required: true
    },
    BannerRefId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    }
});
const Banner = mongoose_1.default.model("BannerTable", BannerSchema);
exports.default = Banner;
//# sourceMappingURL=banner.model.js.map