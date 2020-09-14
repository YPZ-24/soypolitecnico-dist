"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//CONTROLLERS
const auth_controller_1 = require("../controllers/auth.controller");
//HELPER FOR ASYNC ROUTES
const routehelper_1 = __importDefault(require("./routehelper"));
//VALIDATION
const validate_1 = require("../middlewares/validate");
const authValidations_1 = require("../validations/authValidations");
router.post('/signup', validate_1.validate(authValidations_1.signUpV), routehelper_1.default(auth_controller_1.signUp));
router.post('/signin', validate_1.validate(authValidations_1.signInV), routehelper_1.default(auth_controller_1.signIn));
exports.default = router;
