"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleById = exports.createSchedule = void 0;
const schedule_model_1 = require("./schedule.model");
const apiService_1 = require("../utils/apiService");
const createSchedule = (scheduleBody) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = scheduleBody.form;
    const prompt = `create schedule for my learning by following bellow details\n 1) course name : ${formData.topic} 2) schedule time: \n ${formData.dayAvailablity} : ${formData.timeAvailablity} hours \n 3) schedule range : ${formData.duration} ${formData.durationType} \n schedule formate in json : columns : [week number,day names,time,topic] \n (Note) : json object should parsable and should contain only those details which has been asked`;
    let response = yield apiService_1.apiService.getInstance().opeaiGetResponse(prompt);
    console.log(":::::::::::::::: ", response);
    response = response.replace(/(\\n)|(\\)/, "");
    response = JSON.parse(response);
    scheduleBody.schedule = response;
    return schedule_model_1.default.create(scheduleBody);
});
exports.createSchedule = createSchedule;
const getScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return schedule_model_1.default.findById(id);
});
exports.getScheduleById = getScheduleById;
//# sourceMappingURL=schedule.service.js.map