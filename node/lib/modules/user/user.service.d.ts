import { IUser, IUserDoc, UpdateUserBody } from './user.interfaces';
import mongoose from 'mongoose';
import { AuthObjType } from '../auth/auth.interface';
export declare const createUser: (userBody: IUser) => Promise<IUserDoc>;
export declare const getUserById: (id: mongoose.Types.ObjectId) => Promise<IUserDoc | null>;
export declare const passwordBasedRegistration: (userBody: any) => Promise<IUserDoc>;
export declare const registerEmailPassUser: (userBody: any) => Promise<IUserDoc>;
export declare const registerUser: (AuthObj: AuthObjType & {
    password: string;
}) => Promise<IUserDoc>;
export declare const getUserByEmail: (email: string) => Promise<IUserDoc | null>;
export declare const updateUserById: (userId: mongoose.Types.ObjectId, updateBody: UpdateUserBody) => Promise<IUserDoc | null>;
