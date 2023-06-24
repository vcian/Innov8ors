import mongoose from 'mongoose';

import {hash,compare} from "bcrypt"
import { AuthStrategy, UserType } from '../utils/enum';
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
      required : false,
      ref : User
    },
    
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
