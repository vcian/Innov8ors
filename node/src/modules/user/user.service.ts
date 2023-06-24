
import User from './user.model';
import { IUser, IUserDoc, UpdateUserBody } from './user.interfaces';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import * as httpStatus from "http-status"
import AuthModel from '../auth/auth.model';
import { AuthObjType } from '../auth/auth.interface';
import { AuthStrategy, AuthTypes } from '../utils/enum';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';

export const createUser = async (userBody: IUser): Promise<IUserDoc> => {
  return User.create(userBody);
};

export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id);

export const passwordBasedRegistration = async(userBody: any): Promise<IUserDoc> => {
  const user = await User.findOne({email:userBody.email})
  if(!!user){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
}


export const registerEmailPassUser = async(userBody: any): Promise<IUserDoc> => {
  const user = await User.findOne({email:userBody.email})
  if(!!user){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
}

export const registerUser = async (AuthObj: AuthObjType&{password:string}): Promise<IUserDoc> => {
  const {authType,authValue,password} = AuthObj
  if(authType == AuthTypes.Email){
    if(EnvironmentConfig.getInstance().AuthStrategy == AuthStrategy.PassBased){
      return await User.create({
        email:authValue,
        password:password,
        isEmailVerified:true
      });
    }else{
      return await User.create({
        email:authValue,
        isEmailVerified:true
      });
    }
  }else if(authType == AuthTypes.Mobile){
    return await User.create({
      mobile:authValue,
      isMobileVerified:true
    });
  }else{
    throw new ApiError(httpStatus.UNAUTHORIZED,"invalid Auth type")
  }
};

export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });

export const updateUserById = async (
  userId: mongoose.Types.ObjectId,
  updateBody: UpdateUserBody
): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.ValidateUser(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
