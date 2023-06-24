
import Schedule from './schedule.model';
import { ISchedule , IScheduleDoc } from './schedule.interfaces';
import mongoose from 'mongoose';
import { ApiError } from '../errors';
import * as httpStatus from "http-status"
import AuthModel from '../auth/auth.model';
import { AuthObjType } from '../auth/auth.interface';
import { AuthStrategy, AuthTypes } from '../utils/enum';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { apiService } from '../utils/apiService';

export const createSchedule = async (scheduleBody: ISchedule): Promise<IScheduleDoc> => {
  const formData = scheduleBody.form
  const prompt = `create schedule for my learning by following bellow details\n 1) course name : ${formData.topic} 2) schedule time: \n ${formData.dayAvailablity} : ${formData.timeAvailablity} hours \n 3) schedule range : ${formData.duration} ${formData.durationType} \n schedule formate in json : columns : [week number,day names,time,topic] \n (Note) : json object should parsable and should contain only those details which has been asked`
  let response = await apiService.getInstance().opeaiGetResponse(prompt)
  console.log(":::::::::::::::: ",response)
  response = response.replace(/(\\n)|(\\)/,"")
  response = JSON.parse(response)
  scheduleBody.schedule = response
  return Schedule.create(scheduleBody);
};

export const getScheduleById = async (id:mongoose.Schema.Types.ObjectId): Promise<IScheduleDoc> => {
  return Schedule.findById(id);
};

