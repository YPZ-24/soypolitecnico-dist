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
exports.getTeacherGossips = exports.getCommentsTeacher = exports.getTeacherScore = exports.getTeacherChartData = exports.getTeacher = exports.createRelTeacherSubject = exports.createRelTeacherSchool = exports.getTeachers = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = void 0;
const Teacher_1 = __importDefault(require("../models/Teacher"));
const QualificationOnline_1 = __importDefault(require("../models/QualificationOnline"));
const RankComment_1 = __importDefault(require("../models/RankComment"));
const Comment_1 = __importDefault(require("../models/Comment"));
const User_1 = __importDefault(require("../models/User"));
const RelSchoolTeacher_1 = __importDefault(require("../models/RelSchoolTeacher"));
const RelSubjectTeacher_1 = __importDefault(require("../models/RelSubjectTeacher"));
const Gossip_1 = __importDefault(require("../models/Gossip"));
exports.createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherName } = req.body;
    const teacher = new Teacher_1.default({ teacherName });
    yield teacher.save();
    res.status(200).json({ teacher, status: 200, message: 'Teacher Saved' });
});
exports.updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teacherName } = req.body;
    const { idTeacher } = req.params;
    const teacher = yield Teacher_1.default.findById(idTeacher).exec();
    teacher.teacherName = teacherName;
    yield teacher.save();
    res.status(200).json({ status: 200, message: 'Teacher Updated' });
});
exports.deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    yield Teacher_1.default.findByIdAndDelete(idTeacher);
    yield RelSchoolTeacher_1.default.deleteMany({ idTeacher });
    yield RelSubjectTeacher_1.default.deleteMany({ idTeacher });
    res.status(200).json({ status: 200, message: 'Teacher and its relations were deleted' });
});
exports.getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teachers = yield Teacher_1.default.find().sort('teacherName').exec();
    res.status(200).json(teachers);
});
exports.createRelTeacherSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    const { idSchool } = req.body;
    const rel = new RelSchoolTeacher_1.default({ idTeacher, idSchool });
    yield rel.save();
    res.status(200).json({ status: 200, message: 'Teacher-School saved' });
});
exports.createRelTeacherSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    const { idSubject } = req.body;
    const rel = new RelSubjectTeacher_1.default({ idSubject, idTeacher });
    yield rel.save();
    res.status(200).json({ status: 200, message: 'Teacher-Subject saved' });
});
//R
exports.getTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield Teacher_1.default.findById(req.params.idTeacher).exec();
    return res.status(200).json(teacher);
});
//R
const getQualificationsAvarage = (idTeacher) => __awaiter(void 0, void 0, void 0, function* () {
    const qualificationsTeacher = yield QualificationOnline_1.default.find({ idTeacher }, '-idUser -idTeacher -idSubject -_id -__v').exec();
    if (qualificationsTeacher.length === 0)
        return undefined;
    const totalQualifications = qualificationsTeacher.length;
    let isEasy = 0, answer = 0, sentDocuments = 0, madeVideocalls = 0, dissapear = 0, beFair = 0, learn = 0;
    for (let i = 0; i < totalQualifications; i++) {
        const q = qualificationsTeacher[i];
        isEasy += Number(q.isEasy);
        answer += Number(q.answer);
        sentDocuments += Number(q.sentDocuments);
        madeVideocalls += Number(q.madeVideocalls);
        dissapear += Number(q.dissapear);
        beFair += Number(q.beFair);
        learn += Number(q.learn);
    }
    isEasy = isEasy / totalQualifications;
    answer = answer / totalQualifications;
    sentDocuments = sentDocuments / totalQualifications;
    madeVideocalls = madeVideocalls / totalQualifications;
    dissapear = dissapear / totalQualifications;
    beFair = beFair / totalQualifications;
    learn = learn / totalQualifications;
    return { isEasy, answer, sentDocuments, madeVideocalls, dissapear, beFair, learn };
});
//R
exports.getTeacherChartData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    const q = yield getQualificationsAvarage(idTeacher);
    if (!q)
        return res.status(200).json(undefined);
    let isEasy = 0, answer = 0, sentDocuments = 0, madeVideocalls = 0, dissapear = 0, beFair = 0, learn = 0;
    const chartData = {
        isEasy,
        answer,
        sentDocuments,
        madeVideocalls,
        dissapear,
        beFair,
        learn
    };
    chartData.isEasy = (q.isEasy * 100);
    chartData.answer = q.answer * 100;
    chartData.sentDocuments = q.sentDocuments * 100;
    chartData.madeVideocalls = q.madeVideocalls * 100;
    chartData.dissapear = q.dissapear * 100;
    chartData.beFair = q.beFair * 100;
    chartData.learn = q.learn * 100;
    res.status(200).json(chartData);
});
//R
exports.getTeacherScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    const q = yield getQualificationsAvarage(idTeacher);
    if (!q)
        return res.status(200).json({ score: undefined });
    let score = 0;
    score = Math.round(q.answer) ? score + 1 : score - 1;
    score = Math.round(q.sentDocuments) ? score + 1 : score - 1;
    score = Math.round(q.beFair) ? score + 1 : score - 1;
    score = Math.round(q.madeVideocalls) ? score + 2 : score - 2;
    score = Math.round(q.dissapear) ? score - 2 : score + 2;
    score = Math.round(q.learn) ? score + 3 : score - 3;
    res.status(200).json({ score });
});
//R
exports.getCommentsTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    const idUser = req.user._id;
    const teacherComments = yield Comment_1.default.find({ idTeacher }).populate('idSubject', 'subjectName -_id').populate('idUser', 'nickName +_id').exec();
    const teacherCommentsData = yield Promise.all(teacherComments.map((u) => __awaiter(void 0, void 0, void 0, function* () {
        let rankPromedio;
        const rankComments = yield RankComment_1.default.find({ idComment: u._id }).exec();
        const rankUser = yield RankComment_1.default.find({ idComment: u._id, idUser }).exec();
        if (u.idUser instanceof User_1.default) {
            if (u.idUser._id.toString() == idUser || rankUser.length !== 0) {
                //Si el comentario es mio o ya lo califique, calculo el rank
                let totalRank = 0;
                rankComments.forEach(rankComment => {
                    totalRank += rankComment.rank;
                });
                rankPromedio = (totalRank !== 0) ? rankPromedio = totalRank / rankComments.length : 0;
            }
            else {
                //Si no, regreso undefined
                rankPromedio = undefined;
            }
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
    res.json(teacherCommentsData);
});
exports.getTeacherGossips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idTeacher } = req.params;
    const gossips = yield Gossip_1.default.find({ idTeacher }).exec();
    res.status(200).json(gossips);
});
