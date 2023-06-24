"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (object, keys) => keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
    }
    return obj;
}, {});
exports.default = pick;
//# sourceMappingURL=pick.js.map