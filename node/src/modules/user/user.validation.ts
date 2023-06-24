import * as Joi from 'joi';



export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string(),
  }),
};