"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
//Helper for async routes
const routehelper_1 = __importDefault(require("./routehelper"));
//Validation
const validate_1 = require("../middlewares/validate");
const gossipValidations_1 = require("../validations/gossipValidations");
//Controller
const gossip_controller_1 = require("../controllers/gossip.controller");
//Authenticacion
const passport_1 = __importDefault(require("passport"));
router.post('/gossip', passport_1.default.authenticate('jwt', { session: false }), validate_1.validate(gossipValidations_1.createGossipV), routehelper_1.default(gossip_controller_1.createGossip));
router.get('/gossips', passport_1.default.authenticate('jwt', { session: false }), routehelper_1.default(gossip_controller_1.getGossips));
exports.default = router;
