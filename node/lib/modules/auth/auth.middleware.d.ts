declare const authMiddleware: (...requiredRights: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default authMiddleware;
