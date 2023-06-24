"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../modules/validate");
const auth_1 = require("../modules/auth");
const router = (0, express_1.Router)();
// router.post('/register', validate(authValidation.register), authController.register);
// router.post('/refresh', validate(authValidation.register), authController.register);
// router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', auth_1.authController.logout);
router.post('/authenticate', (0, validate_1.validate)(auth_1.authValidation.AuthUser), auth_1.authController.verifyAndLogin);
router.post('/requestOtp', (0, validate_1.validate)(auth_1.authValidation.OtpRequest), auth_1.authController.sendOtpVerification);
// router.post('/send-verification-otp-email', validate(authValidation.verifyOtpEmail), authController.sendOtpVerificationEmail);
// router.post('/verify-otp-email', validate(authValidation.verifyOtpEmail), authController.verifyOtpBasedEmail);
exports.default = router;
//# sourceMappingURL=auth.route.js.map