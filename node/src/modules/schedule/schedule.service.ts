
import * as fs from "fs";
import mongoose from 'mongoose';
import { apiService } from '../utils/apiService';
import { ISchedule, IScheduleDoc } from './schedule.interfaces';
import Schedule from './schedule.model';
const readline = require('readline');


export const createSchedule = async (scheduleBody: ISchedule): Promise<IScheduleDoc> => {
  const formData = scheduleBody.form
  const prompt = `create schedule for learning by following bellow details\n1) course name : ${formData.topic} \n2) schedule time: ${formData.dayAvailability} \n3) time per day: ${formData.timeAvailability} hours \n3) schedule range : ${formData.duration} weeks.\n course name is the name of course which i want to learn.\n schedule time is the range of days per week for which i want to schedule my learning.\ntime per day is the no of hours per day i want to schedule the course\nschedule range is the no of weeks i want to schedule\ncreate data in tabular format then convert each row in to json and give the response in raw json only\ncolumns : week, day, topic, hours\nweek = contains week number in integer like 1,2,3 etc.\nday = contains week of days like Monday, Tuesday, Wednesday etc.\ntopic = contains topics of the course\nhours = contains no of hours like 1,2,3 etc.`
  let response : any = await apiService.getInstance().opeaiGetResponse(prompt)
  console.log(":::::::::::::::: ",response,typeof response)

  fs.writeFileSync("data.txt",response)

  const fileStream = fs.createReadStream('data.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let result_ = ""
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    result_ = result_ + "" + line
    console.log(`Line from file: ${line} ${result_}`);
  }
  console.log("result::::::::::::::: ",result_)

  // response = fs.readFileSync("data.txt","utf-8")

  response = result_
  console.log("result++++++++++++++ ",result_)

  response = response.match(/\[.*\]/)[0]
  response = response.replace(/(\\n)|(\\)/,"")
  response = response.replace(/”/,"\"")
  response = JSON.parse(response)
  response = response.map((val,index)=>{
    val["isCompleted"]=false
    val["id"] = index
    return val
  })
  console.log("response:: ",response)
  scheduleBody.schedule = response
  return Schedule.create(scheduleBody);
};

export const getScheduleById = async (id:mongoose.Schema.Types.ObjectId): Promise<IScheduleDoc> => {
  return Schedule.findById(id);
};

