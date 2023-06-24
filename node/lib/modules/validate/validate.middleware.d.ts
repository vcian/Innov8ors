declare const validate: (schema: Record<string, any>) => (req: Request, _res: Response, next: NextFunction) => void;
export default validate;
