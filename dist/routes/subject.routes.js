"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//HELPER FOR ASYNC ROUTES
const routehelper_1 = __importDefault(require("./routehelper"));
//VALIDATION
const validate_1 = require("../middlewares/validate");
const subjectValidations_1 = require("../validations/subjectValidations");
//CONTROLLERS
const subject_controller_1 = require("../controllers/subject.controller");
//Authentication
const passport_1 = __importDefault(require("passport"));
router.get('/subjects', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(subjectValidations_1.getSubjectsV), routehelper_1.default(subject_controller_1.getSubjects));
router.post('/subject', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(subjectValidations_1.createSubjectV), routehelper_1.default(subject_controller_1.createSubject));
router.put('/subject/:idSubject', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(subjectValidations_1.updateSubjectV), routehelper_1.default(subject_controller_1.updateSubject));
router.delete('/subject/:idSubject', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(subjectValidations_1.deleteSubjectV), routehelper_1.default(subject_controller_1.deleteSubject));
router.post('/subject/:idSubject/school', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(subjectValidations_1.createRelSubjectSchoolV), routehelper_1.default(subject_controller_1.createRelSubjectSchool));
exports.default = router;
