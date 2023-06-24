import httpStatus = require("http-status");
import { TestService } from ".";
import { catchAsync } from "../utils";
import { Request, Response,NextFunction } from 'express';


export const getTest = catchAsync(async (req: Request, res: Response) => {
    const event = await TestService.getTest(req.body);
    res.status(httpStatus.CREATED).send(event);
});

export const setTest = catchAsync(async (req: Request, res: Response) => {
    const event = await TestService.setTest(req.body);
    res.status(httpStatus.CREATED).send(event);
});