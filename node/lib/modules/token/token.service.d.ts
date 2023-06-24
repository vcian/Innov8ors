import { Moment } from 'moment';
import mongoose from 'mongoose';
import { AccessAndRefreshTokens, ITokenDoc } from './token.interfaces';
import { IUserDoc } from '../user/user.interfaces';
export declare const generateToken: (userId: mongoose.Types.ObjectId, expires: Moment, type: string, secret?: string) => string;
export declare const saveToken: (token: string, userId: mongoose.Types.ObjectId, expires: Moment, type: string, blacklisted?: boolean) => Promise<ITokenDoc>;
export declare const verifyToken: (token: string, type: string) => Promise<ITokenDoc>;
export declare const generateAuthTokens: (user: IUserDoc) => Promise<AccessAndRefreshTokens>;
export declare const generateVerifyEmailToken: (user: IUserDoc) => Promise<string>;
