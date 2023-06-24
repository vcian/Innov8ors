import { catchAsync } from "../utils";
import { Request , Response } from "express"
import httpStatus = require("http-status");
import * as bannerService from "./banner.service"

export const createBanner = catchAsync(async (req : Request,res : Response)=>{
    const event = await bannerService.createBanner(req.body);
    res.status(httpStatus.CREATED).send(event);
})