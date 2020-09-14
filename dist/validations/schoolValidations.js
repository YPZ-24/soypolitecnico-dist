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
exports.deleteSchoolV = exports.updateSchoolV = exports.createSchoolV = exports.getCareersV = void 0;
const generalFunctions_1 = require("./generalFunctions");
const ability_1 = require("@casl/ability");
const yup = __importStar(require("yup"));
const User_1 = __importDefault(require("../models/User"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
exports.getCareersV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield generalFunctions_1.schoolExists(req.params.idSchool);
});
exports.createSchoolV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'School');
    const createSchoolSchema = yup.object().shape({
        schoolName: yup.string().required().max(50)
    });
    createSchoolSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.schoolNameDontExists(req.body.schoolName);
});
exports.updateSchoolV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('update', 'School');
    const updateSchoolSchema = yup.object().shape({
        schoolName: yup.string().required().max(50)
    });
    updateSchoolSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.schoolExists(req.params.idSchool);
    yield generalFunctions_1.schoolNameDontExists(req.body.schoolName);
});
exports.deleteSchoolV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('delete', 'School');
    const { idSchool } = req.params;
    const user = yield User_1.default.findOne({ idSchool }).exec();
    if (user) {
        throw new ValidationError_1.default({ message: 'The School is already in use' });
    }
    yield generalFunctions_1.schoolExists(idSchool);
});
