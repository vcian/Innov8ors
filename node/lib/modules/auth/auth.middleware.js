"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const httpStatus = require("http-status");
const ApiError_1 = require("../errors/ApiError");
const Roles_1 = require("../../config/Roles");
const verifyCallback = (req, resolve, reject, requiredRights) => (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (err || info || !user) {
        return reject(new ApiError_1.default(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    if (requiredRights.length) {
        const userRights = Roles_1.roleRights.get(user.role);
        if (!userRights)
            return reject(new ApiError_1.default(httpStatus.FORBIDDEN, 'Forbidden'));
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params['userId'] !== user.id) {
            return reject(new ApiError_1.default(httpStatus.FORBIDDEN, 'Forbidden'));
        }
    }
    resolve();
});
const authMiddleware = (...requiredRights) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        console.log("rights: ", requiredRights);
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => {
        console.log("authenticated..", req.user);
        next();
    })
        .catch((err) => next(err));
});
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map