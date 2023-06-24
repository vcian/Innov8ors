import { IUserDoc } from '../user/user.interfaces';
import { AuthObjType, IAuthDoc } from './auth.interface';
import { AccessAndRefreshTokens } from '../token/token.interfaces';
export declare const logout: (refreshToken: string) => Promise<void>;
export declare const verifyTokenBasedEmail: (verifyEmailToken: string) => Promise<IUserDoc>;
export declare const verifyOtp: (AuthObj: AuthObjType & {
    otp: number;
}) => Promise<IAuthDoc>;
export declare const LoginOrRegister: (AuthObj: AuthObjType & {
    password: string;
}) => Promise<IUserDoc>;
export declare const OtpGenerator: (AuthObj: AuthObjType) => Promise<IAuthDoc>;
export declare const RefreshAuthToken: (refreshToken: string) => Promise<AccessAndRefreshTokens>;
