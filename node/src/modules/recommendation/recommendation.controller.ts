import * as httpStatus from 'http-status';
import { Request, Response,NextFunction } from 'express';
import { ApiError } from '../errors';
import { catchAsync } from '../utils';
import { recommendationService } from '.';

export const recommend = catchAsync(async (req: Request, res: Response) => {
  const courses = await recommendationService.recommend(req.body);
  console.log("response:::: ",courses)
  res.status(httpStatus.CREATED).send(courses);
});





