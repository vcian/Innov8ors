import * as Joi from 'joi';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { AuthStrategy, AuthTypes, DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType } from '../utils/enum';
import { objectId } from '../validate';
import { ISchedule, ScheduleBody  } from './schedule.interfaces';

const scheduleBody : Record<keyof ScheduleBody,any>= {
    form:Joi.object({
        topic:Joi.string().required(),
        durationType : Joi.string().required().valid(DurationType.Days,DurationType.Months,DurationType.Weeks),
        duration:Joi.number().required(),
        timeAvailability :Joi.number().required(),
        timePreference:Joi.string().required().valid(TimePreferenceType.Morning,TimePreferenceType.Night,TimePreferenceType.Noon),
        currentKnowledgeLevel:Joi.string().required().valid(KnowledgeLevelType.Begginer,KnowledgeLevelType.Expert,KnowledgeLevelType.Intermediate),
        desiredKnowledgeLevel:Joi.string().required().valid(KnowledgeLevelType.Begginer,KnowledgeLevelType.Expert,KnowledgeLevelType.Intermediate),
        learningStyle:Joi.string().required().valid(LearningStyleTypes.Auditory,LearningStyleTypes.Kinesthetic,LearningStyleTypes.Reading_Writing,LearningStyleTypes.Visual),
        learningPace:Joi.string().required().valid(LearnigPaceTypes.Average,LearnigPaceTypes.Fast,LearnigPaceTypes.Slow),
        dayAvailability:Joi.string().required()
    }).required(),
    schedule:Joi.any().optional(),
    isCompleted:Joi.boolean()
};

export const createSchedule = {
  body: Joi.object(scheduleBody)
};


export const getSchedule = {
    params: Joi.object().keys({
        scheduleId: Joi.string(),
      }),
  };
  

