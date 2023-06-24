"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchedule = exports.createSchedule = void 0;
const Joi = require("joi");
const enum_1 = require("../utils/enum");
const scheduleBody = {
    form: Joi.object({
        topic: Joi.string().required(),
        durationType: Joi.string().required().valid(enum_1.DurationType.Days, enum_1.DurationType.Months, enum_1.DurationType.Weeks),
        duration: Joi.number().required(),
        timeAvailablity: Joi.number().required(),
        timePreference: Joi.string().required().valid(enum_1.TimePreferenceType.Morning, enum_1.TimePreferenceType.Night, enum_1.TimePreferenceType.Noon),
        currentKnowledgeLevel: Joi.string().required().valid(enum_1.KnowledgeLevelType.Begginer, enum_1.KnowledgeLevelType.Expert, enum_1.KnowledgeLevelType.Intermediate),
        desiredKnowledgeLevel: Joi.string().required().valid(enum_1.KnowledgeLevelType.Begginer, enum_1.KnowledgeLevelType.Expert, enum_1.KnowledgeLevelType.Intermediate),
        learningtyle: Joi.string().required().valid(enum_1.LearningStyleTypes.Auditory, enum_1.LearningStyleTypes.Kinesthetic, enum_1.LearningStyleTypes.Reading_Writing, enum_1.LearningStyleTypes.Visual),
        learningPace: Joi.string().required().valid(enum_1.LearnigPaceTypes.Average, enum_1.LearnigPaceTypes.Fast, enum_1.LearnigPaceTypes.Slow),
        dayAvailablity: Joi.string().required()
    }).required(),
    schedule: Joi.any().optional(),
    isCompleted: Joi.boolean()
};
exports.createSchedule = {
    body: Joi.object(scheduleBody)
};
exports.getSchedule = {
    params: Joi.object().keys({
        scheduleId: Joi.string(),
    }),
};
//# sourceMappingURL=schedule.validation.js.map