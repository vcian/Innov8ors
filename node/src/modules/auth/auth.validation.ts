import * as Joi from 'joi';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { AuthStrategy, AuthTypes } from '../utils/enum';
import { AuthObjType, IAuth } from './auth.interface';

const UserAuthBody : Record<keyof AuthObjType,any>= {
  authValue: Joi.string().required(),
  authType:Joi.string().required().valid(AuthTypes.Email,AuthTypes.Mobile),
};

if(EnvironmentConfig.getInstance().AuthStrategy == AuthStrategy.PassBased)
{
  Object.assign(
    UserAuthBody, 
    {
      password: Joi.any().when('authType', { is: AuthTypes.Email, then: Joi.required(), otherwise: Joi.optional() }),
      otp: Joi.any().when('authType', { is: AuthTypes.Mobile, then: Joi.required(), otherwise: Joi.optional() })
    }
  )
}else if(EnvironmentConfig.getInstance().AuthStrategy == AuthStrategy.OtpBased)
{
  Object.assign(
    UserAuthBody, 
    {
      otp:  Joi.number().required()
    }
  )
}

export const AuthUser = {
  body: Joi.object(UserAuthBody)
};

const OtpService: Record<keyof AuthObjType, any> = {
  authValue: Joi.string().required(),
  authType: Joi.string().required().valid(AuthTypes.Email,AuthTypes.Mobile)
}

export const OtpRequest = {
  body: Joi.object().keys(OtpService),
};

export const verifyTokenEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};


