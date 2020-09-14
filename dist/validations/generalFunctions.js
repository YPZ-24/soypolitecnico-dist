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
exports.careerNameDontExists = exports.schoolNameDontExists = exports.teacherNameDontExists = exports.subjectNameDontExists = exports.roleExists = exports.subjectExists = exports.schoolExists = exports.userExists = exports.teacherExists = exports.careerExists = exports.relSchoolCareerExists = exports.relSchoolTeacherExists = exports.relSubjectSchoolExists = exports.commentExists = void 0;
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const Subject_1 = __importDefault(require("../models/Subject"));
const Teacher_1 = __importDefault(require("../models/Teacher"));
const School_1 = __importDefault(require("../models/School"));
const RelSchoolTeacher_1 = __importDefault(require("../models/RelSchoolTeacher"));
const RelSubjectSchool_1 = __importDefault(require("../models/RelSubjectSchool"));
const Career_1 = __importDefault(require("../models/Career"));
const RelSchoolCareer_1 = __importDefault(require("../models/RelSchoolCareer"));
const Comment_1 = __importDefault(require("../models/Comment"));
const Role_1 = __importDefault(require("../models/Role"));
const User_1 = __importDefault(require("../models/User"));
function commentExists(idComment) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield Comment_1.default.findById(idComment).exec();
        if (!comment) {
            throw new ValidationError_1.default({ message: 'The comment does not exist' });
        }
    });
}
exports.commentExists = commentExists;
function relSubjectSchoolExists(idSubject, idSchool) {
    return __awaiter(this, void 0, void 0, function* () {
        const relSubjectSchool = yield RelSubjectSchool_1.default.findOne({ idSubject, idSchool }).exec();
        if (!relSubjectSchool) {
            throw new ValidationError_1.default({ message: 'The relation Subject - School does not exists' });
        }
    });
}
exports.relSubjectSchoolExists = relSubjectSchoolExists;
function relSchoolTeacherExists(idSchool, idTeacher) {
    return __awaiter(this, void 0, void 0, function* () {
        const relSchoolTeacher = yield RelSchoolTeacher_1.default.find({ idSchool, idTeacher }).exec();
        if (relSchoolTeacher.length === 0) {
            throw new ValidationError_1.default({ message: 'The teacher is not from that school' });
        }
    });
}
exports.relSchoolTeacherExists = relSchoolTeacherExists;
function relSchoolCareerExists(idSchool, idCareer) {
    return __awaiter(this, void 0, void 0, function* () {
        const relSchoolCareer = yield RelSchoolCareer_1.default.find({ idSchool, idCareer }).exec();
        if (relSchoolCareer.length === 0) {
            throw new ValidationError_1.default({ message: 'The career is not from that school' });
        }
    });
}
exports.relSchoolCareerExists = relSchoolCareerExists;
function careerExists(idCareer) {
    return __awaiter(this, void 0, void 0, function* () {
        const career = yield Career_1.default.findById(idCareer).exec();
        if (!career) {
            throw new ValidationError_1.default({
                message: 'The career does not exist'
            });
        }
    });
}
exports.careerExists = careerExists;
function teacherExists(idTeacher) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacher = yield Teacher_1.default.findById(idTeacher).exec();
        if (!teacher) {
            throw new ValidationError_1.default({ path: 'teacherName',
                message: 'The teacher does not exist' });
        }
    });
}
exports.teacherExists = teacherExists;
function userExists(idUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findById(idUser).exec();
        if (!user) {
            throw new ValidationError_1.default({ message: 'The user does not exist' });
        }
    });
}
exports.userExists = userExists;
function schoolExists(idSchool) {
    return __awaiter(this, void 0, void 0, function* () {
        const school = yield School_1.default.findById(idSchool).exec();
        if (!school) {
            throw new ValidationError_1.default({ path: 'schoolName',
                message: 'The school does not exist' });
        }
    });
}
exports.schoolExists = schoolExists;
function subjectExists(idSubject) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = yield Subject_1.default.findById(idSubject).exec();
        if (!subject) {
            throw new ValidationError_1.default({ path: 'subjectName',
                message: 'The subject does not exist' });
        }
    });
}
exports.subjectExists = subjectExists;
function roleExists(idRole) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = yield Role_1.default.findById(idRole);
        if (!role) {
            throw new ValidationError_1.default({
                message: 'The role does not exist'
            });
        }
    });
}
exports.roleExists = roleExists;
function subjectNameDontExists(subjectName) {
    return __awaiter(this, void 0, void 0, function* () {
        const subject = yield Subject_1.default.find({ subjectName }).exec();
        if (subject.length !== 0) {
            throw new ValidationError_1.default({ message: 'The subject already exists' });
        }
    });
}
exports.subjectNameDontExists = subjectNameDontExists;
function teacherNameDontExists(teacherName) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacher = yield Teacher_1.default.find({ teacherName }).exec();
        if (teacher.length !== 0) {
            throw new ValidationError_1.default({ message: 'The teacher already exists' });
        }
    });
}
exports.teacherNameDontExists = teacherNameDontExists;
function schoolNameDontExists(schoolName) {
    return __awaiter(this, void 0, void 0, function* () {
        const school = yield School_1.default.find({ schoolName }).exec();
        if (school.length !== 0) {
            throw new ValidationError_1.default({ message: 'The school already exists' });
        }
    });
}
exports.schoolNameDontExists = schoolNameDontExists;
function careerNameDontExists(careerName) {
    return __awaiter(this, void 0, void 0, function* () {
        const career = yield Career_1.default.find({ careerName }).exec();
        if (career.length !== 0) {
            throw new ValidationError_1.default({ message: 'The career already exists' });
        }
    });
}
exports.careerNameDontExists = careerNameDontExists;
