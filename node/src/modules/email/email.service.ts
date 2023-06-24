import * as nodemailer from 'nodemailer';
import { EnvironmentConfig } from '../../config/EnvironmentConfig';
import { Message } from './email.interfaces';

export const transport = nodemailer.createTransport({
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
      user: EnvironmentConfig.getInstance().Email,
      pass: EnvironmentConfig.getInstance().EmailPassword,
    },
    tls: {
      ciphers: "SSLv3",
      // do not fail on invalid certs
      // rejectUnauthorized: false,
    },
    debug: false,
    logger: false,
  });


export const sendEmail = async (to: string, subject: string, text: string, html: string): Promise<any> => {
  const msg: Message = {
    from: EnvironmentConfig.getInstance().Email,
    to,
    subject,
    text,
    html,
  };
  // await transport.sendMail(msg);
  return new Promise((resolve, reject) => {
    transport.sendMail(msg, function (error, info) {
      if (error) {
        console.log("error is " + error);
        resolve({ status: "something went wrong" }); // or use rejcet(false) but then you will have to handle errors
      } else {
        console.log("Email sent: " + info.response);
        resolve({ status: "Mail sent successfully" });
      }
    });
  });

};

export const sendOtpVerificationEmail = async (to: string, otp: number): Promise<void> => {
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
  await sendEmail(to, subject, text, html);
};

export const sendResetPasswordEmail = async (to: string, token: string): Promise<void> => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://${EnvironmentConfig.getInstance().Domain}/reset-password?token=${token}`;
  const text = `Hi,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Dear user,</strong></h4>
  <p>To reset your password, click on this link: ${resetPasswordUrl}</p>
  <p>If you did not request any password resets, please ignore this email.</p>
  <p>Thanks,</p>
  <p><strong>Team</strong></p></div>`;
  await sendEmail(to, subject, text, html);
};

export const sendTokenVerificationEmail = async (to: string, token: string, name: string): Promise<void> => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://${EnvironmentConfig.getInstance().Domain}/api/auth/verify-email?token=${token}`;
  const text = `Hi ${name},
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;
  const html = `<div style="margin:30px; padding:30px; border:1px solid black; border-radius: 20px 10px;"><h4><strong>Hi ${name},</strong></h4>
  <p>To verify your email, click on this link: ${verificationEmailUrl}</p>
  <p>If you did not create an account, then ignore this email.</p></div>`;
  await sendEmail(to, subject, text, html);
};

export const sendSuccessfulRegistration = async (to: string, token: string, name: string): Promise<void> => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://${EnvironmentConfig.getInstance().Domain}/verify-email?token=${token}`;
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
  await sendEmail(to, subject, text, html);
};


export const sendAccountCreated = async (to: string, name: string): Promise<void> => {
  const subject = 'Account Created Successfully';
  // replace this url with the link to the email verification page of your front-end app
  const loginUrl = `http://${EnvironmentConfig.getInstance().Domain}/auth/login`;
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
  await sendEmail(to, subject, text, html);
};
