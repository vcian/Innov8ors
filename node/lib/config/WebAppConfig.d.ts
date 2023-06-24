import { Model } from "mongoose";
export declare class WebAppConfig {
    static Modals: Map<string, Model<any>>;
    private static instance;
    app: any;
    constructor();
    static getInstance(): WebAppConfig;
    initApp(): Promise<void>;
    initDB(): Promise<void>;
}
