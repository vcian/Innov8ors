"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
const enum_2 = require("../utils/enum");
const toJSON_1 = require("../toJSON");
const user_1 = require("../user");
const formSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: user_1.User
    },
    topic: {
        type: String,
        required: true
    },
    durationType: {
        type: String,
        required: true,
        enum: [enum_1.DurationType.Days, enum_1.DurationType.Months, enum_1.DurationType.Weeks],
    },
    duration: {
        type: Number,
        required: true
    },
    timeAvailablity: {
        type: Number,
        required: true
    },
    timePreference: {
        type: String,
        enum: [enum_1.TimePreferenceType.Morning, enum_1.TimePreferenceType.Night, enum_1.TimePreferenceType.Noon]
    },
    currentKnowledgeLevel: {
        type: String,
        enum: [enum_1.KnowledgeLevelType.Begginer, enum_1.KnowledgeLevelType.Expert, enum_1.KnowledgeLevelType.Intermediate]
    },
    desiredKnowledgeLevel: {
        type: String,
        enum: [enum_1.KnowledgeLevelType.Begginer, enum_1.KnowledgeLevelType.Expert, enum_1.KnowledgeLevelType.Intermediate]
    },
    learningtyle: {
        type: String,
        enum: [enum_1.LearningStyleTypes.Auditory, enum_1.LearningStyleTypes.Kinesthetic, enum_1.LearningStyleTypes.Reading_Writing, enum_1.LearningStyleTypes.Visual]
    },
    learningPace: {
        type: String,
        enum: [enum_1.LearnigPaceTypes.Average, enum_1.LearnigPaceTypes.Fast, enum_1.LearnigPaceTypes.Slow]
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
formSchema.plugin(toJSON_1.toJSON);
const Form = mongoose_1.default.model(enum_2.Collections.FormCollections, formSchema);
exports.default = Form;
//# sourceMappingURL=form.model.js.map