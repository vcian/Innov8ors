import * as Joi from 'joi';

export const RecommendationBody = {
  body: Joi.object().keys({
    course: Joi.string(),
  }),
};
