import { ITest, ITestDoc } from "./test.interface";
export declare const getTest: (data: any) => Promise<any>;
export declare const setTest: (data: ITest) => Promise<ITestDoc | null>;
