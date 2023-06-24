import * as httpStatus from "http-status"
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { tokenService } from '../token';
import { userService } from '../user';
import * as authService from './auth.service';
import { ApiError } from '../errors';
import { emailService } from '../email';
import AuthModel from './auth.model';
import { AuthStrategy, AuthTypes } from '../utils/enum';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';

export const sendTokenVerificationEmail = catchAsync(async (req: Request, res: Response) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendTokenVerificationEmail(req.user.email, verifyEmailToken, req.user.name);
  res.status(httpStatus.NO_CONTENT).send();
});

export const verifyTokenBasedEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyTokenBasedEmail(req.query['token']);
  res.status(httpStatus.OK).send({result:"Email varified successfully"});
});

export const sendOtpVerification = catchAsync(async (req: Request, res: Response) => {

  const AuthObj = await authService.OtpGenerator(req.body)
  if(AuthObj.authType == AuthTypes.Email){

    await emailService.sendOtpVerificationEmail(AuthObj.authValue, AuthObj.otp);
    res.status(httpStatus.OK).send({result:"Email sent successfully"});

  }else if(AuthObj.authType == AuthTypes.Mobile){
    await emailService.sendOtpVerificationEmail(AuthObj.authValue, AuthObj.otp);
    res.status(httpStatus.OK).send({result:"Email sent successfully"});
  }else{
    res.status(httpStatus.BAD_REQUEST).send({result:"Invalid Authtype"});
  }

});

export const verifyAndLogin = catchAsync(async (req: Request, res: Response) => {

  if(EnvironmentConfig.getInstance().AuthStrategy == AuthStrategy.OtpBased || req.body.authType == AuthTypes.Mobile){
    await authService.verifyOtp(req.body);
  }

  const user = await authService.LoginOrRegister(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.cookie("refresh_token",tokens.refresh,
  {
    maxAge: 1000*3600*24, 
    httpOnly: true,
    secure: false, // false for local host or testing do it true in prod
    sameSite: 'lax' // used to prevent cross site request forgery 
  })

  delete tokens.refresh
  res.send({ tokens,user });

});

export const RefreshAuthToken = catchAsync(async (req:Request, res:Response) => {
  const refresh_token = req.Cookies.refresh_token

  if(!refresh_token){
    throw new ApiError(httpStatus.UNAUTHORIZED,"Refresh Token Not Found")
  }
  const tokens = await authService.RefreshAuthToken(refresh_token)
  res.cookie("refresh_token",tokens.refresh,
  {
    maxAge: 1000*3600*24, 
    httpOnly: true,
    secure: false, // false for local host or testing do it true in prod
    sameSite: 'lax' // used to prevent cross site request forgery 
  })

  delete tokens.refresh
  res.send({ tokens });

})

export const logout = catchAsync(async (req: Request, res: Response) => {
  const refresh = req.Cookies.refresh_token
  if (!refresh) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Refresh Token Not Found');
  }
  await authService.logout(refresh);
  res.clearCookie("refresh_token")
  res.status(httpStatus.NO_CONTENT).send();
});