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
exports.markReadSchedule = exports.markReadTopic = exports.getScheduleById = exports.createSchedule = void 0;
const httpStatus = require("http-status");
const scheduleService = require("./schedule.service");
const utils_1 = require("../utils");
exports.createSchedule = (0, utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.user = req.user._id;
    const schedule = yield scheduleService.createSchedule(req.body);
    console.log("echeduledata : ", schedule);
    res.status(httpStatus.CREATED).send(schedule);
}));
exports.getScheduleById = (0, utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield scheduleService.getScheduleById(req.params['scheduleId']);
    console.log("echeduledata : ", schedule);
    res.status(httpStatus.OK).send(schedule);
}));
exports.markReadTopic = (0, utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield scheduleService.getScheduleById(req.body['scheduleId']);
    for (let i = 0; i < schedule.schedule.length; i++) {
        if (req.body['topicId'] == schedule.schedule[i]["id"]) {
            schedule.schedule[i]["isCompleted"] = true;
            break;
        }
    }
    yield schedule.save();
    console.log("echeduledata : ", schedule);
    res.status(httpStatus.OK).send(schedule);
}));
exports.markReadSchedule = (0, utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield scheduleService.getScheduleById(req.body['scheduleId']);
    schedule.schedule.isCompleted = true;
    yield schedule.save();
    console.log("echeduledata : ", schedule);
    res.status(httpStatus.OK).send(schedule);
}));
//# sourceMappingURL=schedule.controller.js.map