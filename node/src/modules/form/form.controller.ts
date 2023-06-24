import * as httpStatus from 'http-status';
import { Request, Response,NextFunction } from 'express';
import mongoose from 'mongoose';
import * as formService from './form.service';
import { ApiError } from '../errors';
import { catchAsync } from '../utils';

export const createForm = catchAsync(async (req: Request, res: Response) => {
  req.body.user = req.user._id
  const form = await formService.createForm(req.body);
  console.log("echeduledata : ",form)
  res.status(httpStatus.CREATED).send(form);
});


export const getFormById = catchAsync(async (req: Request, res: Response) => {
  const form = await formService.getFormById(req.params['formId']);
  console.log("echeduledata : ",form)
  res.status(httpStatus.OK).send(form);
});



