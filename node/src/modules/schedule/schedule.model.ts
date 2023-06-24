import mongoose from 'mongoose';

import {hash,compare} from "bcrypt"
import { AuthStrategy, DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType, UserType } from '../utils/enum';
import {Collections} from "../utils/enum"
import { toJSON } from '../toJSON';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { ApiError } from '../errors';
import httpStatus = require('http-status');
import { IScheduleDoc, IScheduleModel } from './schedule.interfaces';
import { User } from '../user';
import { any } from 'joi';
import { Form } from '../form';


const scheduleSchema = new mongoose.Schema<IScheduleDoc, IScheduleModel>(
  {
    user: {
      type : mongoose.Schema.Types.ObjectId,
      required : false,
      ref : User
    },
    form:{
      topic:{
        type:String,
        required:true
      },
      durationType : {
        type:String,
        required:true,
        enum: [DurationType.Days,DurationType.Months,DurationType.Weeks],
      },
      duration:{
        type:Number,
        required:true
      },
      timeAvailablity :{
        type:Number,
        required:true
      },
      timePreference:{
        type:String,
        enum:[TimePreferenceType.Morning,TimePreferenceType.Night,TimePreferenceType.Noon]
      },
      currentKnowledgeLevel:{
        type:String,
        enum:[KnowledgeLevelType.Begginer,KnowledgeLevelType.Expert,KnowledgeLevelType.Intermediate]
      },
      desiredKnowledgeLevel:{
        type:String,
        enum:[KnowledgeLevelType.Begginer,KnowledgeLevelType.Expert,KnowledgeLevelType.Intermediate]
      },
      learningtyle:{
        type:String,
        enum:[LearningStyleTypes.Auditory,LearningStyleTypes.Kinesthetic,LearningStyleTypes.Reading_Writing,LearningStyleTypes.Visual]
      },
      learningPace:{
        type:String,
        enum:[LearnigPaceTypes.Average,LearnigPaceTypes.Fast,LearnigPaceTypes.Slow]
      },
      dayAvailablity:{
        type:String,
        required:true
      }
    },
    schedule:{
      type:mongoose.Schema.Types.Mixed,
      required:false
    },
    isCompleted:{
      type:Boolean,
      default:false
    }
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
