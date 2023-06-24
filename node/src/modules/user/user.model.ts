import mongoose from 'mongoose';
import { IUserDoc, IUserModel,IUser } from './user.interfaces';

import {hash,compare} from "bcrypt"
import { AuthStrategy, UserType } from '../utils/enum';

import {Collections} from "../utils/enum"
import { toJSON } from '../toJSON';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { ApiError } from '../errors';
import httpStatus = require('http-status');


const userSchema = new mongoose.Schema<IUserDoc, IUserModel>(
  {
    email: {
      type: String,
      required: false,
    },
    mobile:{
      type: String,
      required: false,
    },
    isMobileVerified:{
      type:Boolean,
      default:false,
      required:true
    },
    isEmailVerified:{
      type:Boolean,
      default:false,
      required:true
    },
    role:{
      type: String,
      required: true,
      enum: UserType,
      default:UserType.User
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

if(EnvironmentConfig.getInstance().AuthStrategy == AuthStrategy.PassBased){
  
  userSchema.add({
    password: {
      type: String,
      required: false,
    }
  })

  userSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
    const user = this;
    return compare(password, user.password);
  });

  userSchema.pre('save', async function (next) {
    try{
      console.log("userrrrrrrrrr",this)
      const user = this;
      if (user.isModified('password')) {
        user.password = await hash(user.password, 8);
      }
      next();
    }catch(error){
      // throw new Error('something went wrong');
      next(error) // if you pass any argument in next fun it will take it as a error
    }
  });
}

userSchema.plugin(toJSON)

// userSchema.virtual('dummy').get(function(){
//   return this.email + " : " + this.role
// })



userSchema.static('ValidateUser' , async function(value:string) : Promise<boolean>{
  let user = await this.findOne({email:value})
  return !!user
})

const User = mongoose.model<IUserDoc, IUserModel>(Collections.UserCollections, userSchema);

export default User;
