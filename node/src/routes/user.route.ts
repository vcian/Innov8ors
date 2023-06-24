import express, { Router } from 'express';
import { validate } from '../modules/validate';
import { authValidation, authController, auth } from '../modules/auth';
import { formController, formValidation } from '../modules/form';
import { recommendationController, recommendationValidation } from '../modules/recommendation';
import { scheduleController, scheduleValidation } from '../modules/schedule';

const router: Router = Router();

router
.route('/schedule')
.post(auth("createSchedule"), validate(scheduleValidation.createSchedule), scheduleController.createSchedule);

router
.route('/schedule/:scheduleId')
.get(auth("getSchedule"),validate(scheduleValidation.getSchedule),scheduleController.getScheduleById)




router
.route('/recommendation')
.post(validate(recommendationValidation.RecommendationBody),recommendationController.recommend)


export default router;
