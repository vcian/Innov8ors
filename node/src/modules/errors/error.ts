/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as httpStatus from 'http-status';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import ApiError from './ApiError';


export const errorConverter = (err: any, _req: Request, _res: Response, next: NextFunction) => {
  let error = err;
  console.log(err.stack)

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = error.message || `${httpStatus[statusCode]}`;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  let { statusCode, message } = err;
  if (EnvironmentConfig.getInstance().Environment === 'Prod' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'Internal Server Error';
  }

  // used to set local variable which can be used for that request only
  // res.locals['errorMessage'] = err.message;

  console.log("data:: ",EnvironmentConfig.getInstance().Environment == 'Dev',{ stack: err.stack },{...(EnvironmentConfig.getInstance().Environment === 'Dev' && { stack: err.stack })})

  const response = {
    code: statusCode,
    message,
    ...(EnvironmentConfig.getInstance().Environment === 'Dev' && { stack: err.stack }),
  };

  if (EnvironmentConfig.getInstance().Environment === 'Dev') {
    // logger.error(err);
    console.log(err)
  }

  res.status(statusCode).send(response);
};
