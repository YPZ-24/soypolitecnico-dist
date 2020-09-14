"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//CONTROLLERS
const school_controller_1 = require("../controllers/school.controller");
//HELPER FOR ASYNC ROUTES
const routehelper_1 = __importDefault(require("./routehelper"));
//VALIDATION
const validate_1 = require("../middlewares/validate");
const schoolValidations_1 = require("../validations/schoolValidations");
//PRIVATE ROUTES
const passport_1 = __importDefault(require("passport"));
router.get('/schools', routehelper_1.default(school_controller_1.getSchools));
router.post('/school', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(schoolValidations_1.createSchoolV), routehelper_1.default(school_controller_1.createSchool));
router.put('/school/:idSchool', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(schoolValidations_1.updateSchoolV), routehelper_1.default(school_controller_1.updateSchool));
router.delete('/school/:idSchool', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(schoolValidations_1.deleteSchoolV), routehelper_1.default(school_controller_1.deleteSchool));
router.get('/school/:idSchool/careers', validate_1.validate(schoolValidations_1.getCareersV), routehelper_1.default(school_controller_1.getCareers));
exports.default = router;
