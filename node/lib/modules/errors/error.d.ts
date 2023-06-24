import ApiError from './ApiError';
export declare const errorConverter: (err: any, _req: Request, _res: Response, next: NextFunction) => void;
export declare const errorHandler: (err: ApiError, _req: Request, res: Response, _next: NextFunction) => void;
