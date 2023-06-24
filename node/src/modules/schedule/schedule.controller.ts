import * as httpStatus from 'http-status';
import { Request, Response,NextFunction } from 'express';
import mongoose from 'mongoose';
import * as scheduleService from './schedule.service';
import { ApiError } from '../errors';
import { catchAsync } from '../utils';

export const createSchedule = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req.user._id
  const schedule = await scheduleService.createSchedule(req.body);
  console.log("echeduledata : ",schedule)
  res.status(httpStatus.CREATED).send(schedule);
});



export const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const schedule = await scheduleService.getScheduleById(req.params['scheduleId']);
  console.log("echeduledata : ",schedule)
  res.status(httpStatus.OK).send(schedule);
});


export const markReadTopic = catchAsync(async (req: Request, res: Response) => {
  const schedule = await scheduleService.getScheduleById(req.body['scheduleId']);
  for(let i=0;i<schedule.schedule.length;i++){
    if(req.body['topicId'] == schedule.schedule[i]["id"]){
      schedule.schedule[i]["isCompleted"] = true
      break
    }
  }
  await schedule.save()
  console.log("echeduledata : ",schedule)
  res.status(httpStatus.OK).send(schedule);
});

export const markReadSchedule = catchAsync(async (req: Request, res: Response) => {
  const schedule = await scheduleService.getScheduleById(req.body['scheduleId']);
  
  schedule.schedule.isCompleted = true
  await schedule.save()
  console.log("echeduledata : ",schedule)
  res.status(httpStatus.OK).send(schedule);
});
