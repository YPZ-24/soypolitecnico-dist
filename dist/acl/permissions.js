"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissions = void 0;
const ability_1 = require("@casl/ability");
ability_1.ForbiddenError.setDefaultMessage('You are not authorized');
exports.rolePermissions = {
    admin(user, { can }) {
        can('manage', 'all');
    },
    user(user, { can }) {
    },
    capturer(user, { can }) {
        can('create', 'Subject');
        can('update', 'Subject');
        can('delete', 'Subject');
        can('read', 'Subject');
        can('create', 'Teacher');
        can('update', 'Teacher');
        can('delete', 'Teacher');
        can('read', 'Teacher');
        can('create', 'RelSubjectSchool');
        can('create', 'RelSchoolTeacher');
        can('create', 'RelSubjectTeacher');
        can('create', 'RelSchoolCareer');
    },
};
