import * as Joi from 'joi';
import { DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType } from '../utils/enum';
import { formBody } from './form.interfaces';

const FromBody : Record<keyof formBody,any>= {
    topic:Joi.string().required(),
    durationType : Joi.string().required().valid(DurationType.Days,DurationType.Months,DurationType.Weeks),
    duration:Joi.number().required(),
    timeAvailablity :Joi.number().required(),
    timePreference:Joi.string().required().valid(TimePreferenceType.Morning,TimePreferenceType.Night,TimePreferenceType.Noon),
    currentKnowledgeLevel:Joi.string().required().valid(KnowledgeLevelType.Begginer,KnowledgeLevelType.Expert,KnowledgeLevelType.Intermediate),
    desiredKnowledgeLevel:Joi.string().required().valid(KnowledgeLevelType.Begginer,KnowledgeLevelType.Expert,KnowledgeLevelType.Intermediate),
    learningtyle:Joi.string().required().valid(LearningStyleTypes.Auditory,LearningStyleTypes.Kinesthetic,LearningStyleTypes.Reading_Writing,LearningStyleTypes.Visual),
    learningPace:Joi.string().required().valid(LearnigPaceTypes.Average,LearnigPaceTypes.Fast,LearnigPaceTypes.Slow),
};

export const createFrom = {
  body: Joi.object(FromBody)
};

export const getForm = {
    params: Joi.object().keys({
      formId: Joi.string(),
    }),
  };