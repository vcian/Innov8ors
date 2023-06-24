import mongoose, { Model, Document } from 'mongoose';
import { DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType } from '../utils/enum';


// main Form interface here we are only adding thse properties to the model who are matching with the authStrategy
// if ou added stretegy for your website first time make sure it will not change any time in future
export interface IForm {
  user:mongoose.Schema.Types.ObjectId;
  topic:string;
  durationType : DurationType;
  duration:number;
  timeAvailablity :number;
  timePreference:TimePreferenceType;
  currentKnowledgeLevel:KnowledgeLevelType;
  desiredKnowledgeLevel:KnowledgeLevelType;
  learningtyle:LearningStyleTypes;
  learningPace:LearnigPaceTypes
}

export type formBody = Omit<IForm , "user">

export interface IFormDoc extends IForm, Document {}

export interface IFormModel extends Model<IFormDoc> {}


