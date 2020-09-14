"use strict";
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
exports.getCareers = exports.deleteSchool = exports.updateSchool = exports.createSchool = exports.getSchools = void 0;
const RelSchoolCareer_1 = __importDefault(require("../models/RelSchoolCareer"));
const School_1 = __importDefault(require("../models/School"));
const RelSubjectSchool_1 = __importDefault(require("../models/RelSubjectSchool"));
const RelSchoolTeacher_1 = __importDefault(require("../models/RelSchoolTeacher"));
//Traer el nombre de todas las escuelas
exports.getSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schools = yield School_1.default.find().select('schoolName').sort('schoolName').exec();
    return res.status(200).json(schools);
});
exports.createSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolName } = req.body;
    const school = new School_1.default({ schoolName });
    yield school.save();
    res.status(200).json({ status: 200, message: 'School Saved' });
});
exports.updateSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { schoolName } = req.body;
    const { idSchool } = req.params;
    const school = yield School_1.default.findById(idSchool).exec();
    school.schoolName = schoolName;
    yield school.save();
    res.status(200).json({ status: 200, message: 'School Updated' });
});
exports.deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSchool } = req.params;
    yield School_1.default.findByIdAndDelete(idSchool).exec();
    yield RelSchoolCareer_1.default.deleteMany({ idSchool });
    yield RelSchoolTeacher_1.default.deleteMany({ idSchool });
    yield RelSubjectSchool_1.default.deleteMany({ idSchool });
    res.status(200).json({ status: 200, message: 'School and its relatiosn were deleted' });
});
//Traer el nombre de las carreras de una escuela
exports.getCareers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSchool } = req.params;
    const careerNamesField = yield RelSchoolCareer_1.default.find({ idSchool }, 'idCareer -_id').populate('idCareer', 'careerName').exec();
    const careerNames = (careerNamesField.map((t) => (t.idCareer)));
    return res.status(200).json(careerNames);
});
