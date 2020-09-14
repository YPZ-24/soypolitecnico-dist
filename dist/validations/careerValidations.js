"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRelCareerSchoolV = exports.deleteCareerV = exports.updateCareerV = exports.createCareerV = exports.getCareersV = void 0;
const ability_1 = require("@casl/ability");
const generalFunctions_1 = require("./generalFunctions");
const yup = __importStar(require("yup"));
const User_1 = __importDefault(require("../models/User"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const RelSchoolCareer_1 = __importDefault(require("../models/RelSchoolCareer"));
exports.getCareersV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('read', 'Career');
});
exports.createCareerV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'Career');
    const createCareerSchema = yup.object().shape({
        careerName: yup.string().required()
    });
    createCareerSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.careerNameDontExists(req.body.careerName);
});
exports.updateCareerV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('update', 'Career');
    const updateCareerSchema = yup.object().shape({
        careerName: yup.string().required()
    });
    updateCareerSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.careerExists(req.params.idCareer);
    yield generalFunctions_1.careerNameDontExists(req.body.careerName);
});
exports.deleteCareerV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('delete', 'Career');
    const { idCareer } = req.params;
    const user = yield User_1.default.findOne({ idCareer }).exec();
    if (user) {
        throw new ValidationError_1.default({ message: 'The Career is already in use' });
    }
    yield generalFunctions_1.careerExists(idCareer);
});
exports.createRelCareerSchoolV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'RelSchoolCareer');
    const relSchema = yup.object().shape({
        idSchool: yup.string().required()
    });
    relSchema.validateSync(req.body);
    const { idCareer } = req.params;
    const { idSchool } = req.body;
    const rel = yield RelSchoolCareer_1.default.findOne({ idCareer, idSchool }).exec();
    if (rel) {
        throw new ValidationError_1.default({ message: 'The relation already exists' });
    }
});
