import { AuthStrategy, AuthTypes } from "../modules/utils/enum";
export declare class EnvironmentConfig {
    static instance: EnvironmentConfig;
    Email: string;
    EmailPassword: string;
    Mailbox_SourcePath: string;
    Domain: string;
    algorithm: string;
    cryptokey: string;
    Refresh_Token_Secret: string;
    JWT_Token_Secret: string;
    Enable_Encryption: string;
    Environment: string;
    AuthStrategy: AuthStrategy;
    AuthTypes: Array<AuthTypes>;
    gpt_key: string;
    static getInstance(): EnvironmentConfig;
    constructor();
}
