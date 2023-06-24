declare const catchAsync: (fn: any) => (req: Request, res: Response, next: NextFunction) => void;
export default catchAsync;
