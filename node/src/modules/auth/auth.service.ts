import * as httpStatus from 'http-status';
import mongoose from 'mongoose';
import Token from '../token/token.model';
import ApiError from '../errors/ApiError';
import tokenTypes from '../token/token.types';
import { IUserDoc, IUserWithTokens } from '../user/user.interfaces';
import { generateAuthTokens, verifyToken } from '../token/token.service';
import { getUserByEmail, getUserById, updateUserById } from '../user/user.service';
import AuthModel from './auth.model';
import moment = require('moment');
import { AuthObjType, IAuth, IAuthDoc } from './auth.interface';
import { User, userService } from '../user';
import { AuthStrategy, AuthTypes } from '../utils/enum';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export const logout = async (refreshToken: string): Promise<void> => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.deleteOne();
};


export const verifyTokenBasedEmail = async(verifyEmailToken:string):Promise<IUserDoc> => {
  try {
    const verifyEmailTokenDoc = await verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await getUserById(new mongoose.Types.ObjectId(verifyEmailTokenDoc.user));
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    const updatedUser = await updateUserById(user.id, { isEmailVerified: true });
    return updatedUser;

  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  } 
}

export const verifyOtp = async(AuthObj:AuthObjType&{otp:number}):Promise<IAuthDoc> => {

  const {authType,authValue,otp} = AuthObj

    const Authresult = await AuthModel.findOne({authType,authValue})

    if(!Authresult){
      throw new ApiError(httpStatus.BAD_REQUEST,"We have not shared you any otp yet")
    }

    if(Authresult.otp !== otp){
      throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Otp")
    }

    console.log("new date ",new Date())
    if(Authresult.expirOn < new Date()){
      throw new ApiError(httpStatus.UNAUTHORIZED,"otp expired")
    }

    if(!Authresult.varified){
      Authresult.varified = true
      await Authresult.save()  
    }

    return Authresult
}


export const LoginOrRegister = async(AuthObj:AuthObjType&{password:string}):Promise<IUserDoc> => {
  try {

    const {authType,authValue,password} = AuthObj
    let user : IUserDoc
    if(authType == AuthTypes.Email){
      user = await User.findOne({email:authValue})
      if(user && EnvironmentConfig.getInstance().AuthStrategy == AuthStrategy.PassBased && !user.isPasswordMatch(password)){
        throw new ApiError(httpStatus.UNAUTHORIZED,"Wrong Password")
      }
    }else if(authType == AuthTypes.Mobile){
      user = await User.findOne({mobile:authValue})
    }else{
      throw new Error("Invalid Auth type")
    }

    if(!user){
      user = await userService.registerUser(AuthObj);
    }
    console.log("=============")
    return user
  
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  } 
}


export const OtpGenerator = async(AuthObj:AuthObjType):Promise<IAuthDoc> => {
  try {

    const {authType,authValue} = AuthObj
    
    const otp = Math.floor(Math.random()*10000)

    const AuthResult = await AuthModel.findOne({authType,authValue})

    const dateOfExpiration = new Date()
    dateOfExpiration.setMinutes(dateOfExpiration.getMinutes()+5)

    if(AuthResult){
      AuthResult.otp = otp
      AuthResult.expirOn = dateOfExpiration
      return await AuthResult.save()
    
    }else{
      return await AuthModel.create({
        authType,
        authValue,
        otp,
        expirOn:dateOfExpiration
      })
    }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bad request');
  } 
}


export const RefreshAuthToken = async(refreshToken:string):Promise<AccessAndRefreshTokens> => {
  try {
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await getUserById(new mongoose.Types.ObjectId(refreshTokenDoc.user));
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.deleteOne();
    const tokens = await generateAuthTokens(user);
    return tokens;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
}