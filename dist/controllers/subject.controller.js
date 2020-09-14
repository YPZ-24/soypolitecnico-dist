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
exports.createRelSubjectSchool = exports.getSubjects = exports.deleteSubject = exports.updateSubject = exports.createSubject = void 0;
const Subject_1 = __importDefault(require("../models/Subject"));
const RelSubjectSchool_1 = __importDefault(require("../models/RelSubjectSchool"));
const RelSubjectTeacher_1 = __importDefault(require("../models/RelSubjectTeacher"));
exports.createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectName } = req.body;
    const subject = new Subject_1.default({ subjectName });
    yield subject.save();
    res.status(200).json({ status: 200, message: 'Subject Saved' });
});
exports.updateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectName } = req.body;
    const { idSubject } = req.params;
    const subject = yield Subject_1.default.findById(idSubject).exec();
    subject.subjectName = subjectName;
    yield subject.save();
    res.status(200).json({ status: 200, message: 'Subject Updated' });
});
exports.deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSubject } = req.params;
    yield Subject_1.default.findByIdAndDelete(idSubject).exec();
    yield RelSubjectSchool_1.default.deleteMany({ idSubject });
    yield RelSubjectTeacher_1.default.deleteMany({ idSubject });
    res.status(200).json({ status: 200, message: 'Subject and its relatiosn were deleted' });
});
exports.getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield Subject_1.default.find().sort('subjectName').exec();
    res.status(200).json(subjects);
});
exports.createRelSubjectSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSubject } = req.params;
    const { idSchool } = req.body;
    const rel = new RelSubjectSchool_1.default({ idSubject, idSchool });
    yield rel.save();
    res.status(200).json({ status: 200, message: 'School-Subject saved' });
});
