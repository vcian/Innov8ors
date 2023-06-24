import mongoose, { Model, Document } from 'mongoose';


// main Schedule interface here we are only adding thse properties to the model who are matching with the authStrategy
// if ou added stretegy for your website first time make sure it will not change any time in future
export interface ISchedule {
  user:mongoose.Schema.Types.ObjectId;
}

export interface IScheduleDoc extends ISchedule, Document {}

export interface IScheduleModel extends Model<IScheduleDoc> {}


