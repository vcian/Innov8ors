import { ISchedule, IScheduleDoc } from './schedule.interfaces';
import mongoose from 'mongoose';
export declare const createSchedule: (scheduleBody: ISchedule) => Promise<IScheduleDoc>;
export declare const getScheduleById: (id: mongoose.Schema.Types.ObjectId) => Promise<IScheduleDoc>;
