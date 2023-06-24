import mongoose, { Model, Document } from 'mongoose';
export interface IForm {
    user: mongoose.Schema.Types.ObjectId;
}
export interface IFormDoc extends IForm, Document {
}
export interface IFormModel extends Model<IFormDoc> {
}
