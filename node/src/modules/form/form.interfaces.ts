import mongoose, { Model, Document } from 'mongoose';


// main Form interface here we are only adding thse properties to the model who are matching with the authStrategy
// if ou added stretegy for your website first time make sure it will not change any time in future
export interface IForm {
  user:mongoose.Schema.Types.ObjectId;
}

export interface IFormDoc extends IForm, Document {}

export interface IFormModel extends Model<IFormDoc> {}


