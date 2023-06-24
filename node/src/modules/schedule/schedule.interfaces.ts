import mongoose, { Model, Document } from 'mongoose';
import { DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType } from '../utils/enum';

export interface IScheduleForm{
  topic:string;
  durationType : DurationType;
  duration:number;
  timeAvailability :number;
  timePreference:TimePreferenceType;
  currentKnowledgeLevel:KnowledgeLevelType;
  desiredKnowledgeLevel:KnowledgeLevelType;
  learningStyle:LearningStyleTypes;
  learningPace:LearnigPaceTypes;
  dayAvailability:string
}

// main Schedule interface here we are only adding thse properties to the model who are matching with the authStrategy
// if ou added stretegy for your website first time make sure it will not change any time in future
export interface ISchedule {
  user:mongoose.Schema.Types.ObjectId;
  form:IScheduleForm;
  schedule:any;
  isCompleted:boolean
}

export type ScheduleBody = Omit<ISchedule , 'user'>

export interface IScheduleDoc extends ISchedule, Document {}

export interface IScheduleModel extends Model<IScheduleDoc> {}


