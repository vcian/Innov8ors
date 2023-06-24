import mongoose, { Model, Document } from 'mongoose';
export interface ISchedule {
    user: mongoose.Schema.Types.ObjectId;
}
export interface IScheduleDoc extends ISchedule, Document {
}
export interface IScheduleModel extends Model<IScheduleDoc> {
}
