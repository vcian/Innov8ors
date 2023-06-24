import mongoose, { Model, Document } from 'mongoose';
import { DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType } from '../utils/enum';
export interface IForm {
    user: mongoose.Schema.Types.ObjectId;
    topic: string;
    durationType: DurationType;
    duration: number;
    timeAvailablity: number;
    timePreference: TimePreferenceType;
    currentKnowledgeLevel: KnowledgeLevelType;
    desiredKnowledgeLevel: KnowledgeLevelType;
    learningtyle: LearningStyleTypes;
    learningPace: LearnigPaceTypes;
}
export type formBody = Omit<IForm, "user">;
export interface IFormDoc extends IForm, Document {
}
export interface IFormModel extends Model<IFormDoc> {
}
