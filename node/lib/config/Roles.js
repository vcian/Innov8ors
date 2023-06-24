"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRights = exports.roles = void 0;
const enum_1 = require("../modules/utils/enum");
const allRoles = {
    [enum_1.UserType.User]: [
        // UserDetails Role
        'addUserDetail',
        'updateUserDetail',
        'getUserDetails',
        // Event Roles
        'addEvent',
        'getEvent',
        'getAllEvents',
        'addLocation',
        'deleteEvent',
        'getMyEvents',
        // Feedback Roles
        'addFeedback',
        'getEventFeedbacks',
        'updateFeedback',
        'getFeedback',
        'getMyFeedbacks'
    ],
    [enum_1.UserType.Admin]: [
        'getUsers',
        'manageUsers',
        'getAllUserDetails',
        'addProduct',
        'addUserDetail',
        'updateUserDetail',
        'getUserDetails'
    ],
};
exports.roles = Object.keys(allRoles);
exports.roleRights = new Map(Object.entries(allRoles));
//# sourceMappingURL=Roles.js.map