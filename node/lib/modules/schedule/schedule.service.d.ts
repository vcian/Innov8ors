import mongoose from 'mongoose';
import { ISchedule, IScheduleDoc } from './schedule.interfaces';
export declare const createSchedule: (scheduleBody: ISchedule) => Promise<IScheduleDoc>;
export declare const getScheduleById: (id: mongoose.Schema.Types.ObjectId) => Promise<IScheduleDoc>;
