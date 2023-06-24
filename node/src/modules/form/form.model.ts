import mongoose from 'mongoose';

import {hash,compare} from "bcrypt"
import { AuthStrategy, DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType, UserType } from '../utils/enum';
import {Collections} from "../utils/enum"
import { toJSON } from '../toJSON';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { ApiError } from '../errors';
import httpStatus = require('http-status');
import { User } from '../user';
import { IFormDoc, IFormModel } from './form.interfaces';


const formSchema = new mongoose.Schema<IFormDoc, IFormModel>(
  {
    user: {
      type : mongoose.Schema.Types.ObjectId,
      required : true,
      ref : User
    },
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
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


formSchema.plugin(toJSON)


const Form = mongoose.model<IFormDoc, IFormModel>(Collections.FormCollections, formSchema);

export default Form;
