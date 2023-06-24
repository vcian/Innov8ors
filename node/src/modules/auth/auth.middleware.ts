import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import * as httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import { IUserDoc } from '../user/user.interfaces';
import { roleRights } from '../../config/Roles';

const verifyCallback =
  (req: Request, resolve: any, reject: any, requiredRights: string[]) =>
  async (err: Error, user: IUserDoc, info: string) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      if (!userRights) return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      const hasRequiredRights = requiredRights.every((requiredRight: string) => userRights.includes(requiredRight));
      if (!hasRequiredRights && req.params['userId'] !== user.id) {
        return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
    }
    resolve();
  };

const authMiddleware =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      console.log("rights: ",requiredRights)
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => {
        console.log("authenticated..",req.user)
        next()
      })
      .catch((err) => next(err));

export default authMiddleware;
