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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleById = exports.createSchedule = void 0;
const fs = require("fs");
const apiService_1 = require("../utils/apiService");
const schedule_model_1 = require("./schedule.model");
const readline = require('readline');
const createSchedule = (scheduleBody) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const formData = scheduleBody.form;
    const prompt = `create schedule for learning by following bellow details\n1) course name : ${formData.topic} \n2) schedule time: ${formData.dayAvailability} \n3) time per day: ${formData.timeAvailability} hours \n3) schedule range : ${formData.duration} weeks.\n course name is the name of course which i want to learn.\n schedule time is the range of days per week for which i want to schedule my learning.\ntime per day is the no of hours per day i want to schedule the course\nschedule range is the no of weeks i want to schedule\ncreate data in tabular format then convert each row in to json and give the response in raw json only\ncolumns : week, day, topic, hours\nweek = contains week number in integer like 1,2,3 etc.\nday = contains week of days like Monday, Tuesday, Wednesday etc.\ntopic = contains topics of the course\nhours = contains no of hours like 1,2,3 etc.`;
    let response = yield apiService_1.apiService.getInstance().opeaiGetResponse(prompt);
    console.log(":::::::::::::::: ", response, typeof response);
    fs.writeFileSync("data.txt", response);
    const fileStream = fs.createReadStream('data.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    let result_ = "";
    try {
        for (var _d = true, rl_1 = __asyncValues(rl), rl_1_1; rl_1_1 = yield rl_1.next(), _a = rl_1_1.done, !_a;) {
            _c = rl_1_1.value;
            _d = false;
            try {
                const line = _c;
                // Each line in input.txt will be successively available here as `line`.
                result_ = result_ + "" + line;
                console.log(`Line from file: ${line} ${result_}`);
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = rl_1.return)) yield _b.call(rl_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    console.log("result::::::::::::::: ", result_);
    // response = fs.readFileSync("data.txt","utf-8")
    response = result_;
    console.log("result++++++++++++++ ", result_);
    response = response.match(/\[.*\]/)[0];
    response = response.replace(/(\\n)|(\\)/, "");
    response = response.replace(/”/, "\"");
    response = JSON.parse(response);
    response = response.map((val, index) => {
        val["isCompleted"] = false;
        val["id"] = index;
        return val;
    });
    console.log("response:: ", response);
    scheduleBody.schedule = response;
    return schedule_model_1.default.create(scheduleBody);
});
exports.createSchedule = createSchedule;
const getScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return schedule_model_1.default.findById(id);
});
exports.getScheduleById = getScheduleById;
//# sourceMappingURL=schedule.service.js.map