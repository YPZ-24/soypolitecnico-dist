"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//CONTROLLERS
const teacher_controller_1 = require("../controllers/teacher.controller");
//HELPER FOR ASYNC ROUTES
const routehelper_1 = __importDefault(require("./routehelper"));
//VALIDATION
const validate_1 = require("../middlewares/validate");
const teacherValidations_1 = require("../validations/teacherValidations");
//Authentication
const passport_1 = __importDefault(require("passport"));
const userValidations_1 = require("../validations/userValidations");
router.get('/teachers', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(userValidations_1.getTeachersV), routehelper_1.default(teacher_controller_1.getTeachers));
router.post('/teacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.createTeacherV), routehelper_1.default(teacher_controller_1.createTeacher));
router.put('/teacher/:idTeacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.updateTeacherV), routehelper_1.default(teacher_controller_1.updateTeacher));
router.delete('/teacher/:idTeacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.deleteTeacherV), routehelper_1.default(teacher_controller_1.deleteTeacher));
router.post('/teacher/:idTeacher/school', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.createRelTeacherSchoolV), routehelper_1.default(teacher_controller_1.createRelTeacherSchool));
router.post('/teacher/:idTeacher/subject', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.createRelTeacherSubjectV), routehelper_1.default(teacher_controller_1.createRelTeacherSubject));
router.get('/teacher/:idTeacher/gossips', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(teacher_controller_1.getTeacherGossips));
router.get('/teacherChart/:idTeacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.getTeacherChartDataV), routehelper_1.default(teacher_controller_1.getTeacherChartData));
router.get('/teacherScore/:idTeacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.getTeacherScoreV), routehelper_1.default(teacher_controller_1.getTeacherScore));
router.get('/teacher/:idTeacher/comments', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.getCommentsTeacherV), routehelper_1.default(teacher_controller_1.getCommentsTeacher));
router.get('/teacher/:idTeacher', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(teacherValidations_1.getTeacherV), routehelper_1.default(teacher_controller_1.getTeacher));
exports.default = router;
