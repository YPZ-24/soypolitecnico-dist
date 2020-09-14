"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//Controller
const user_controller_1 = require("../controllers/user.controller");
//Validations
const validate_1 = require("../middlewares/validate");
const userValidations_1 = require("../validations/userValidations");
//Helper for async routes
const routehelper_1 = __importDefault(require("./routehelper"));
//Authentication
const passport_1 = __importDefault(require("passport"));
router.get('/user', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(user_controller_1.getuser));
router.get('/user/role', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(user_controller_1.getUserRole));
router.get('/users/role/:idRole', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.getUsersWithRoleV), routehelper_1.default(user_controller_1.getUsersWithRole));
router.put('/user/:idUser/role/:idRole', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.addUserRoleV), routehelper_1.default(user_controller_1.addUserRole));
router.put('/user/:idUser/lock', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.addUserLockV), routehelper_1.default(user_controller_1.addUserLock));
router.get('/user/nickName', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(user_controller_1.getNickName));
router.get('/user/nickName/:nickName/role', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.getRoleByNickNameV), routehelper_1.default(user_controller_1.getRoleByNickName));
router.get('/user/school/subjects', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.getSchoolSubjectsV), routehelper_1.default(user_controller_1.getSchoolSubjects));
router.get('/user/school/teacher/:idTeacher/subjects', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.getRelSubjectsTeacherV), routehelper_1.default(user_controller_1.getRelSubjectsTeacher));
router.get('/user/school/teachers', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(user_controller_1.getTeachers));
router.post('/user/school/subject/:idSubject/teacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.createTeacherWithSubjectV), routehelper_1.default(user_controller_1.createTeacherWithSubject));
router.post('/user/school/subject/:idSubject/teacher/:idTeacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.addSubjectToTeacherV), routehelper_1.default(user_controller_1.addSubjectToTeacher));
router.get('/user/commentsCard', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(user_controller_1.getUserCommentCardsData));
router.delete('/user/comment/:idComment', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.deleteUserCommentV), routehelper_1.default(user_controller_1.deleteUserComment));
router.get('/user/totalQualifications', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(user_controller_1.getTotalQualifications));
router.put('/user/:idUser/resetPassword', validate_1.validate(userValidations_1.resetPasswordV), routehelper_1.default(user_controller_1.resetPassword));
router.post('/user/resetPassword/email', validate_1.validate(userValidations_1.sendEmailResetPwdV), routehelper_1.default(user_controller_1.sendEmailResetPwd));
router.delete('/user/deleteAccount', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(user_controller_1.deleteAccount));
exports.default = router;
