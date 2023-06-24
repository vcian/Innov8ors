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
exports.getFormById = exports.createForm = void 0;
const form_model_1 = require("./form.model");
const createForm = (formBody) => __awaiter(void 0, void 0, void 0, function* () {
    return form_model_1.default.create(formBody);
});
exports.createForm = createForm;
const getFormById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return form_model_1.default.findById(id);
});
exports.getFormById = getFormById;
//# sourceMappingURL=form.service.js.map