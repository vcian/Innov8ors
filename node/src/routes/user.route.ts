import express, { Router } from 'express';
import { validate } from '../modules/validate';
import { authValidation, authController, auth } from '../modules/auth';
import { formController, formValidation } from '../modules/form';
import { recommendationController, recommendationValidation } from '../modules/recommendation';
import { scheduleController, scheduleValidation } from '../modules/schedule';

const router: Router = Router();

router
.route('/schedule/create')
.post(auth("createSchedule"), validate(scheduleValidation.createSchedule), scheduleController.createSchedule);

router
.route('/schedule/get/:scheduleId')
.get(auth("getSchedule"),validate(scheduleValidation.getSchedule),scheduleController.getScheduleById)

router
.route('/schedule/topic/update')
.post(auth("updateScheduleTopic"),scheduleController.markReadTopic)

router
.route('/schedule/topic/update')
.post(auth("updateSchedule"),scheduleController.markReadSchedule)





router
.route('/recommendation')
.post(validate(recommendationValidation.RecommendationBody),recommendationController.recommend)


export default router;
