import * as httpStatus from 'http-status';
import { Request, Response,NextFunction } from 'express';
import mongoose from 'mongoose';
import * as userService from './user.service';
import { ApiError } from '../errors';
import { catchAsync } from '../utils';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  console.log("userdata : ",user)
  res.status(httpStatus.CREATED).send(user);
});


export const getUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'string') {
    const user = await userService.getUserById(new mongoose.Types.ObjectId(req.params['userId']));
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    // res.send(user.toObject());
    res.send(user);
  }else{
    res.send({"error":"error"})
  }
});



