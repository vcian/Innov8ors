

import mongoose from 'mongoose';
import { ApiError } from '../errors';
import * as httpStatus from "http-status"
import { IBanner, IBannerDoc } from './banner.interface';
import Banner from './banner.model';


export const createBanner = async (bannerBody: IBanner): Promise<IBannerDoc> => {
  return Banner.create(bannerBody);
};