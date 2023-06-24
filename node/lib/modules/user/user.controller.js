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
exports.getUser = exports.createUser = void 0;
const httpStatus = require("http-status");
const mongoose_1 = require("mongoose");
const userService = require("./user.service");
const errors_1 = require("../errors");
const utils_1 = require("../utils");
exports.createUser = (0, utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.createUser(req.body);
    console.log("userdata : ", user);
    res.status(httpStatus.CREATED).send(user);
}));
exports.getUser = (0, utils_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.params['userId'] === 'string') {
        const user = yield userService.getUserById(new mongoose_1.default.Types.ObjectId(req.params['userId']));
        if (!user) {
            throw new errors_1.ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        // res.send(user.toObject());
        res.send(user);
    }
    else {
        res.send({ "error": "error" });
    }
}));
//# sourceMappingURL=user.controller.js.map