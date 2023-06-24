
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import * as httpStatus from "http-status"
import AuthModel from '../auth/auth.model';
import { AuthObjType } from '../auth/auth.interface';
import { AuthStrategy, AuthTypes } from '../utils/enum';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { IForm, IFormDoc } from './form.interfaces';
import Form from './form.model';

export const createForm = async (formBody: IForm): Promise<IFormDoc> => {
  return Form.create(formBody);
};

export const getFormById = async (id:mongoose.Schema.Types.ObjectId): Promise<IFormDoc> => {
  return Form.findById(id);
};

