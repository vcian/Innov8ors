export declare const transport: any;
export declare const sendEmail: (to: string, subject: string, text: string, html: string) => Promise<any>;
export declare const sendOtpVerificationEmail: (to: string, otp: number) => Promise<void>;
export declare const sendResetPasswordEmail: (to: string, token: string) => Promise<void>;
export declare const sendTokenVerificationEmail: (to: string, token: string, name: string) => Promise<void>;
export declare const sendSuccessfulRegistration: (to: string, token: string, name: string) => Promise<void>;
export declare const sendAccountCreated: (to: string, name: string) => Promise<void>;
