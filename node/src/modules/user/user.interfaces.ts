import mongoose, { Model, Document } from 'mongoose';


// main user interface here we are only adding thse properties to the model who are matching with the authStrategy
// if ou added stretegy for your website first time make sure it will not change any time in future
export interface IUser {
  email: string;
  password:string;
  mobile: string;
  role:string;
  isMobileVerified:boolean;
  isEmailVerified:boolean;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch:(password:string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  ValidateUser(value: string): Promise<boolean>;
}

// partial make all properties optional
export type UpdateUserBody = Partial<IUser>;

// export type NewCreatedUser = Omit<IUser, 'isEmailVerified'>;

export interface IUserWithTokens {
    user: IUserDoc;
  }

