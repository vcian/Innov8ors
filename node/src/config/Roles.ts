import {UserType} from "../modules/utils/enum"

const allRoles = {
    [UserType.User]: [

      'createSchedule',
      'getSchedule',
      'updateScheduleTopic',
      'updateSchedule',

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
    
    [UserType.Admin]: [
        'getUsers', 
        'manageUsers',
        'getAllUserDetails',
        'addProduct',

        'addUserDetail',
        'updateUserDetail',
        'getUserDetails'
    ],
  };
  
export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
  