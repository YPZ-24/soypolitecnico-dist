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
//CONTROLLERS
const career_controller_1 = require("../controllers/career.controller");
const careerValidations_1 = require("../validations/careerValidations");
//Authentication
const passport_1 = __importDefault(require("passport"));
router.get('/careers', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(careerValidations_1.getCareersV), routehelper_1.default(career_controller_1.getCareers));
router.post('/career', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(careerValidations_1.createCareerV), routehelper_1.default(career_controller_1.createCareer));
router.put('/career/:idCareer', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(careerValidations_1.updateCareerV), routehelper_1.default(career_controller_1.updateCareer));
router.delete('/career/:idCareer', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(careerValidations_1.deleteCareerV), routehelper_1.default(career_controller_1.deleteCareer));
router.post('/career/:idCareer/school', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(careerValidations_1.createRelCareerSchoolV), routehelper_1.default(career_controller_1.createRelCareerSchool));
exports.default = router;
