import mongoose from 'mongoose';

import {hash,compare} from "bcrypt"
import { AuthStrategy, UserType } from '../utils/enum';
import {Collections} from "../utils/enum"
import { toJSON } from '../toJSON';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { ApiError } from '../errors';
import httpStatus = require('http-status');
import { IScheduleDoc, IScheduleModel } from './schedule.interfaces';
import { User } from '../user';


const scheduleSchema = new mongoose.Schema<IScheduleDoc, IScheduleModel>(
  {
    user: {
      type : mongoose.Schema.Types.ObjectId,
      required : false,
      ref : User
    },
   
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


scheduleSchema.plugin(toJSON)


const Schedule = mongoose.model<IScheduleDoc, IScheduleModel>(Collections.ScheduleCollections, scheduleSchema);

export default Schedule;
