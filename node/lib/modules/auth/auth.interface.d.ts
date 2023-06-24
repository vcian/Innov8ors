import { Document, Model } from "mongoose";
import { AuthTypes } from "../utils/enum";
export interface IAuth {
    authType: AuthTypes;
    otp: number;
    expirOn: Date;
    varified: boolean;
    authValue: string;
}
export type AuthObjType = Omit<IAuth, 'otp' | 'expirOn' | 'varified'>;
export interface IAuthDoc extends IAuth, Document {
}
export interface IAuthModel extends Model<IAuthDoc> {
    isEmailVarified(value: string): Promise<boolean>;
}
