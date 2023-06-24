import * as httpStatus from 'http-status';
import { Request, Response,NextFunction } from 'express';
import mongoose from 'mongoose';
import * as scheduleService from './schedule.service';
import { ApiError } from '../errors';
import { catchAsync } from '../utils';

export const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const schedule = await scheduleService.createSchedule(req.body);
  console.log("echeduledata : ",schedule)
  res.status(httpStatus.CREATED).send(schedule);
});


