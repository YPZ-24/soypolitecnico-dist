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
exports.addUserLock = exports.getUsersWithRole = exports.addUserRole = exports.getRoleByNickName = exports.deleteAccount = exports.sendEmailResetPwd = exports.resetPassword = exports.getNickName = exports.getTotalQualifications = exports.deleteUserComment = exports.getUserCommentCardsData = exports.addSubjectToTeacher = exports.createTeacherWithSubject = exports.getSchoolSubjects = exports.getRelSubjectsTeacher = exports.getTeachers = exports.getUserRole = exports.getuser = void 0;
const User_1 = __importDefault(require("../models/User"));
const RelSubjectSchool_1 = __importDefault(require("../models/RelSubjectSchool"));
const RelSchoolTeacher_1 = __importDefault(require("../models/RelSchoolTeacher"));
const RelSubjectTeacher_1 = __importDefault(require("../models/RelSubjectTeacher"));
const Subject_1 = __importDefault(require("../models/Subject"));
const Teacher_1 = __importDefault(require("../models/Teacher"));
const Comment_1 = __importDefault(require("../models/Comment"));
const QualificationOnline_1 = __importDefault(require("../models/QualificationOnline"));
const RankComment_1 = __importDefault(require("../models/RankComment"));
const School_1 = __importDefault(require("../models/School"));
const Career_1 = __importDefault(require("../models/Career"));
const Role_1 = __importDefault(require("../models/Role"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config/config"));
exports.getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.user._id;
    const user = yield User_1.default.findById(idUser, '-password -_id').populate('idSchool', 'schoolName').populate('idCareer', 'careerName').exec();
    let userData = {};
    if (user.idSchool instanceof School_1.default && user.idCareer instanceof Career_1.default) {
        userData = {
            nickName: user.nickName,
            schoolName: user.idSchool.schoolName,
            careerName: user.idCareer.careerName,
            email: user.email
        };
    }
    res.status(200).send(userData);
});
exports.getUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.user.role;
    res.status(200).json({ status: 200, role });
});
//Traer el nombre de los profesores de la escuela del usuario
exports.getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSchool } = req.user;
    const teacherNamesField = yield RelSchoolTeacher_1.default.find({ idSchool }, 'idTeacher -_id').populate('idTeacher', 'teacherName').exec();
    const teacherNames = (teacherNamesField.map((s) => (s.idTeacher)));
    return res.status(200).json(teacherNames);
});
//Traer el nombre de las materias de un profesor de una escuela***********************
exports.getRelSubjectsTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSchool } = req.user;
    const { idTeacher } = req.params;
    //Traer las materias de ese profesor
    const idSubjects = yield RelSubjectTeacher_1.default.find({ idTeacher }, 'idSubject -_id').exec();
    //De esas materias quedarnos solo con las que se dan en esa escuela
    const subjectsNames = yield Promise.all(idSubjects.filter((idSubject) => __awaiter(void 0, void 0, void 0, function* () {
        const subjectNameRelation = yield RelSubjectSchool_1.default.findOne({ idSubject: idSubject.idSubject, idSchool }, '-_id').exec();
        if (subjectNameRelation)
            return true;
        else
            return false;
    })).map((subjectNameRelation) => __awaiter(void 0, void 0, void 0, function* () {
        const subject = yield Subject_1.default.findById(subjectNameRelation.idSubject, 'subjectName').exec();
        return subject;
    })));
    return res.status(200).json(subjectsNames);
});
exports.getSchoolSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSchool = req.user.idSchool;
    const subjectNamesField = yield RelSubjectSchool_1.default.find({ idSchool }, 'idSubject -_id').populate('idSubject', 'subjectName').exec();
    const subjectNames = (subjectNamesField.map((s) => (s.idSubject)));
    return res.status(200).json(subjectNames);
});
exports.createTeacherWithSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSubject } = req.params;
    const { teacherName } = req.body;
    const { idSchool } = req.user;
    const newTeacher = new Teacher_1.default({ teacherName });
    yield newTeacher.save();
    const idTeacher = newTeacher._id;
    //TEACHER-SUBJECT
    const newRelSubjectTeacher = new RelSubjectTeacher_1.default({ idSubject, idTeacher });
    yield newRelSubjectTeacher.save();
    //TEACHER-SCHOOL
    const newRelSchoolTeacher = new RelSchoolTeacher_1.default({ idSchool, idTeacher });
    yield newRelSchoolTeacher.save();
    res.status(200).json({ status: 200, message: 'Teacher created' });
});
//Hacer relacion maestro-materia y maestro-escuela
exports.addSubjectToTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSubject, idTeacher } = req.params;
    //TEACHER-SUBJECT
    const newRelSubjectTeacher = new RelSubjectTeacher_1.default({ idSubject, idTeacher });
    yield newRelSubjectTeacher.save();
    res.status(200).json({ status: 200, message: 'Subject Added' });
});
exports.getUserCommentCardsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userComments = yield Comment_1.default.find({ idUser: req.user._id }).populate('idSubject', 'subjectName').populate('idUser', 'nickName').exec();
    const commentCardsData = yield Promise.all(userComments.map((u) => __awaiter(void 0, void 0, void 0, function* () {
        let rankPromedio;
        const rankComments = yield RankComment_1.default.find({ idComment: u._id }).exec();
        if (rankComments.length !== 0) {
            let totalRank = 0;
            rankComments.forEach(rankComment => {
                totalRank += rankComment.rank;
            });
            rankPromedio = totalRank / rankComments.length;
        }
        else {
            rankPromedio = 0;
        }
        let commentCardData = {
            _id: u._id,
            subject: u.idSubject,
            user: u.idUser,
            createdAt: (new Date(u.createdAt)).toLocaleDateString(),
            comment: u.comment,
            rank: rankPromedio,
            currentUser: req.user._id
        };
        return commentCardData;
    })));
    res.json(commentCardsData);
});
exports.deleteUserComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idComment } = req.params;
    yield Comment_1.default.findByIdAndDelete(idComment).exec();
    yield RankComment_1.default.deleteMany({ idComment }).exec();
    yield QualificationOnline_1.default.findOneAndDelete({ idComment }).exec();
    res.json({ message: 'Comment and Qualification was deleted' });
});
exports.getTotalQualifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.user._id;
    const total = (yield QualificationOnline_1.default.find({ idUser }).exec()).length;
    res.status(200).json({ total });
});
exports.getNickName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.user._id;
    const { nickName } = yield User_1.default.findById(idUser, 'nickName').exec();
    res.status(200).json({ nickName });
});
exports.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    const { newPassword } = req.body;
    const user = yield User_1.default.findById(idUser).exec();
    user.password = newPassword;
    yield user.save();
    res.status(200).json({ status: 200, message: 'Password saved' });
});
exports.sendEmailResetPwd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield User_1.default.findOne({ email }).exec();
    const url = `${config_1.default.DOMAIN.DOMAIN_LINK}/resetPassword/${user._id}`;
    const contentHTML = `
        <h1>SOY POLITECNICO</h1>
        <p>Hola...!</p>
        <p>${user.nickName}, para recuperar tu contraseña, ingresa al siguiente link</p>
        <p>${url}</p>
    `;
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.DOMAIN.DOMAIN_NAME,
        port: Number(config_1.default.DOMAIN.EMAIL_PORT),
        secure: true,
        auth: {
            user: config_1.default.DOMAIN.EMAIL_USER,
            pass: config_1.default.DOMAIN.EMAIL_PASSWORD
        }
    });
    yield transporter.sendMail({
        from: '"Soy Politecnico" <ypz@soypolitecnico.org>',
        to: email,
        subject: 'Recuperar Contraseña',
        html: contentHTML
    });
    res.status(200).json({ status: 200, message: `Email send ${user.nickName}` });
});
exports.deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.user._id;
    const comments = yield Comment_1.default.find({ idUser }).exec();
    comments.forEach((comment) => __awaiter(void 0, void 0, void 0, function* () {
        yield Comment_1.default.findByIdAndDelete(comment._id).exec();
        //delete rank if it is from a comment to this user
        yield RankComment_1.default.deleteMany({ idComment: comment._id }).exec();
    }));
    yield QualificationOnline_1.default.deleteMany({ idUser }).exec();
    yield RankComment_1.default.deleteMany({ idUser: idUser }).exec();
    const user = yield User_1.default.findByIdAndDelete(idUser).exec();
    res.status(200).json({ status: 200, message: `All was deleted, See you later ${user.nickName}...!` });
});
exports.getRoleByNickName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickName } = req.params;
    let user = yield User_1.default.findOne({ nickName }, 'role nickName').exec();
    if (!user.role) {
        user.role = 'user';
    }
    res.status(200).json({ status: 200, user });
});
exports.addUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRole, idUser } = req.params;
    let { name } = yield Role_1.default.findById(idRole).exec();
    if (name === 'user')
        name = undefined;
    const user = yield User_1.default.findById(idUser).exec();
    if (user.role !== name) {
        user.role = name;
        yield user.save();
    }
    res.status(200).json({ message: 'Ready' });
});
exports.getUsersWithRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idRole } = req.params;
    let { name } = yield Role_1.default.findById(idRole).exec();
    if (name === 'user')
        name = undefined;
    const users = yield User_1.default.find({ role: name }, 'nickName').sort('nickName').exec();
    res.status(200).json(users);
});
exports.addUserLock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    const user = yield User_1.default.findById(idUser).exec();
    let msg = '';
    if (user.lock) {
        user.lock = undefined;
        msg = 'Unlock';
    }
    else {
        user.lock = true;
        msg = 'Lock';
    }
    yield user.save();
    res.status(200).json({ status: 200, message: msg });
});
