"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const router = express_1.Router();
//HELPER FOR ASYNC ROUTES
const routehelper_1 = __importDefault(require("./routehelper"));
//VALIDATION
const validate_1 = require("../middlewares/validate");
const roleValidations_1 = require("../validations/roleValidations");
//PRIVATE ROUTES
const passport_1 = __importDefault(require("passport"));
router.get('/roles', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(roleValidations_1.getRolesV), routehelper_1.default(role_controller_1.getRoles));
exports.default = router;
