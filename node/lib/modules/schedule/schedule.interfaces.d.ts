import mongoose, { Model, Document } from 'mongoose';
import { DurationType, KnowledgeLevelType, LearnigPaceTypes, LearningStyleTypes, TimePreferenceType } from '../utils/enum';
export interface IScheduleForm {
    topic: string;
    durationType: DurationType;
    duration: number;
    timeAvailability: number;
    timePreference: TimePreferenceType;
    currentKnowledgeLevel: KnowledgeLevelType;
    desiredKnowledgeLevel: KnowledgeLevelType;
    learningStyle: LearningStyleTypes;
    learningPace: LearnigPaceTypes;
    dayAvailability: string;
}
export interface ISchedule {
    user: mongoose.Schema.Types.ObjectId;
    form: IScheduleForm;
    schedule: any;
    isCompleted: boolean;
}
export type ScheduleBody = Omit<ISchedule, 'user'>;
export interface IScheduleDoc extends ISchedule, Document {
}
export interface IScheduleModel extends Model<IScheduleDoc> {
}
