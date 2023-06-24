"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
const toJSON_1 = require("../toJSON");
const user_1 = require("../user");
const formSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: false,
        ref: user_1.User
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
formSchema.plugin(toJSON_1.toJSON);
const Form = mongoose_1.default.model(enum_1.Collections.FormCollections, formSchema);
exports.default = Form;
//# sourceMappingURL=form.model.js.map