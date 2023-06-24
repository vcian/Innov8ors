"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const token_types_1 = require("./token.types");
const enum_1 = require("../utils/enum");
const tokenSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: [token_types_1.default.REFRESH, token_types_1.default.RESET_PASSWORD, token_types_1.default.VERIFY_EMAIL],
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Token = mongoose_1.default.model(enum_1.Collections.TokenCollections, tokenSchema);
exports.default = Token;
//# sourceMappingURL=token.model.js.map