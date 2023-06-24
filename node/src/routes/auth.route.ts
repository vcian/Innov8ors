import express, { Router } from 'express';
import { validate } from '../modules/validate';
import { authValidation, authController, auth } from '../modules/auth';

const router: Router = Router();

// router.post('/register', validate(authValidation.register), authController.register);
// router.post('/refresh', validate(authValidation.register), authController.register);

// router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', authController.logout);

router.post('/authenticate', validate(authValidation.AuthUser), authController.verifyAndLogin);
router.post('/requestOtp', validate(authValidation.OtpRequest), authController.sendOtpVerification);

// router.post('/send-verification-otp-email', validate(authValidation.verifyOtpEmail), authController.sendOtpVerificationEmail);
// router.post('/verify-otp-email', validate(authValidation.verifyOtpEmail), authController.verifyOtpBasedEmail);

export default router;
