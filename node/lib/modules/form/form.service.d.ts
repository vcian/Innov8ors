import mongoose from 'mongoose';
import { IForm, IFormDoc } from './form.interfaces';
export declare const createForm: (formBody: IForm) => Promise<IFormDoc>;
export declare const getFormById: (id: mongoose.Schema.Types.ObjectId) => Promise<IFormDoc>;
