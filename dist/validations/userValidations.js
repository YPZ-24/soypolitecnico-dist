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
exports.addUserLockV = exports.getUsersWithRoleV = exports.addUserRoleV = exports.getRoleByNickNameV = exports.deleteAccountV = exports.sendEmailResetPwdV = exports.resetPasswordV = exports.deleteUserCommentV = exports.addSubjectToTeacherV = exports.createTeacherWithSubjectV = exports.getSchoolSubjectsV = exports.getRelSubjectsTeacherV = exports.getTeachersV = void 0;
const generalFunctions_1 = require("./generalFunctions");
const yup = __importStar(require("yup"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const RelSubjectTeacher_1 = __importDefault(require("../models/RelSubjectTeacher"));
const Comment_1 = __importDefault(require("../models/Comment"));
const User_1 = __importDefault(require("../models/User"));
const ability_1 = require("@casl/ability");
exports.getTeachersV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield generalFunctions_1.schoolExists(req.user.idSchool);
});
exports.getRelSubjectsTeacherV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSchool } = req.user;
    const { idTeacher } = req.params;
    yield generalFunctions_1.schoolExists(idSchool);
    yield generalFunctions_1.teacherExists(idTeacher);
    yield generalFunctions_1.relSchoolTeacherExists(idSchool, idTeacher);
});
exports.getSchoolSubjectsV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    yield generalFunctions_1.schoolExists(req.user.idSchool);
});
exports.createTeacherWithSubjectV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const createTeacherSchema = yup.object().shape({
        teacherName: yup.string().required().max(200).matches(/^[a-z ]+$/i, 'TeacherName can only contains letters')
    });
    createTeacherSchema.validateSync(req.body);
    const { teacherName } = req.body;
    yield generalFunctions_1.teacherNameDontExists(teacherName);
    yield generalFunctions_1.schoolExists(req.user.idSchool);
});
exports.addSubjectToTeacherV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSubject, idTeacher } = req.params;
    const { idSchool } = req.user;
    yield generalFunctions_1.schoolExists(idSchool);
    yield generalFunctions_1.subjectExists(idSubject);
    yield generalFunctions_1.teacherExists(idTeacher);
    yield generalFunctions_1.relSubjectSchoolExists(idSubject, idSchool);
    yield generalFunctions_1.relSchoolTeacherExists(idSchool, idTeacher);
    const relSubjectTeacher = yield RelSubjectTeacher_1.default.find({ idSubject, idTeacher }).exec();
    if (relSubjectTeacher.length !== 0) {
        throw new ValidationError_1.default({ message: 'That relation already exists' });
    }
});
exports.deleteUserCommentV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { idComment } = req.params;
    const idUser = req.user._id;
    yield generalFunctions_1.commentExists(idComment);
    const comment = yield Comment_1.default.findById(idComment).exec();
    const isYours = comment.idUser.toString().localeCompare(idUser);
    //0 son iguales
    if (isYours !== 0) {
        throw new ValidationError_1.default({ path: 'comment',
            message: 'The comment is not yours' });
    }
});
exports.resetPasswordV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const resetPasswordSchema = yup.object().shape({
        password: yup.string().required().max(50).min(8),
        newPassword: yup.string().required().max(50).min(8),
        confirmPassword: yup.string().required().max(50).min(8).oneOf([yup.ref('newPassword')], 'Passwords must match'),
    });
    resetPasswordSchema.validateSync(req.body, { strict: true });
    const { password, confirmPassword, newPassword } = req.body;
    const { idUser } = req.params;
    const user = yield User_1.default.findById(idUser).exec();
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        throw new ValidationError_1.default({ message: 'Incorrect password' });
    }
    if (newPassword !== confirmPassword) {
        throw new ValidationError_1.default({ message: 'Passwords do not match' });
    }
});
exports.sendEmailResetPwdV = ({ body }) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findOne({ email: body.email }).exec();
    if (!user) {
        throw new ValidationError_1.default({ message: 'The user does not exist' });
    }
});
exports.deleteAccountV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const idUser = req.user._id;
    const user = yield User_1.default.findById(idUser).exec();
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        throw new ValidationError_1.default({ message: 'Password is incorrect' });
    }
});
exports.getRoleByNickNameV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('read', 'Role');
    const { nickName } = req.params;
    const user = yield User_1.default.findOne({ nickName }).exec();
    if (!user) {
        throw new ValidationError_1.default({ message: 'The NickName does not exist' });
    }
});
exports.addUserRoleV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('update', 'Role');
    const { idRole, idUser } = req.params;
    yield generalFunctions_1.roleExists(idRole);
    yield generalFunctions_1.userExists(idUser);
});
exports.getUsersWithRoleV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('read', 'Role');
    const { idRole } = req.params;
    yield generalFunctions_1.roleExists(idRole);
});
exports.addUserLockV = (req) => __awaiter(void 0, void 0, void 0, function* () {
    ability_1.ForbiddenError.from(req.user.ability).throwUnlessCan('update', 'User');
    const { idUser } = req.params;
    yield generalFunctions_1.userExists(idUser);
});
