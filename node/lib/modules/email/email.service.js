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
exports.sendAccountCreated = exports.sendSuccessfulRegistration = exports.sendTokenVerificationEmail = exports.sendResetPasswordEmail = exports.sendOtpVerificationEmail = exports.sendEmail = exports.transport = void 0;
const nodemailer = require("nodemailer");
const EnvironmentConfig_1 = require("../../config/EnvironmentConfig");
exports.transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    pool: true,
    secure: false,
    ignoreTLS: false,
    requireTLS: false,
    connectionTimeout: 20000,
    greetingTimeout: 5000,
    socketTimeout: 20000,
    auth: {
        user: EnvironmentConfig_1.EnvironmentConfig.getInstance().Email,
        pass: EnvironmentConfig_1.EnvironmentConfig.getInstance().EmailPassword,
    },
    tls: {
        ciphers: "SSLv3",
        // do not fail on invalid certs
        // rejectUnauthorized: false,
    },
    debug: false,
    logger: false,
});
const sendEmail = (to, subject, text, html) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        from: EnvironmentConfig_1.EnvironmentConfig.getInstance().Email,
        to,
        subject,
        text,
        html,
    };
    // await transport.sendMail(msg);
    return new Promise((resolve, reject) => {
        exports.transport.sendMail(msg, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve({ status: "something went wrong" }); // or use rejcet(false) but then you will have to handle errors
            }
            else {
                console.log("Email sent: " + info.response);
                resolve({ status: "Mail sent successfully" });
            }
        });
    });
});
exports.sendEmail = sendEmail;
const sendOtpVerificationEmail = (to, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Email Varification';
    // replace this url with the link to the reset password page of your front-end app
    const text = `Hi,
  To confirm your email Please use this otp : ${otp},
  If you did not request any password resets, then ignore this email.`;
    const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Dear user,</strong></h4>
  <p>${text}</p>
  <p>If you did not request any password resets, please ignore this email.</p>
  <p>Thanks,</p>
  <p><strong>Team</strong></p></div>`;
    yield (0, exports.sendEmail)(to, subject, text, html);
});
exports.sendOtpVerificationEmail = sendOtpVerificationEmail;
const sendResetPasswordEmail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Reset password';
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `http://${EnvironmentConfig_1.EnvironmentConfig.getInstance().Domain}/reset-password?token=${token}`;
    const text = `Hi,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
    const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Dear user,</strong></h4>
  <p>To reset your password, click on this link: ${resetPasswordUrl}</p>
  <p>If you did not request any password resets, please ignore this email.</p>
  <p>Thanks,</p>
  <p><strong>Team</strong></p></div>`;
    yield (0, exports.sendEmail)(to, subject, text, html);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
const sendTokenVerificationEmail = (to, token, name) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `http://${EnvironmentConfig_1.EnvironmentConfig.getInstance().Domain}/api/auth/verify-email?token=${token}`;
    const text = `Hi ${name},
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;
    const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${name},</strong></h4>
  <p>To verify your email, click on this link: ${verificationEmailUrl}</p>
  <p>If you did not create an account, then ignore this email.</p></div>`;
    yield (0, exports.sendEmail)(to, subject, text, html);
});
exports.sendTokenVerificationEmail = sendTokenVerificationEmail;
const sendSuccessfulRegistration = (to, token, name) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `http://${EnvironmentConfig_1.EnvironmentConfig.getInstance().Domain}/verify-email?token=${token}`;
    const text = `Hi ${name},
  Congratulations! Your account has been created. 
  You are almost there. Complete the final step by verifying your email at: ${verificationEmailUrl}
  Don't hesitate to contact us if you face any problems
  Regards,
  Team`;
    const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${name},</strong></h4>
  <p>Congratulations! Your account has been created.</p>
  <p>You are almost there. Complete the final step by verifying your email at: ${verificationEmailUrl}</p>
  <p>Don't hesitate to contact us if you face any problems</p>
  <p>Regards,</p>
  <p><strong>Team</strong></p></div>`;
    yield (0, exports.sendEmail)(to, subject, text, html);
});
exports.sendSuccessfulRegistration = sendSuccessfulRegistration;
const sendAccountCreated = (to, name) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = 'Account Created Successfully';
    // replace this url with the link to the email verification page of your front-end app
    const loginUrl = `http://${EnvironmentConfig_1.EnvironmentConfig.getInstance().Domain}/auth/login`;
    const text = `Hi ${name},
  Congratulations! Your account has been created successfully. 
  You can now login at: ${loginUrl}
  Don't hesitate to contact us if you face any problems
  Regards,
  Team`;
    const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${name},</strong></h4>
  <p>Congratulations! Your account has been created successfully.</p>
  <p>You can now login at: ${loginUrl}</p>
  <p>Don't hesitate to contact us if you face any problems</p>
  <p>Regards,</p>
  <p><strong>Team</strong></p></div>`;
    yield (0, exports.sendEmail)(to, subject, text, html);
});
exports.sendAccountCreated = sendAccountCreated;
//# sourceMappingURL=email.service.js.map