"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
const toJSON_1 = require("../toJSON");
const user_1 = require("../user");
const scheduleSchema = new mongoose_1.default.Schema({
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
scheduleSchema.plugin(toJSON_1.toJSON);
const Schedule = mongoose_1.default.model(enum_1.Collections.ScheduleCollections, scheduleSchema);
exports.default = Schedule;
//# sourceMappingURL=schedule.model.js.map