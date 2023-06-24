
import Schedule from './schedule.model';
import { ISchedule , IScheduleDoc } from './schedule.interfaces';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import * as httpStatus from "http-status"
import AuthModel from '../auth/auth.model';
import { AuthObjType } from '../auth/auth.interface';
import { AuthStrategy, AuthTypes } from '../utils/enum';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';

export const createSchedule = async (scheduleBody: ISchedule): Promise<IScheduleDoc> => {
  return Schedule.create(scheduleBody);
};

