
import axios from "axios"
import { apiService } from "../utils/apiService";
import { HttpUtil } from "../utils/HttpUtil";

export const recommend = async (courseTitle:string): Promise<any> => {
  
  let payload = {
    "courseTitle" : courseTitle
  }
  return apiService.getInstance().recommendCourse(payload,{})

};

