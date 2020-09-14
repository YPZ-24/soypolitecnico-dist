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
exports.createRelTeacherSubjectV = exports.createRelTeacherSchoolV = exports.getCommentsTeacherV = exports.getTeacherScoreV = exports.getTeacherChartDataV = exports.getTeacherV = exports.deleteTeacherV = exports.updateTeacherV = exports.createTeacherV = void 0;
const generalFunctions_1 = require("./generalFunctions");
const ability_1 = require("@casl/ability");
const yup = __importStar(require("yup"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const QualificationOnline_1 = __importDefault(require("../models/QualificationOnline"));
const RelSchoolTeacher_1 = __importDefault(require("../models/RelSchoolTeacher"));
const RelSubjectTeacher_1 = __importDefault(require("../models/RelSubjectTeacher"));
exports.createTeacherV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'Teacher');
    const createTeacherSchema = yup.object().shape({
        teacherName: yup.string().required().max(200)
    });
    createTeacherSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.teacherNameDontExists(req.body.teacherName);
});
exports.updateTeacherV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('update', 'Teacher');
    const updateTeacherSchema = yup.object().shape({
        teacherName: yup.string().required().max(200)
    });
    updateTeacherSchema.validateSync(req.body, { strict: true });
    yield generalFunctions_1.teacherExists(req.params.idTeacher);
    yield generalFunctions_1.teacherNameDontExists(req.body.teacherName);
});
exports.deleteTeacherV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('delete', 'Teacher');
    const { idTeacher } = req.params;
    const user = yield QualificationOnline_1.default.findOne({ idTeacher }).exec();
    if (user) {
        throw new ValidationError_1.default({ message: 'The Teacher is already in use' });
    }
    yield generalFunctions_1.teacherExists(idTeacher);
});
exports.getTeacherV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield generalFunctions_1.teacherExists(req.params.idTeacher);
});
exports.getTeacherChartDataV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    yield generalFunctions_1.teacherExists(idTeacher);
});
exports.getTeacherScoreV = ({ params }) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = params;
    yield generalFunctions_1.teacherExists(idTeacher);
});
exports.getCommentsTeacherV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    yield generalFunctions_1.teacherExists(idTeacher);
});
exports.createRelTeacherSchoolV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'RelSchoolTeacher');
    const relSchema = yup.object().shape({
        idSchool: yup.string().required()
    });
    relSchema.validateSync(req.body);
    const { idTeacher } = req.params;
    const { idSchool } = req.body;
    const rel = yield yield RelSchoolTeacher_1.default.findOne({ idTeacher, idSchool }).exec();
    if (rel) {
        throw new ValidationError_1.default({ message: 'The relation already exists' });
    }
});
exports.createRelTeacherSubjectV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('create', 'RelSubjectTeacher');
    const relSchema = yup.object().shape({
        idSubject: yup.string().required()
    });
    relSchema.validateSync(req.body);
    const { idTeacher } = req.params;
    const { idSubject } = req.body;
    const rel = yield RelSubjectTeacher_1.default.findOne({ idTeacher, idSubject }).exec();
    if (rel) {
        throw new ValidationError_1.default({ message: 'The relation already exists' });
    }
});
