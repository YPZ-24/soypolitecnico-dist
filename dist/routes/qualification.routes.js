"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//Controller
const qualification_controller_1 = require("../controllers/qualification.controller");
//Validations
const validate_1 = require("../middlewares/validate");
const qualificationValidations_1 = require("../validations/qualificationValidations");
//Helper for async routes
const routehelper_1 = __importDefault(require("./routehelper"));
//Authentication
const passport_1 = __importDefault(require("passport"));
router.post('/rankComment/:idComment', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(qualificationValidations_1.addRankCommentV), routehelper_1.default(qualification_controller_1.addRankComment));
router.post('/qualificationOnline', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(qualificationValidations_1.createQualificationOnlineV), routehelper_1.default(qualification_controller_1.createQualificationOnline));
exports.default = router;
