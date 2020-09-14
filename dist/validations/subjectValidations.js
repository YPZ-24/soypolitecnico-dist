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
exports.createRelSubjectSchoolV = exports.deleteSubjectV = exports.updateSubjectV = exports.createSubjectV = exports.getSubjectsV = void 0;
const ability_1 = require("@casl/ability");
const generalFunctions_1 = require("./generalFunctions");
const yup = __importStar(require("yup"));
const QualificationOnline_1 = __importDefault(require("../models/QualificationOnline"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const RelSubjectSchool_1 = __importDefault(require("../models/RelSubjectSchool"));
exports.getSubjectsV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('read', 'Subject');
});
exports.createSubjectV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'Subject');
    const createSubjectSchema = yup.object().shape({
        subjectName: yup.string().required().max(200)
    });
    createSubjectSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.subjectNameDontExists(req.body.subjectName);
});
exports.updateSubjectV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('update', 'Subject');
    const updateSubjectSchema = yup.object().shape({
        subjectName: yup.string().required().max(200)
    });
    updateSubjectSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.subjectExists(req.params.idSubject);
    yield generalFunctions_1.subjectNameDontExists(req.body.subjectName);
});
exports.deleteSubjectV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('delete', 'Subject');
    const { idSubject } = req.params;
    const user = yield QualificationOnline_1.default.findOne({ idSubject }).exec();
    if (user) {
        throw new ValidationError_1.default({ message: 'The Subject is already in use' });
    }
    yield generalFunctions_1.subjectExists(idSubject);
});
exports.createRelSubjectSchoolV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'RelSubjectSchool');
    const relSchema = yup.object().shape({
        idSchool: yup.string().required()
    });
    relSchema.validateSync(req.body);
    const { idSubject } = req.params;
    const { idSchool } = req.body;
    const rel = yield RelSubjectSchool_1.default.findOne({ idSubject, idSchool }).exec();
    if (rel) {
        throw new ValidationError_1.default({ message: 'The relation already exists' });
    }
});
